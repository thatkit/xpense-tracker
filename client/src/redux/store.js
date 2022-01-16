import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './slices/apiSlice';
import validationReducer from './slices/validationSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
    reducer: {
        api: apiReducer,
        validation: validationReducer,
        ui: uiReducer
    }
});