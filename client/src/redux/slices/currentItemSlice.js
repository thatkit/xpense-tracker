import { createSlice } from "@reduxjs/toolkit";

export const currentItemSlice = createSlice({
    name: 'currentItem',
    initialState: {
        _id: '',
        prevId: '',
        inputData: { name: '', desc: '', sum: 0 }
    },
    reducers: {
        // reducer for typing input values and saving to the store
        // typeItem({ inputData }, { payload }) {
        //     return { ...inputData, [payload.inputType]: payload.value };
        // }
        typeItem(state, { payload }) {
            return {
                ...state,
                inputData: {
                    ...this.inputData,
                    [payload.inputType]: payload.inputValue
                }
            };
        }
    }
});

export const { typeItem } = currentItemSlice.actions;
export default currentItemSlice.reducer;