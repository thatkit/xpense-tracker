import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/currentUserSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
    reducer: {
        currentUser: userReducer,
        ui: uiReducer
    }
});