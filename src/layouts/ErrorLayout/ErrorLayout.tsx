import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Loader } from '@components/Loader';
import { history } from '@redux/configure-store';

import './errorLayout.css';
import { Path } from '@constants/paths';

export const ErrorLayout: React.FC = () => {
    const { loading } = useAppSelector((state) => state.auth);
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
