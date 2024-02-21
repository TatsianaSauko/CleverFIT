import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';
import { Route, Routes } from 'react-router-dom';

import { store, history } from '@redux/configure-store';
import { MainPage } from './pages';

import 'antd/dist/antd.css';
import 'normalize.css';
import './index.css';
import { LoginPage } from '@pages/LoginPage';
import { AuthenticationLayout } from './layouts/AuthenticationLayout';
import { RegisterPage } from '@pages/RegisterPage';
import { ErrorLoginPage } from '@pages/ErrorLoginPage';
import { SuccessPage } from '@pages/SuccessPage';
import { ErrorUserExistPage } from '@pages/ErrorUserExistPage/ErrorUserExistPage';
import { ErrorPage } from '@pages/ErrorPage';
import { ErrorCheckEmailNoExistPage } from '@pages/ErrorCheckEmailNoExistPage';
import { ErrorCheckEmailPage } from '@pages/ErrorCheckEmailPage';

import { ChangePasswordPage } from '@pages/ChangePasswordPage';
import { ErrorChangePasswordPage } from '@pages/ErrorChangePasswordPage';
import { SuccessChangePasswordPage } from '@pages/SuccessChangePasswordPage';
import { ConfirmEmailPage } from '@pages/ConfirmEmailPage';
import { ErrorLayout } from './layouts/ErrorLayout';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/main' element={<MainPage />} />
                    <Route path='/auth' element={<AuthenticationLayout />}>
                        <Route index element={<LoginPage />} />
                        <Route path='registration' element={<RegisterPage />} />
                    </Route>
                    <Route path='/result' element={<ErrorLayout />}>
                        <Route path='error-login' element={<ErrorLoginPage />} />
                        <Route path='success' element={<SuccessPage />} />
                        <Route path='error-user-exist' element={<ErrorUserExistPage />} />
                        <Route path='error' element={<ErrorPage />} />
                        <Route
                            path='error-check-email-no-exist'
                            element={<ErrorCheckEmailNoExistPage />}
                        />
                        <Route path='error-check-email' element={<ErrorCheckEmailPage />} />
                        <Route path='error-change-password' element={<ErrorChangePasswordPage />} />
                        <Route
                            path='success-change-password'
                            element={<SuccessChangePasswordPage />}
                        />
                    </Route>
                    <Route path='/auth/confirm-email' element={<ConfirmEmailPage />} />
                    <Route path='/auth/change-password' element={<ChangePasswordPage />} />
                </Routes>
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
