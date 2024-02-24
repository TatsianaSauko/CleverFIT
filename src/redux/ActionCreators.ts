import { AppDispatch, history } from './configure-store';
import { authFetching, loginSuccess } from './slices/AuthSlice';
import { Path } from '@constants/paths';
import { StatusCodes } from '@constants/statusCodes';
import { BaseUrl, Endpoints } from '@constants/api';
import axios from 'axios';
import {
    AxiosError,
    IChangePassword,
    ICheckEmail,
    IConfirmEmail,
    ILogin,
    IRegister,
} from '../interfaces/Auth.interface';

export const register = (data: IRegister) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authFetching({ loading: true }));
            await axios.post(`${BaseUrl}${Endpoints.Registration}`, data, {
                withCredentials: true,
            });
            dispatch(authFetching({ loading: false }));
            history.push(Path.Success);
        } catch (error) {
            dispatch(authFetching({ loading: false }));
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === StatusCodes.CONFLICT) {
                history.push(Path.ErrorUserExist);
            } else {
                history.push(Path.Error);
            }
        }
    };
};

export const login = (data: ILogin) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authFetching({ loading: true }));
            const response = await axios.post(
                `${BaseUrl}${Endpoints.Login}`,
                { email: data.email, password: data.password },
                { withCredentials: true },
            );
            dispatch(
                loginSuccess({
                    remember: data.remember,
                    token: response.data.accessToken,
                }),
            );
            history.push(Path.Main);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            dispatch(authFetching({ loading: false }));
        } catch {
            dispatch(authFetching({ loading: false }));
            history.push(Path.ErrorLogin);
        }
    };
};

export const checkEmail = (data: ICheckEmail) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authFetching({ loading: true }));
            await axios.post(
                `${BaseUrl}${Endpoints.CheckEmail}`,
                { email: data.email },
                { withCredentials: true },
            );
            dispatch(authFetching({ loading: false }));
            history.push(Path.ConfirmEmail);
        } catch (error) {
            dispatch(authFetching({ loading: false }));
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                const { status, data } = axiosError.response;
                if (
                    status === StatusCodes.NOT_FOUND &&
                    data &&
                    data.message === 'Email не найден'
                ) {
                    history.push(Path.ErrorCheckEmailNoExist);
                } else {
                    history.push(Path.ErrorCheckEmail);
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
                `${BaseUrl}${Endpoints.ConfirmEmail}`,
                { email: data.email, code: data.code },
                { withCredentials: true },
            );
            dispatch(authFetching({ loading: false }));
            history.push(Path.ChangePassword);
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
                `${BaseUrl}${Endpoints.ChangePassword}`,
                { password: data.password, confirmPassword: data.confirmPassword },
                { withCredentials: true },
            );
            dispatch(authFetching({ loading: false }));
            history.push(Path.SuccessChangePassword);
        } catch (error) {
            dispatch(authFetching({ loading: false }));
            history.push(Path.ErrorChangePassword);
        }
    };
};
