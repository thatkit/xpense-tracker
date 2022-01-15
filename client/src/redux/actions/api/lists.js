import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookies } from '../../../helpers/cookies';

// ACTIONS for lists

// @ action     fetchAllLists
// @ desc       Fetch user's lists with JWT
// @ GET        api/lists
export const fetchAllLists = createAsyncThunk(
    'api/lists/fetchAllLists',
    async ( arg, thunkAPI) => {
        let response = await fetch('/api/lists', {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': getCookies('jwt_token')
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

// @ action     fetchCurrentList
// @ desc       Fetch user's list with JWT
// @ GET        api/lists
export const fetchCurrentList = createAsyncThunk(
    'api/lists/fetchCurrentList',
    async ({ listId }, thunkAPI) => {
        let response = await fetch(`/api/lists/${listId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': getCookies('jwt_token')
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
