import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// @ action     fetchUserByEmail
export const fetchUserByEmail = createAsyncThunk(
    'users/fetchUserByEmail',
    async (email, thunkAPI) => {
        let response = await fetch(`/api/users/${email}`);
        response = await response.json();
        return response;
    }
);

export const loginSlice = createSlice({
    name: 'users',
    initialState: {
        isLoggedIn: false,
        fetchingUser: false,
        fetchingUserError: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserByEmail.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.fetchingUser = false;
            state.fetchingUserError = false;
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

export default loginSlice.reducer;