import { createAsyncThunk } from "@reduxjs/toolkit";
import { isValidSum } from "../../../helpers/validation";

// @ action     validateListName
export const validateListName = createAsyncThunk(
    'validation/list/name',
    (arg, { getState }) => {
        let { name } = getState().api.lists.newList;  
        
        if (!name) throw new Error('List must have a name');

        return true;      
    }
);

// @ action     validateListTotalBudget
export const validateListTotalBudget = createAsyncThunk(
    'validation/list/totalBudget',
    (arg, { getState }) => {
        let { totalBudget } = getState().api.lists.newList;  
        
        if (!totalBudget) throw new Error('List must have total budget');
        if (!isValidSum(totalBudget)) throw new Error('The total budget must be a decimal number');

        return true;      
    }
);