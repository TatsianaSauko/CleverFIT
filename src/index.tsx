import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';
import { Navigate, Route, Routes } from 'react-router-dom';
import { store, history } from '@redux/configure-store';
import {
    MainPage,
    LoginPage,
    RegisterPage,
    ErrorLoginPage,
    SuccessPage,
    ErrorPage,
    ErrorCheckEmailNoExistPage,
    ErrorCheckEmailPage,
    ErrorChangePasswordPage,
    SuccessChangePasswordPage,
    ConfirmEmailPage,
    ChangePasswordPage,
    ErrorUserExistPage,
} from './pages';
import { AuthenticationLayout } from './layouts/AuthenticationLayout';
import { ErrorLayout } from './layouts/ErrorLayout';
import { Path } from '@constants/paths';
import { RootLayout } from './layouts/RootLayout';
import { FeedbacksPage } from '@pages/FeedbacksPage';
import 'antd/dist/antd.css';
import 'normalize.css';
import './index.css';
import { CalendarPage } from '@pages/CalendarPage';
import { ProfilePage } from '@pages/ProfilePage';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Routes>
                    <Route path={Path.Root} element={<RootLayout />}>
                        <Route path={Path.Root} element={<Navigate to={Path.Main} replace />} />
                        <Route path={Path.Main} element={<MainPage />} />
                        <Route path={Path.Feedbacks} element={<FeedbacksPage />} />
                        <Route path={Path.Calendar} element={<CalendarPage />} />
                        <Route path={Path.Profile} element={<ProfilePage />} />
                    </Route>

                    <Route path={Path.Auth} element={<AuthenticationLayout />}>
                        <Route index element={<LoginPage />} />
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
                </Routes>
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
