import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../components/featured/LogAndRegView/loginSlice';

export const store = configureStore({
    reducer: {
        login: loginReducer
    }
});