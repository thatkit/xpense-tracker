import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCookies } from '../../helpers/cookies';

// @ action     loginUser
// @ desc       Login user to receive JWT
// @ POST       api/users/login
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ email, password }, thunkAPI) => {
        let response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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

// @ action     fetchUser
// @ desc       Fetch user with JWT
// @ GET        api/users/login
export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (jwtToken = getCookies('jwt_token'), thunkAPI) => {
        let response = await fetch('/api/users/login', {
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

// @ action     fetchLists
// @ desc       Fetch user's lists with JWT
// @ GET        api/lists
export const fetchLists = createAsyncThunk(
    'user/fetchLists',
    async ( arg, thunkAPI) => {
        let response = await fetch('/api/lists', {
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

export const currentUserSlice = createSlice({
    name: 'user',
    initialState: {
        isLoginned: false,
        logging: false,
        loggingError: false,
        loggingErrorMes: null,
        userData: {
            lists: []
        },
        listsFetching: false,
        listsFetchingErr: null,
        listsFetchingErrMes: null
    },
    reducers: {},
    extraReducers: (builder) => {
        // @ reducer    loginUser
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            document.cookie = `jwt_token=${payload.token}`;
            return {
                ...state,
                isLoginned: true,
                userData: payload.user,
                logging: false
            }
        });
        builder.addCase(loginUser.pending, (state) => ({
            ...state,
            logging: true,
            loggingError: false,
            loggingErrorMes: null,
            isLoginned: false,
            userData: null
        }));
        builder.addCase(loginUser.rejected, (state, { error }) => ({
            ...state,
            loggingError: true,
            loggingErrorMes: error.message,
            logging: false
        }));
        // @ reducer    fetchUser
        builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
            return {
                ...state,
                isLoginned: true,
                userData: payload,
                logging: false
            }
        });
        builder.addCase(fetchUser.pending, (state) => ({
            ...state,
            logging: true,
            loggingError: false,
            loggingErrorMes: null,
            isLoginned: false,
            userData: null
        }));
        builder.addCase(fetchUser.rejected, (state, { error }) => ({
            ...state,
            loggingError: true,
            loggingErrorMes: error.message,
            logging: false
        }));
        // @ reducer    fetchLists
        builder.addCase(fetchLists.fulfilled, (state, { payload }) => {
            return {
                ...state,
                userData: { lists: payload },
                listsFetching: false,
                listsFetchingErr: null,
                listsFetchingErrMes: null,
            }
        });
        builder.addCase(fetchLists.pending, (state) => ({
            ...state,
            listsFetching: true,
            listsFetchingErr: false,
            listsFetchingErrMes: null,
        }));
        builder.addCase(fetchLists.rejected, (state, { error }) => ({
            ...state,
            listsFetchingErr: true,
            listsFetchingErrMes: error.message,
            listsFetching: false
        }));
    }
});

export default currentUserSlice.reducer;