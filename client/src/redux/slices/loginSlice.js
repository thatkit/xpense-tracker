import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// @ action     fetchUserByEmail
export const fetchUserByEmail = createAsyncThunk(
    'users/fetchUserByEmail',
    async (arg, thunkAPI) => {
        let response = await fetch('/api/users');
        response = await response.json();
        return response;
    }
);

export const loginSlice = createSlice({
    name: 'users',
    initialState: {
        isLoggedIn: false,
        fetchingUser: false,
        fetchingUserError: false,
        users: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserByEmail.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.fetchingUser = false;
            state.fetchingUserError = false;
            state.users.push(action.payload);
        });
        builder.addCase(fetchUserByEmail.pending, (state) => {
            state.isLoggedIn = false;
            state.fetchingUser = true;
            state.fetchingUserError = false;
        });
        builder.addCase(fetchUserByEmail.rejected, (state) => {
            state.isLoggedIn = false;
            state.fetchingUser = false;
            state.fetchingUserError = true;
        });
        
    }
});

console.log(loginSlice.actions)

export default loginSlice.reducer;