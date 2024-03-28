import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ModalGetDataError } from '@components/ModalGetDataError';
import { Path } from '@constants/paths';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { getTrainingList, getTrainingUser } from '@redux/ActionCreators';
import { history } from '@redux/configure-store';
import { authSelector, logout } from '@redux/slices/AuthSlice';
import { setIisModal } from '@redux/slices/TrainingSlice';
import { Layout as AntLayout, Menu } from 'antd';

import cleverFit from '/png/cleverFit.png';
import fit from '/png/fit.png';
import logoMobile from '/png/logoMobile.png';
import { CalendarIcon, HeartIcon, IdCardIcon, LogoutIcon, TrophyIcon } from '../../icons';

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
            key: 'calendar',
            icon: <CalendarIcon />,
            link: '/calendar',
            text: 'Календарь',
            onClick: handleCalendar,
        },
        { key: 'Тренировки', icon: <HeartIcon />, link: '/training', text: 'Тренировки' },
        { key: 'Достижения', icon: <TrophyIcon />, link: '/achievements', text: 'Достижения' },
        {
            key: 'Профиль',
            icon: <IdCardIcon />,
            link: '/profile',
            text: 'Профиль',
            onClick: () => history.push(Path.Profile),
        },
        {
            key: 'Выход',
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
            collapsible={true}
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
