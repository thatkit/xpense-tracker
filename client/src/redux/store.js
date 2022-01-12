import { configureStore } from '@reduxjs/toolkit';
import listReducer from './slices/currentListSlice';
import apiReducer from './slices/apiSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
    reducer: {
        currentList: listReducer,
        api: apiReducer,
        ui: uiReducer
    }
});