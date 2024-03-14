import { AppDispatch, history } from './configure-store';
import { authFetching, loginSuccess, logout } from './slices/AuthSlice';
import { Path } from '@constants/paths';
import { StatusCodes } from '@constants/statusCodes';
import { BaseUrl, Endpoints } from '@constants/api';
import axios from 'axios';
import {
    AxiosError,
    Feedback,
    FormFeedback,
    IChangePassword,
    ICheckEmail,
    IConfirmEmail,
    IGetFeedback,
    ILogin,
    IRegister,
} from '../types/Types';
import { setFeedback } from './slices/FeedbackSlice';
import { setActivitiesData, setTrainingList } from './slices/TrainingSlice';
import { transformedData } from '@utils/transformedData';

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

export const getFeedback = (data: IGetFeedback) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authFetching({ loading: true }));
            const headers = {
                Authorization: `Bearer ${data.token}`,
                'Content-Type': 'application/json',
            };
            const response = await axios.get(`${BaseUrl}${Endpoints.Feedback}`, { headers });
            const feedbackSort = response.data.sort(
                (a: Feedback, b: Feedback) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
            );
            dispatch(setFeedback({ feedbacks: feedbackSort }));
            dispatch(authFetching({ loading: false }));
            history.push(Path.Feedbacks);
        } catch (error) {
            dispatch(authFetching({ loading: false }));
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                const { status } = axiosError.response;
                if (status === StatusCodes.FORBIDDEN) {
                    dispatch(logout());
                    history.push(Path.Auth);
                } else {
                    throw Error();
                }
            }
        }
    };
};

export const feedback = (data: FormFeedback, token: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authFetching({ loading: true }));
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            await axios.post(
                `${BaseUrl}${Endpoints.Feedback}`,
                { message: data.message, rating: data.rating },
                { headers },
            );
            dispatch(authFetching({ loading: false }));
        } catch {
            dispatch(authFetching({ loading: false }));
            throw Error();
        }
    };
};

export const getTrainingUser = (data: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authFetching({ loading: true }));
            const headers = {
                Authorization: `Bearer ${data}`,
                'Content-Type': 'application/json',
            };
            const response = await axios.get(`${BaseUrl}${Endpoints.Training}`, { headers });
            console.log('response',response)
            const transform = transformedData(response.data)
            dispatch(setActivitiesData({ activitiesData: transform }));
            dispatch(authFetching({ loading: false }));
        } catch {
            dispatch(authFetching({ loading: false }));
            throw Error();
        }
    };
};

export const getTrainingList = (data: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authFetching({ loading: true }));
            const headers = {
                Authorization: `Bearer ${data}`,
                'Content-Type': 'application/json',
            };
            const response = await axios.get(`${BaseUrl}${Endpoints.CatalogsTrainingList}`, {
                headers,
            });
            dispatch(setTrainingList({ trainingList: response.data }));
            dispatch(authFetching({ loading: false }));
        } catch {
            dispatch(authFetching({ loading: false }));
            throw Error();
        }
    };
};

export const createTraining = (data: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authFetching({ loading: true }));
            const headers = {
                Authorization: `Bearer ${data}`,
                'Content-Type': 'application/json',
            };
            const post = {
                name: 'Спина',
                date: '2024-03-16T00:00:00.000Z',

                exercises: [
                    {
                        name: 'Скручивание',
                        replays: 1,
                        weight: 3,
                        approaches: 3,
                    },
                    {
                        name: 'Тяга',
                        replays: 2,
                        weight: 2,
                        approaches: 3,
                    },
                ],
            };

            const response = await axios.post(`${BaseUrl}${Endpoints.Training}`, post, {
                headers,
            });
            console.log(response);
            // dispatch(setTrainingList({ trainingList: response.data }));
            dispatch(authFetching({ loading: false }));
        } catch (error) {
            dispatch(authFetching({ loading: false }));
            console.log(error);
            // throw Error();
        }
    };
};

export const putTraining = (data: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authFetching({ loading: true }));
            const headers = {
                Authorization: `Bearer ${data}`,
                'Content-Type': 'application/json',
            };
            const post = {
                name: 'Руки',
                date: '2024-03-20T00:00:00.000Z',

                exercises: [
                    {
                        name: 'Скручивание',
                        replays: 10,
                        weight: 10,
                        approaches: 10,
                    },
                ],
            };
            const id = '65f2b9a275077c710a3ef94f'
            const response = await axios.put(`${BaseUrl}${Endpoints.Training}/${id}`, post, {
                headers,
            });
            console.log(response);
            // dispatch(setTrainingList({ trainingList: response.data }));
            dispatch(authFetching({ loading: false }));
        } catch (error) {
            dispatch(authFetching({ loading: false }));
            console.log(error);
            // throw Error();
        }
    };
};

export const deleteTraining = (data: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authFetching({ loading: true }));
            const headers = {
                Authorization: `Bearer ${data}`,
                'Content-Type': 'application/json',
            };
            const id = '65eea9baea1c7766036922c3'
            const response = await axios.delete(`${BaseUrl}${Endpoints.Training}/${id}`, {headers});
            console.log(response);
            // dispatch(setTrainingList({ trainingList: response.data }));
            dispatch(authFetching({ loading: false }));
        } catch (error) {
            dispatch(authFetching({ loading: false }));
            console.log(error);
            // throw Error();
        }
    };
};

