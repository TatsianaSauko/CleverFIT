import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout as AntLayout, Menu } from 'antd';
import { HeartIcon, TrophyIcon, CalendarIcon, IdCardIcon, LogoutIcon } from '../../icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { logout } from '@redux/slices/AuthSlice';
import { history } from '@redux/configure-store';
import { Path } from '@constants/paths';
import cleverFit from '/png/cleverFit.png';
import fit from '/png/fit.png';
import logoMobile from '/png/logoMobile.png';

import './sider.css';

const { Sider: AntSider } = AntLayout;

export const Sider = ({ collapsed }: { collapsed: boolean }) => {
    const dispatch = useAppDispatch();
    const [collapsedWidth, setCollapsedWidth] = useState(64);
    const [width, setWidth] = useState(208);

    const handleButtonExit = () => {
        dispatch(logout());
        history.push(Path.Auth);
    };

    const menuItems = [
        { key: '4', icon: <CalendarIcon />, link: '/calendar', text: 'Календарь' },
        { key: '5', icon: <HeartIcon />, link: '/training', text: 'Тренировки' },
        { key: '7', icon: <TrophyIcon />, link: '/achievements', text: 'Достижения' },
        { key: '8', icon: <IdCardIcon />, link: '/profile', text: 'Профиль' },
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
                        <Link to={item.link}>{item.text}</Link>
                    </Menu.Item>
                ))}
            </Menu>
        </AntSider>
    );
};
