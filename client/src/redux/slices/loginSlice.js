import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// @ action     fetchUserByEmail
export const fetchUserByCredentials = createAsyncThunk(
    'user/fetchUserByEmail',
    async ({ email, password }, thunkAPI) => {
        let response = await fetch(`/api/users/${email}/${password}`);
        response = await response.json();
        return response;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        fetchingUser: false,
        fetchingUserError: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserByCredentials.fulfilled, (state) => {
            state.isLoggedIn = true;
            state.fetchingUser = false;
            state.fetchingUserError = false;
        });
        builder.addCase(fetchUserByCredentials.pending, (state) => {
            state.isLoggedIn = false;
            state.fetchingUser = true;
            state.fetchingUserError = false;
        });
        builder.addCase(fetchUserByCredentials.rejected, (state) => {
            state.isLoggedIn = false;
            state.fetchingUser = false;
            state.fetchingUserError = true;
        });
        
    }
});

export default userSlice.reducer;