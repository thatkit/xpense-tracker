import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookies } from '../../../helpers/cookies';

// ACTIONS for users

// @ action     loginUser
// @ desc       Login user to receive JWT
// @ POST       api/users/login
export const loginUser = createAsyncThunk(
    'api/users/loginUser',
    async ({ email, password }, thunkAPI) => {
        let response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.status !== 200) {
            response = await response.json(); 
            throw new Error(response.message)
        }
        
        response = await response.json();   
        return response;      
    }
);

// @ action     registerUser
// @ desc       Register new user
// @ POST       api/users/register
export const registerUser = createAsyncThunk(
    'api/users/registerUser',
    async (arg, { getState }) => {
        const { name, email, password } = getState().api.users.newUser;

        let response = await fetch('/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        if (response.status !== 200) {
            response = await response.json(); 
            throw new Error(response.message)
        }
        
        response = await response.json();   
        return response;      
    }
);

// @ action     fetchUser
// @ desc       Fetch user with JWT
// @ GET        api/users/login
export const fetchUser = createAsyncThunk(
    'api/users/fetchUser',
    async (arg, thunkAPI) => {
        let response = await fetch('/api/users/login', {
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