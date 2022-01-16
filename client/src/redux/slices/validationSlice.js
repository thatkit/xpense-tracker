import { createSlice } from '@reduxjs/toolkit';
// ACTIONS
import {
    validateUserName,
    validateUserEmail
} from '../actions/validation/user';
// EXTRA REDUCERS
import {
    validateUserNameFulfilled, validateUserNameRejected,
    validateUserEmailFulfilled, validateUserEmailRejected
} from '../extraReducers/validation/user'

export const validationSlice = createSlice({
    name: 'validation',
    initialState: {
        register: {
            name: {
                isValid: false,
                error: { isError: false, mes: ''}
            },
            email: {
                isValid: false,
                error: { isError: false, mes: ''}
            },
            password: {
                isValid: false,
                error: { isError: false, mes: ''}
            },
            repPassword: { isMatched: false }
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        // USER validation
        // @ user/name
        builder.addCase(validateUserName.fulfilled, validateUserNameFulfilled);
        builder.addCase(validateUserName.rejected, validateUserNameRejected);
        // @ user/email
        builder.addCase(validateUserEmail.fulfilled, validateUserEmailFulfilled);
        builder.addCase(validateUserEmail.rejected, validateUserEmailRejected);
        // @ user/password

    }
});

export default validationSlice.reducer;