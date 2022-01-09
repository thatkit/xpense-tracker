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
        typeItem(state, { payload }) { state.inputData = payload }
    }
});

export const { typeItem } = currentItemSlice.actions;
export default currentItemSlice.reducer;