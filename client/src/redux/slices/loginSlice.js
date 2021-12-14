import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// @ action     fetchUserByCredentials
// @ GET        api/users/:email/:password
export const fetchUserByCredentials = createAsyncThunk(
    'user/fetchUserByCredentials',
    async ({ email, password }, thunkAPI) => {
        let response = await fetch(`/api/users/${email}/${password}`);
        response = await response.json();
        return response;
    }
);

// @ action     addNewUserCredentials
// @ POST       api/users
export const addNewUserCredentials = createAsyncThunk(
    'user/addNewUserCredentials',
    async ({ email, password }, thunkAPI) => {
        let response = await fetch(`/api/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        response = await response.json();
        return response;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isRegisteredUser: false,
        fetchingUser: false,
        fetchingUserError: false,
        registeringUser: false,
        registeringUserError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        // @ reducer    fetchUserByCredentials
        builder.addCase(fetchUserByCredentials.fulfilled, (state, { payload }) => {
            state.isRegisteredUser = payload.isRegistered;
            state.fetchingUser = false;
            state.fetchingUserError = false;
        });
        builder.addCase(fetchUserByCredentials.pending, (state) => {
            state.isRegisteredUser = false;
            state.fetchingUser = true;
            state.fetchingUserError = false;
        });
        builder.addCase(fetchUserByCredentials.rejected, (state) => {
            state.isRegisteredUser = false;
            state.fetchingUser = false;
            state.fetchingUserError = true;
        });
        // @ reducer    addNewUserCredentials
        builder.addCase(addNewUserCredentials.fulfilled, (state) => {
            state.registeringUser = false;
            state.registeringUserError = false;
        });
        builder.addCase(addNewUserCredentials.pending, (state) => {
            state.registeringUser = true;
            state.registeringUserError = false;
        });
        builder.addCase(addNewUserCredentials.rejected, (state) => {
            state.registeringUser = false;
            state.registeringUserError = true;
        });
    }
});

export default userSlice.reducer;