import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCookies } from '../../helpers/cookies';

// @ action     updateItem
// @ desc       Update current item to user's current list with JWT
// @ PUT        api/items
export const updateItem = createAsyncThunk(
    'list/updateItem',
    async ({
        itemId,
        name,
        desc,
        sum
    }, thunkAPI) => {
        let response = await fetch('/api/items', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': getCookies('jwt_token')
            },
            body: JSON.stringify({
                itemId,
                name,
                desc,
                sum
            })
        });

        if (response.status !== 200) {
            response = await response.json(); 
            throw new Error(response.message)
        }
        
        response = await response.json();
        return response;      
    }
);

// @ action     removeItem
// @ desc       Remove an item from user's current list with JWT
// @ DELETE     api/items/:itemId
export const removeItem = createAsyncThunk(
    'list/removeItem',
    async (arg, thunkAPI) => {
        const { currentList, ui } = thunkAPI.getState();
        const jwtToken = getCookies('jwt_token');

        let response = await fetch(`/api/items/${ui.currentItem._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': jwtToken
            },
            body: JSON.stringify({ listId: currentList.listData._id })
        });

        if (response.status !== 200) {
            response = await response.json(); 
            throw new Error(response.message)
        }
        
        response = await response.json();
        return response;      
    }
);

export const currentListSlice = createSlice({
    name: 'list',
    initialState: {
        // list GET
        listData: {
            _id: '',
            name: '',
            totalBudget: 0,
            totalCosts: 0, //# do I really need it?
            items: []
        },
        listFetching: false,
        listFetchingErr: false,
        listFetchingErrMes: null,
        // item actions for 'POST', 'PUT' and 'DELETE' requests 
        itemActions: {
            actionName: '',
            // POST
            // PUT
            edit: {
                isSuccess: false,
                isProcessing: false,
                isError: false,
                errorMes: ''
            }
            // DELETE
        },
        // item POST
        itemSent: false,
        itemSending: false,
        itemSendingErr: false,
        itemSendingErrMes: null,
        // item DELETE
        itemRemoved: false,
        itemRemoving: false,
        itemRemovingErr: false,
        itemRemovingErrMes: null
    },
    reducers: {
        // @ reducer    setActionName
        setActionName({ itemActions }, { payload }) { itemActions.actionName = payload }
    },
    extraReducers: (builder) => {
        // @ reducer    addItem
        builder.addCase(updateItem.fulfilled, ({ itemActions }, { payload }) => {
            return {
                ...itemActions,
                edit: {
                    isSuccess: true,
                    isProcessing: false,
                    isError: false,
                    errorMes: null
                }
            }
        });
        builder.addCase(updateItem.pending, ({ itemActions }) => ({
            ...itemActions,
            edit: {
                isSuccess: false,
                isProcessing: true,
                isError: false,
                errorMes: null
            }
        }));
        builder.addCase(updateItem.rejected, ({ itemActions }, { error }) => ({
            ...itemActions,
            edit: {
                isSuccess: false,
                isProcessing: false,
                isError: true,
                errorMes: error.message
            }
        }));
        // @ reducer    removeItem
        builder.addCase(removeItem.fulfilled, (state) => {
            return {
                ...state,
                itemRemoved: true,
                itemRemoving: false,
                itemRemovingErr: false,
                itemRemovingErrMes: null
            }
        });
        builder.addCase(removeItem.pending, (state) => ({
            ...state,
            itemRemoved: false,
            itemRemoving: true,
            itemSendingErr: false,
            itemSendingErrMes: null
        }));
        builder.addCase(removeItem.rejected, (state, { error }) => ({
            ...state,
            itemRemoved: false,
            itemRemoving: false,
            itemRemovingErr: true,
            itemRemovingErrMes: error.message
        }));
    }
});

export const { setActionName } = currentListSlice.actions;
export default currentListSlice.reducer;