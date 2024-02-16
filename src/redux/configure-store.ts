import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import authReducer from './slices/AuthSlice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

const rootReducer = combineReducers({
    auth: authReducer,
    router: routerReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// import { combineReducers } from "redux";
// import { configureStore } from "@reduxjs/toolkit";
// import { createReduxHistoryContext } from "redux-first-history";
// import { createBrowserHistory } from "history";

// const {
//   createReduxHistory,
//   routerMiddleware,
//   routerReducer
// } = createReduxHistoryContext({ history: createBrowserHistory() });

// export const store = configureStore({
//   reducer: combineReducers({
//     router: routerReducer
//   }),
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
// });

// export const history = createReduxHistory(store);
