import { createSlice } from '@reduxjs/toolkit';
// ACTIONS
import {
    validateUserName,
    validateUserEmail,
    validateUserPassword,
    validateUserRepPassword
} from '../actions/validation/user';
// EXTRA REDUCERS
import {
    validateUserNameFulfilled, validateUserNameRejected,
    validateUserEmailFulfilled, validateUserEmailRejected,
    validateUserPasswordFulfilled, validateUserPasswordRejected,
    validateUserRepPasswordFulfilled, validateUserRepPasswordRejected
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
            repPassword: {
                isMatched: false,
                error: { isError: false, mes: ''}
            }
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
        builder.addCase(validateUserPassword.fulfilled, validateUserPasswordFulfilled);
        builder.addCase(validateUserPassword.rejected, validateUserPasswordRejected);
        // @ user/repPassword
        builder.addCase(validateUserRepPassword.fulfilled, validateUserRepPasswordFulfilled);
        builder.addCase(validateUserRepPassword.rejected, validateUserRepPasswordRejected);
    }
});

export default validationSlice.reducer;