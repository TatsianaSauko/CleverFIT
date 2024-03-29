import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { ButtonSiderToggleProps } from '../../types/Props';

import './buttonSiderToggle.css';

export const ButtonSiderToggle = ({ collapsed, toggleCollapsed }: ButtonSiderToggleProps) => (
    <div>
        {collapsed ? (
            <MenuUnfoldOutlined
                className='sider-switch trigger'
                data-test-id='sider-switch'
                onClick={toggleCollapsed}
            />
        ) : (
            <MenuFoldOutlined
                className='sider-switch trigger'
                data-test-id='sider-switch'
                onClick={toggleCollapsed}
            />
        )}
        {!collapsed ? (
            <MenuUnfoldOutlined
                className='sider-switch-mobile trigger'
                data-test-id='sider-switch-mobile'
                onClick={toggleCollapsed}
            />
        ) : (
            <MenuFoldOutlined
                className='sider-switch-mobile'
                data-test-id='sider-switch-mobile'
                onClick={toggleCollapsed}
            />
        )}
    </div>
);
