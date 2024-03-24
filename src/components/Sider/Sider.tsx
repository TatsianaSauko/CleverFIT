import { useState } from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { HeartIcon, TrophyIcon, CalendarIcon, IdCardIcon, LogoutIcon } from '../../icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { authSelector, logout } from '@redux/slices/AuthSlice';
import { history } from '@redux/configure-store';
import { Path } from '@constants/paths';
import cleverFit from '/png/cleverFit.png';
import fit from '/png/fit.png';
import logoMobile from '/png/logoMobile.png';
import { ModalGetDataError } from '@components/ModalGetDataError';
import { getTrainingList, getTrainingUser } from '@redux/ActionCreators';
import { setIisModal } from '@redux/slices/TrainingSlice';
import { useSelector } from 'react-redux';

import './sider.css';

const { Sider: AntSider } = AntLayout;

export const Sider = ({ collapsed }: { collapsed: boolean }) => {
    const dispatch = useAppDispatch();
    const { token } = useSelector(authSelector);
    const [isModalGetData, setIsModalGetData] = useState(false);
    const [collapsedWidth, setCollapsedWidth] = useState(64);
    const [width, setWidth] = useState(208);

    const handleButtonExit = () => {
        dispatch(logout());
        history.push(Path.Auth);
    };

    const handleCalendar = async () => {
        try {
            await dispatch(getTrainingUser(token));
            try {
                await dispatch(getTrainingList(token));
            } catch {
                dispatch(setIisModal({ isModal: true }));
            } finally {
                history.push(Path.Calendar);
            }
        } catch {
            setIsModalGetData(true);
        }
    };

    const menuItems = [
        {
            key: '4',
            icon: <CalendarIcon />,
            link: '/calendar',
            text: 'Календарь',
            onClick: handleCalendar,
        },
        { key: '5', icon: <HeartIcon />, link: '/training', text: 'Тренировки' },
        { key: '7', icon: <TrophyIcon />, link: '/achievements', text: 'Достижения' },
        {
            key: '8',
            icon: <IdCardIcon />,
            link: '/profile',
            text: 'Профиль',
            onClick: () => history.push(Path.Profile),
        },
        {
            key: '9',
            icon: <LogoutIcon className={!collapsed ? 'icon_exit__padding' : 'icon_exit'} />,
            link: '',
            text: 'Выход',
            onClick: handleButtonExit,
        },
    ];

    return (
        <AntSider
            breakpoint='sm'
            width={width}
            collapsedWidth={collapsedWidth}
            trigger={null}
            collapsible
            collapsed={collapsed}
            className='aside'
            onBreakpoint={(broken) => {
                setCollapsedWidth(broken ? 0 : 64);
                setWidth(broken ? 0 : 208);
            }}
            {...(width === 208 ? {} : { style: { position: 'fixed', zIndex: '3' } })}
        >
            <ModalGetDataError
                isModalGetData={isModalGetData}
                handleModalToggle={() => setIsModalGetData(false)}
            />
            <div className='logo'>
                {!collapsed ? <img src={cleverFit} alt='CleverFit' className='logo_large' /> : null}
                {collapsed ? <img src={fit} alt='Fit' className='logo_small' /> : null}
                <img src={logoMobile} alt='CleverFit' className='logo_mobile' />
            </div>
            <Menu className='menu' mode='inline'>
                {menuItems.map((item) => (
                    <Menu.Item
                        key={item.key}
                        icon={item.icon}
                        style={{
                            ...(collapsed && width === 208 ? {} : { paddingLeft: '16px' }),
                            ...(width === 208 ? {} : { paddingLeft: '0', paddingRight: '0' }),
                        }}
                        onClick={item.onClick}
                    >
                        <div className='link'>{item.text}</div>
                    </Menu.Item>
                ))}
            </Menu>
        </AntSider>
    );
};
