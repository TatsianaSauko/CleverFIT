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

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/auth' element={<AuthenticationLayout />}>
                        <Route index element={<LoginPage />} />
                        <Route path='registration' element={<RegisterPage />} />
                    </Route>
                </Routes>
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
