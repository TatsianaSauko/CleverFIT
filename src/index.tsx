import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HistoryRouter } from 'redux-first-history/rr6';
import { Path } from '@constants/paths';
import { CalendarPage } from '@pages/CalendarPage';
import { FeedbacksPage } from '@pages/FeedbacksPage';
import { NotFoundPage } from '@pages/NotFoundPage';
import { ProfilePage } from '@pages/ProfilePage';
import { SettingsPage } from '@pages/SettingsPage';
import { history, store } from '@redux/configure-store';

import { AuthenticationLayout } from './layouts/AuthenticationLayout';
import { ErrorLayout } from './layouts/ErrorLayout';
import { RootLayout } from './layouts/RootLayout';
import {
    ChangePasswordPage,
    ConfirmEmailPage,
    ErrorChangePasswordPage,
    ErrorCheckEmailNoExistPage,
    ErrorCheckEmailPage,
    ErrorLoginPage,
    ErrorPage,
    ErrorUserExistPage,
    LoginPage,
    MainPage,
    RegisterPage,
    SuccessChangePasswordPage,
    SuccessPage,
} from './pages';

import 'antd/dist/antd.css';
import 'normalize.css';
import './index.css';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Routes>
                    <Route path={Path.Root} element={<RootLayout />}>
                        <Route
                            path={Path.Root}
                            element={<Navigate to={Path.Main} replace={true} />}
                        />
                        <Route path={Path.Main} element={<MainPage />} />
                        <Route path={Path.Feedbacks} element={<FeedbacksPage />} />
                        <Route path={Path.Calendar} element={<CalendarPage />} />
                        <Route path={Path.Profile} element={<ProfilePage />} />
                        <Route path={Path.Settings} element={<SettingsPage />} />
                    </Route>

                    <Route path={Path.Auth} element={<AuthenticationLayout />}>
                        <Route index={true} element={<LoginPage />} />
                        <Route path={Path.Registration} element={<RegisterPage />} />
                    </Route>
                    <Route path={Path.Result} element={<ErrorLayout />}>
                        <Route path={Path.ErrorLogin} element={<ErrorLoginPage />} />
                        <Route path={Path.Success} element={<SuccessPage />} />
                        <Route path={Path.ErrorUserExist} element={<ErrorUserExistPage />} />
                        <Route path={Path.Error} element={<ErrorPage />} />
                        <Route
                            path={Path.ErrorCheckEmailNoExist}
                            element={<ErrorCheckEmailNoExistPage />}
                        />
                        <Route path={Path.ErrorCheckEmail} element={<ErrorCheckEmailPage />} />
                        <Route
                            path={Path.ErrorChangePassword}
                            element={<ErrorChangePasswordPage />}
                        />
                        <Route
                            path={Path.SuccessChangePassword}
                            element={<SuccessChangePasswordPage />}
                        />
                    </Route>
                    <Route path={Path.ConfirmEmail} element={<ConfirmEmailPage />} />
                    <Route path={Path.ChangePassword} element={<ChangePasswordPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
