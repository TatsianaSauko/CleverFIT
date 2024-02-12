import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { ButtonSiderToggleProps } from '../../types/ButtonSiderToggleProps.interface';

import './buttonSiderToggle.css';

export const ButtonSiderToggle = ({
    collapsed,
    toggleCollapsed,
    collapsedMobile,
    toggleCollapsedMobile,
}: ButtonSiderToggleProps) => (
    <>
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
        {!collapsedMobile ? (
            <MenuUnfoldOutlined
                className='sider-switch-mobile'
                data-test-id='sider-switch-mobile'
                onClick={toggleCollapsedMobile}
            />
        ) : (
            <MenuFoldOutlined
                className='sider-switch-mobile trigger'
                data-test-id='sider-switch-mobile'
                onClick={toggleCollapsedMobile}
            />
        )}
    </>
);
