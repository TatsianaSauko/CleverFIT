import { useState } from 'react';
import { Menu, Button } from 'antd';
import { Layout as AntLayout } from 'antd';
import { HeartIcon, TrophyIcon, CalendarIcon, IdCardIcon, LogoutIcon } from '../../icons';
import { Link, NavLink } from 'react-router-dom';
import cleverFit from '/png/cleverFit.png';
import fit from '/png/fit.png';
import logoMobile from '/png/logoMobile.png';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { logout } from '@redux/slices/AuthSlice';
import { history } from '@redux/configure-store';

import './sider.css';

const { Sider: AntSider } = AntLayout;

export const Sider = ({ collapsed }: { collapsed: boolean }) => {
    const dispatch = useAppDispatch();
    const [collapsedWidth, setCollapsedWidth] = useState(64);
    const [width, setWidth] = useState(208);
    const handleButtonExit = () => {
        dispatch(logout());
        history.push('/auth');
    };

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
                setWidth(broken ? 106 : 208);
            }}
            {...(width === 208 ? {} : { style: { position: 'fixed', zIndex: '1' } })}
        >
            <div className='logo'>
                {!collapsed ? <img src={cleverFit} alt='CleverFit' className='logo_large' /> : null}
                {collapsed ? <img src={fit} alt='Fit' className='logo_small' /> : null}
                <img src={logoMobile} alt='CleverFit' className='logo_mobile' />
            </div>
            <Menu className='menu' mode='inline'>
                <Menu.Item
                    key='4'
                    icon={<CalendarIcon />}
                    style={{
                        ...(collapsed && width === 208 ? {} : { paddingLeft: '16px' }),
                        ...(width === 208 ? {} : { paddingLeft: '0', paddingRight: '0' }),
                    }}
                >
                    <Link to='/calendar'>Календарь</Link>
                </Menu.Item>
                <Menu.Item
                    key='5'
                    icon={<HeartIcon />}
                    style={{
                        ...(collapsed && width === 208 ? {} : { paddingLeft: '16px' }),
                        ...(width === 208 ? {} : { paddingLeft: '0', paddingRight: '0' }),
                    }}
                >
                    <Link to='/training'>Тренировки</Link>
                </Menu.Item>
                <Menu.Item
                    key='7'
                    icon={<TrophyIcon />}
                    style={{
                        ...(collapsed && width === 208 ? {} : { paddingLeft: '16px' }),
                        ...(width === 208 ? {} : { paddingLeft: '0', paddingRight: '0' }),
                    }}
                >
                    <Link to='/achievements'>Достижения</Link>
                </Menu.Item>
                <Menu.Item
                    key='8'
                    icon={<IdCardIcon />}
                    style={{
                        ...(collapsed && width === 208 ? {} : { paddingLeft: '16px' }),
                        ...(width === 208 ? {} : { paddingLeft: '0', paddingRight: '0' }),
                    }}
                >
                    <Link to='/profile'>Профиль</Link>
                </Menu.Item>

                <Menu.Item
                    key='9'
                    icon={<LogoutIcon className={collapsed ? 'icon_exit__padding' : 'icon_exit'} />}
                    style={{
                        ...(collapsed && width === 208 ? {} : { paddingLeft: '16px' }),
                        ...(width === 208 ? {} : { paddingLeft: '0', paddingRight: '0' }),
                    }}
                >
                    <NavLink to='' onClick={handleButtonExit}>
                        Выход
                    </NavLink>
                </Menu.Item>
            </Menu>
        </AntSider>
    );
};
