import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@redux/configure-store';
import { User } from '../../types/Types';

type InitialState = {
    user: User;
};

const initialState: InitialState = {
    user: {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        birthday: '',
        imgSrc: '',
        readyForJointTraining: false,
        sendNotification: false,
        tariff: {
            tariffId: '',
            expired: '',
        },
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<{ user: User }>) {
            state.user = action.payload.user;
        },
        // setUserEmail(state, action: PayloadAction<{email: string}>) {
        //     state.user.email = action.payload.email;
        // },
        // setUserPassword(state, action: PayloadAction<{password: string}>) {
        //     state.user.password = action.payload.password;
        // },
        // setUserImgSrc(state, action: PayloadAction<{imgSrc: string}>) {
        //     state.user.imgSrc = action.payload.imgSrc;
        // },
    },
});

export const { setUserData } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
