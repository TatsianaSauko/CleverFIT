import { AppDispatch, history } from './configure-store';

import {
    AxiosError,
    IChangePassword,
    ICheckEmail,
    IConfirmEmail,
    ILogin,
    IRegister,
} from '../types/Auth.interface';
import { authFetching, loginSuccess } from './slices/AuthSlice';
import axios from 'axios';

export const register = (data: IRegister) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authFetching({ loading: true }));
            await axios.post(`https://marathon-api.clevertec.ru/auth/registration`, data, {
                withCredentials: true,
            });
            dispatch(authFetching({ loading: false }));
            history.push('/result/success');
        } catch (error) {
            dispatch(authFetching({ loading: false }));
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 409) {
                history.push('/result/error-user-exist');
            } else {
                history.push('/result/error');
            }
        }
    };
};

export const login = (data: ILogin) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authFetching({ loading: true }));
            const response = await axios.post(
                `https://marathon-api.clevertec.ru/auth/login`,
                { email: data.email, password: data.password },
                { withCredentials: true },
            );
            dispatch(
                loginSuccess({
                    email: data.email,
                    remember: data.remember,
                    token: response.data.accessToken,
                }),
            );
            dispatch(authFetching({ loading: false }));
            history.push('/main');
        } catch {
            dispatch(authFetching({ loading: false }));
            history.push('/result/error-login');
        }
    };
};

export const checkEmail = (data: ICheckEmail) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authFetching({ loading: true }));
            await axios.post(
                `https://marathon-api.clevertec.ru/auth/check-email`,
                { email: data.email },
                { withCredentials: true },
            );
            dispatch(authFetching({ loading: false }));
            history.push('/auth/confirm-email');
        } catch (error) {
            dispatch(authFetching({ loading: false }));
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                const { status, data } = axiosError.response;
                if (status === 404 && data && data.message === 'Email не найден') {
                    history.push('/result/error-check-email-no-exist');
                } else {
                    history.push('/result/error-check-email');
                }
            }
        }
    };
};

export const confirmEmail = (data: IConfirmEmail) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authFetching({ loading: true }));
            await axios.post(
                `https://marathon-api.clevertec.ru/auth/confirm-email`,
                { email: data.email, code: data.code },
                { withCredentials: true },
            );
            dispatch(authFetching({ loading: false }));
            history.push('/auth/change-password');
        } catch (error) {
            dispatch(authFetching({ loading: false }));
            throw Error();
        }
    };
};

export const changePassword = (data: IChangePassword) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authFetching({ loading: true }));
            await axios.post(
                `https://marathon-api.clevertec.ru/auth/change-password`,
                { password: data.password, confirmPassword: data.confirmPassword },
                { withCredentials: true },
            );
            dispatch(authFetching({ loading: false }));
            history.push('/result/success-change-password');
        } catch (error) {
            dispatch(authFetching({ loading: false }));
            history.push('/result/error-change-password');
        }
    };
};
