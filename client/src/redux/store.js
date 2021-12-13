import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/loginSlice';

export const store = configureStore({
    reducer: {
        user: userReducer
    }
});