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

export const currentListSlice = createSlice({
    name: 'list',
    initialState: {
        listData: null,
        listFetching: false,
        listFetchingErr: false,
        listFetchingErrMes: null
    },
    reducers: {},
    extraReducers: (builder) => {
        // @ reducer    fetchLists
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
    }
});

export default currentListSlice.reducer;