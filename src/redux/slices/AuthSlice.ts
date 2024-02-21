import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const TOKEN = 'token';
const EMAIL = 'email';

interface InitialState {
    isAuthenticated: boolean;
    email: string;
    password: string;
    token: string;
    remember: boolean;
    loading: boolean;
}

const initialState: InitialState = {
    isAuthenticated: Boolean(localStorage.getItem(TOKEN) ?? ''),
    email: localStorage.getItem(EMAIL) ?? '',
    password: '',
    token: localStorage.getItem(TOKEN) ?? '',
    remember: false,
    loading: false,
};

interface EmailPayload {
    email: string;
}

interface PasswordPayload {
    password: string;
}

interface LoadingPayload {
    loading: boolean;
}

interface LoginSuccessPayload {
    email: string;
    token: string;
    remember: boolean;
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authFetching(state, action: PayloadAction<LoadingPayload>) {
            state.loading = action.payload.loading;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.email = '';
            state.token = '';
            localStorage.removeItem(TOKEN);
            localStorage.removeItem(EMAIL);
        },
        loginSuccess(state, action: PayloadAction<LoginSuccessPayload>) {
            state.loading = false;
            state.isAuthenticated = true;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.remember = action.payload.remember;
            if (state.remember) {
                localStorage.setItem(TOKEN, action.payload.token);
                localStorage.setItem(EMAIL, action.payload.email);
            }
        },

        setEmail(state, action: PayloadAction<EmailPayload>) {
            state.email = action.payload.email;
        },
        setPassword(state, action: PayloadAction<PasswordPayload>) {
            state.password = action.payload.password;
        },
    },
});

export const { logout, loginSuccess, setEmail, setPassword, authFetching } = authSlice.actions;

export default authSlice.reducer;
