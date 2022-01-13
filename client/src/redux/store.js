import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './slices/apiSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
    reducer: {
        api: apiReducer,
        ui: uiReducer
    }
});