import { createSlice } from '@reduxjs/toolkit';
// ACTIONS
// @    user
import {
    validateUserName,
    validateUserEmail,
    validateUserPassword,
    validateUserRepPassword,
} from '../actions/validation/user';
// @    list
// @    item
import { validateItemName, validateItemSum } from '../actions/validation/item';
// EXTRA REDUCERS
// @    user
import {
    validateUserNameFulfilled, validateUserNameRejected,
    validateUserEmailFulfilled, validateUserEmailRejected,
    validateUserPasswordFulfilled, validateUserPasswordRejected,
    validateUserRepPasswordFulfilled, validateUserRepPasswordRejected,
} from '../extraReducers/validation/user';
// @    list
// @    item
import {
    validateItemNameFulfilled, validateItemNameRejected,
    validateItemSumFulfilled, validateItemSumRejected
} from '../extraReducers/validation/item';

const validationStateObj = {
    isValid: false,
    error: { isError: false, mes: '' }
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
            desc: {
                isValid: true,
                error: { isError: false, mes: '' }
            },
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
        builder.addCase(validateItemName.fulfilled, validateItemNameFulfilled);
        builder.addCase(validateItemName.rejected, validateItemNameRejected);
        // @ item/sum
        builder.addCase(validateItemSum.fulfilled, validateItemSumFulfilled);
        builder.addCase(validateItemSum.rejected, validateItemSumRejected);
    }
});

export default validationSlice.reducer;