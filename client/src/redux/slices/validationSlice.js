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
} from '../extraReducers/validation/user';

const validationStateObj = {
    isValid: false,
    error: { isError: false, mes: ''}
}

export const validationSlice = createSlice({
    name: 'validation',
    initialState: {
        register: {
            name: validationStateObj,
            email: validationStateObj,
            password: validationStateObj,
            repPassword: {
                isMatched: false,
                error: { isError: false, mes: ''}
            }
        },
        list: {
            name: validationStateObj,
            totalBudget: validationStateObj
        },
        item: {
            name: validationStateObj,
            sum: validationStateObj
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
        // LIST validation
        // @ list/name
        // @ list/totalBudget
        // ITEM validation
        // @ item/name
        // @ item/sum
    }
});

export default validationSlice.reducer;