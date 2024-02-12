import { Link } from 'react-router-dom';
import { Menu, Divider } from 'antd';
import { Layout as AntLayout } from 'antd';
import { HeartIcon, TrophyIcon, CalendarIcon, IdCardIcon, LogoutIcon } from '../../icons';
import cleverFit from '/png/cleverFit.png';
import fit from '/png/fit.png';

import './sider.css';

const { Sider: AntSider } = AntLayout;

export const Sider = ({ collapsed }: { collapsed: boolean }) => (
    <AntSider
        width={208}
        collapsedWidth={64}
        trigger={null}
        collapsible
        collapsed={collapsed}
        className='aside'
    >
        <div className='logo'>
            {!collapsed ? <img src={cleverFit} alt='CleverFit' className='logo_large' /> : null}
            {collapsed ? <img src={fit} alt='Fit' className='logo_small' /> : null}
        </div>
        <Menu className='menu' mode='inline'>
            <Menu.Item
                key='1'
                icon={<CalendarIcon />}
                style={collapsed ? {} : { paddingLeft: '16px' }}
            >
                <Link to='/calendar'>Календарь</Link>
            </Menu.Item>
            <Menu.Item
                key='2'
                icon={<HeartIcon />}
                style={collapsed ? {} : { paddingLeft: '16px' }}
            >
                <Link to='/training'>Тренировки</Link>
            </Menu.Item>
            <Menu.Item
                key='3'
                icon={<TrophyIcon />}
                style={collapsed ? {} : { paddingLeft: '16px' }}
            >
                <Link to='/achievements'>Достижения</Link>
            </Menu.Item>
            <Menu.Item
                key='4'
                icon={<IdCardIcon />}
                style={collapsed ? {} : { paddingLeft: '16px' }}
            >
                <Link to='/profile'>Профиль</Link>
            </Menu.Item>
            <div>
                <Divider className='divider' />
                <Menu.Item
                    key='5'
                    icon={<LogoutIcon className={collapsed ? 'icon_exit' : 'icon_exit__padding'} />}
                >
                    <Link to='/logout'>Выход</Link>
                </Menu.Item>
            </div>
        </Menu>
    </AntSider>
);
