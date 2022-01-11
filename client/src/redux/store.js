import { configureStore } from '@reduxjs/toolkit';
import listReducer from './slices/currentListSlice';
import itemReducer from './slices/currentItemSlice';
import apiReducer from './slices/apiSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
    reducer: {
        currentList: listReducer,
        currentItem: itemReducer,
        api: apiReducer,
        ui: uiReducer
    }
});