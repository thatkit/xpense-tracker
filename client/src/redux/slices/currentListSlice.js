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
    async ({ itemData, jwtToken = getCookies('jwt_token')}, thunkAPI) => {
        let response = await fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': jwtToken
            },
            body: {
                listId: itemData.listId,
                name: itemData.name,
                desc: itemData.desc,
                sum: itemData.sum
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

export const currentListSlice = createSlice({
    name: 'list',
    initialState: {
        // list props
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
        // item props
        itemSent: false,
        itemSending: false,
        itemSendingErr: false,
        itemSendingErrMes: null
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
    }
});

export default currentListSlice.reducer;