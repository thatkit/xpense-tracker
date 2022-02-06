import { createAsyncThunk } from "@reduxjs/toolkit";
import { isValidSum } from "../../../helpers/validation";

// @ action     validateItemName
export const validateItemName = createAsyncThunk(
    'validation/item/name',
    (arg, { getState }) => {
        let { name } = getState().api.items.data;  
        
        if (!name) throw new Error('Item must have a name');

        return true;      
    }
);

// @ action     validateItemSum
export const validateItemSum = createAsyncThunk(
    'validation/item/sum',
    (arg, { getState }) => {
        let { sum } = getState().api.items.data;  
        
        if (!sum) throw new Error('Item must have a sum');
        if (!isValidSum(sum)) throw new Error('The sum must be a decimal number');

        return true;      
    }
);