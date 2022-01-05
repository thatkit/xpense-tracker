import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/loginSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
    reducer: {
        currentUser: userReducer,
        ui: uiReducer
    }
});