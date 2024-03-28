import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { Loader } from '@components/Loader';
import { Path } from '@constants/paths';
import { history } from '@redux/configure-store';
import { authSelector } from '@redux/slices/AuthSlice';

import './errorLayout.css';

export const ErrorLayout: React.FC = () => {
    const { loading } = useSelector(authSelector);

    const location = useLocation();

    useEffect(() => {
        if (location.key === 'default') {
            history.push(Path.Auth);
        }
    }, []);

    return (
        <div className='error-layout'>
            {loading && <Loader />}
            <Outlet />
        </div>
    );
};
