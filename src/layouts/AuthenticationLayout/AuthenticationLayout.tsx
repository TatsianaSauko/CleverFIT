import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import formLogo from '/png/formLogo.png';
import formLogoMobile from '/png/logo203.png';

import './authenticationLayout.css';

export const AuthenticationLayout: React.FC = () => {
    const [activeButton, setActiveButton] = useState('login');
    return (
        <div className='auth-wrapper'>
            <div className='auth-wrapper__content'>
                <div className='auth-wrapper__logo'>
                    <img src={formLogo} alt='CleverFit' className='auth-logo auth-logo_hidden' />
                    <img src={formLogoMobile} alt='CleverFit' className='auth-logo-mobile' />
                </div>
                <div className='auth-wrapper__buttons'>
                    <NavLink
                        className={`auth-btn ${activeButton === 'login' ? 'auth-active' : ''}`}
                        to='/auth'
                        onClick={() => setActiveButton('login')}
                    >
                        Вход
                    </NavLink>
                    <NavLink
                        className={`auth-btn ${activeButton === 'register' ? 'auth-active' : ''}`}
                        to='/auth/registration'
                        onClick={() => setActiveButton('register')}
                    >
                        Регистрация
                    </NavLink>
                </div>
                <Outlet />
            </div>
        </div>
    );
};
