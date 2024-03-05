import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelector, loginSuccess, logout } from '@redux/slices/AuthSlice';
import { Sider } from '@components/Sider';
import { Header } from '@components/Header';
import { ButtonSiderToggle } from '@components/ButtonSiderToggle';
import { history } from '@redux/configure-store';
import { Loader } from '@components/Loader';
import { Path } from '@constants/paths';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';

import './rootLayout.css';

const { Footer } = Layout;

export const RootLayout: React.FC = () => {
    const dispatch = useAppDispatch();
    const { token, loading } = useSelector(authSelector);
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    if (location?.search) {
        const searchString = location.search.split('=');
        if (searchString[0] == '?accessToken') {
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

    return (
        <Layout className='main-page'>
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
