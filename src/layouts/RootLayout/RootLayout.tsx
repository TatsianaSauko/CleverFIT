import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { ButtonSiderToggle } from '@components/ButtonSiderToggle';
import { Header } from '@components/Header';
import { Loader } from '@components/Loader';
import { Sider } from '@components/Sider';
import { Path } from '@constants/paths';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { getUserMe } from '@redux/ActionCreators';
import { history } from '@redux/configure-store';
import { authSelector, loginSuccess, logout } from '@redux/slices/AuthSlice';
import { Layout } from 'antd';

import './rootLayout.css';

const { Footer } = Layout;

export const RootLayout: React.FC = () => {
    const dispatch = useAppDispatch();
    const { token, loading } = useSelector(authSelector);
    const [collapsed, setCollapsed] = useState(false);
    const [isPageSettings, setIsPageSettings] = useState(false);
    const location = useLocation();

    if (location?.search) {
        const searchString = location.search.split('=');

        if (searchString[0] == '?accessToken') {
            dispatch(getUserMe(searchString[1]));
            dispatch(
                loginSuccess({
                    remember: true,
                    token: searchString[1],
                }),
            );
        }
    }

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        if (!token) {
            history.push(Path.Auth);
            dispatch(logout());
        }
    }, [token]);

    useEffect(() => {
        setIsPageSettings(location.pathname === '/settings');
    }, [location]);

    return (
        <Layout className={isPageSettings ? 'main-settings' : 'main-page'}>
            {loading && <Loader />}
            <Sider collapsed={collapsed} />
            <Layout className='site_layout'>
                <ButtonSiderToggle collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
                <Header />
                <Outlet />
                <Footer className='footer' />
            </Layout>
        </Layout>
    );
};
