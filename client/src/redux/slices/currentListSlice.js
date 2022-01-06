import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCookies } from '../../helpers/cookies';

// @ action     fetchList
// @ desc       Fetch user's list with JWT
// @ GET        api/list
export const fetchList = createAsyncThunk(
    'list/fetchList',
    async ({ listId, jwtToken = getCookies('jwt_token')}, thunkAPI) => {
        let response = await fetch(`/api/lists/${listId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': jwtToken
            }
        });

        if (response.status !== 200) {
            response = await response.json(); 
            throw new Error(response.message)
        }
        
        response = await response.json();
        return response;      
    }
);

// @ action     sendItem
// @ desc       Add new item to user's current list with JWT
// @ POST       api/items
export const sendItem = createAsyncThunk(
    'list/sendItem',
    async ({
        listId,
        name,
        desc,
        sum,
        jwtToken = getCookies('jwt_token')
    }, thunkAPI) => {
        let response = await fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': jwtToken
            },
            body: JSON.stringify({
                listId,
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
            totalCosts: 0,
            items: []
        },
        listFetching: false,
        listFetchingErr: false,
        listFetchingErrMes: null,
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
    reducers: {},
    extraReducers: (builder) => {
        // @ reducer    fetchList
        builder.addCase(fetchList.fulfilled, (state, { payload }) => {
            return {
                ...state,
                listData: payload,
                listFetching: false,
                listFetchingErr: false,
                listFetchingErrMes: null,
            }
        });
        builder.addCase(fetchList.pending, (state) => ({
            ...state,
            listFetching: true,
            listFetchingErr: false,
            listFetchingErrMes: null,
        }));
        builder.addCase(fetchList.rejected, (state, { error }) => ({
            ...state,
            listFetchingErr: true,
            listFetchingErrMes: error.message,
            listFetching: false
        }));
        // @ reducer    addItem
        builder.addCase(sendItem.fulfilled, (state, { payload }) => {
            return {
                ...state,
                itemSent: true,
                itemSending: false,
                itemSendingErr: false,
                itemSendingErrMes: null
            }
        });
        builder.addCase(sendItem.pending, (state) => ({
            ...state,
            itemSent: false,
            itemSending: true,
            itemSendingErr: false,
            itemSendingErrMes: null
        }));
        builder.addCase(sendItem.rejected, (state, { error }) => ({
            ...state,
            itemSent: false,
            itemSending: false,
            itemSendingErr: true,
            itemSendingErrMes: error.message
        }));
        // @ reducer    removeItem
        builder.addCase(removeItem.fulfilled, (state, { payload }) => {
            return {
                ...state,
                itemRemoved: true,
                itemRemoving: false,
                itemRemovingErr: false,
                itemRemovingErrMes: null
            }
        });
        builder.addCase(removeItem.pending, (state, { payload }) => ({
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

export default currentListSlice.reducer;