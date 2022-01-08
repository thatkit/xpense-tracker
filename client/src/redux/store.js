import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/currentUserSlice';
import listReducer from './slices/currentListSlice';
import itemReducer from './slices/currentItemSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
    reducer: {
        currentUser: userReducer,
        currentList: listReducer,
        currentItem: itemReducer,
        ui: uiReducer
    }
});