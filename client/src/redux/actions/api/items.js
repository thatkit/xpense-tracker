import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookies } from '../../../helpers/cookies';

// ACTIONS for items

// @ action     addItem
// @ desc       Add new item to user's current list with JWT
// @ POST       api/items
export const addItem = createAsyncThunk(
    'api/items/addItem',
    async (arg, { getState }) => {
        // retrieving state
        const itemInputs = getState().api.items.data;
        const listId = getState().api.lists.currentList.id;

        let response = await fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': getCookies('jwt_token')
            },
            body: JSON.stringify({
                listId: listId,
                name: itemInputs.name,
                desc: itemInputs.desc,
                sum: itemInputs.sum
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
    'api/lists/removeItem',
    async (arg, { getState }) => {
        // retrieving states
        const listId = getState().api.lists.currentList.id;
        const itemId = getState().api.items.data.itemId;

        let response = await fetch(`/api/items/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': getCookies('jwt_token')
            },
            body: JSON.stringify({ listId })
        });

        if (response.status !== 200) {
            response = await response.json(); 
            throw new Error(response.message)
        }
        
        response = await response.json();
        return response;      
    }
);

// @ action     updateItem
// @ desc       Update current item to user's current list with JWT
// @ PUT        api/items
export const updateItem = createAsyncThunk(
    'api/lists/updateItem',
    async (arg, { getState }) => {
        // retrieving state
        const itemInputs = getState().api.items.data;

        let response = await fetch('/api/items', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': getCookies('jwt_token')
            },
            body: JSON.stringify({
                itemId: itemInputs.itemId,
                name: itemInputs.name,
                desc: itemInputs.desc,
                sum: itemInputs.sum
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