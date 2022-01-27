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

// @ action     addList
// @ desc       Add new user's list with JWT
// @ POST       api/lists
export const addList = createAsyncThunk(
    'api/lists/addList',
    async (arg, { getState }) => {
        // retrieving newList props from store
        const { name, totalBudget } = getState().api.lists.newList;

        let response = await fetch('/api/lists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': getCookies('jwt_token')
            },
            body: JSON.stringify({
                name,
                totalBudget
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

// @ action     removeList
// @ desc       Remove an item from user's current list with JWT
// @ DELETE     api/lists/:listId
export const removeList = createAsyncThunk(
    'api/lists/removeList',
    async (arg, { getState }) => {
        // retrieving states
        const listId = getState().api.lists.currentList.id;

        let response = await fetch(`/api/lists/${listId}`, {
            method: 'DELETE',
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