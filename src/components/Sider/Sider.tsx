import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Divider } from 'antd';
import { Layout as AntLayout } from 'antd';
import { HeartIcon, TrophyIcon, CalendarIcon, IdCardIcon, LogoutIcon } from '../../icons';
import cleverFit from '/png/cleverFit.png';
import fit from '/png/fit.png';
import logoMobile from '/png/logoMobile.png';

import './sider.css';

const { Sider: AntSider } = AntLayout;

export const Sider = ({ collapsed }: { collapsed: boolean }) => {
    const [collapsedWidth, setCollapsedWidth] = useState(64);
    const [width, setWidth] = useState(208);

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
                    key='1'
                    icon={<CalendarIcon />}
                    style={{
                        ...(collapsed && width === 208 ? {} : { paddingLeft: '16px' }),
                        ...(width === 208 ? {} : { paddingLeft: '0', paddingRight: '0' }),
                    }}
                >
                    <Link to='/calendar'>Календарь</Link>
                </Menu.Item>
                <Menu.Item
                    key='2'
                    icon={<HeartIcon />}
                    style={{
                        ...(collapsed && width === 208 ? {} : { paddingLeft: '16px' }),
                        ...(width === 208 ? {} : { paddingLeft: '0', paddingRight: '0' }),
                    }}
                >
                    <Link to='/training'>Тренировки</Link>
                </Menu.Item>
                <Menu.Item
                    key='3'
                    icon={<TrophyIcon />}
                    style={{
                        ...(collapsed && width === 208 ? {} : { paddingLeft: '16px' }),
                        ...(width === 208 ? {} : { paddingLeft: '0', paddingRight: '0' }),
                    }}
                >
                    <Link to='/achievements'>Достижения</Link>
                </Menu.Item>
                <Menu.Item
                    key='4'
                    icon={<IdCardIcon />}
                    style={{
                        ...(collapsed && width === 208 ? {} : { paddingLeft: '16px' }),
                        ...(width === 208 ? {} : { paddingLeft: '0', paddingRight: '0' }),
                    }}
                >
                    <Link to='/profile'>Профиль</Link>
                </Menu.Item>
                <div>
                    <Divider className='divider' />
                    <Menu.Item
                        key='5'
                        icon={
                            <LogoutIcon
                                className={collapsed ? 'icon_exit' : 'icon_exit__padding'}
                            />
                        }
                        {...(width === 208 ? {} : { style: { textAlign: 'center' } })}
                    >
                        <Link to='/logout'>Выход</Link>
                    </Menu.Item>
                </div>
            </Menu>
        </AntSider>
    );
};
