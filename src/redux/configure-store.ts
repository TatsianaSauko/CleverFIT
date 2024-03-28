import { combineReducers } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';
import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

import authReducer from './slices/AuthSlice';
import feedbackReducer from './slices/FeedbackSlice';
import tariffReducer from './slices/TariffSlice';
import trainingReducer from './slices/TrainingSlice';
import userReducer from './slices/UserSlice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

const rootReducer = combineReducers({
    auth: authReducer,
    feedback: feedbackReducer,
    training: trainingReducer,
    user: userReducer,
    router: routerReducer,
    tariff: tariffReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
