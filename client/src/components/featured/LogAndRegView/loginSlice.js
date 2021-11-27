import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'isLoggedIn',
    initialState: { isLoggedIn: false },
    reducers: {
        logIn: (state) => {
            // put fetch() logic here
            // if fetch login OK then
            state.isLoggedIn = true
        },
        logOut: (state) => {state.isLoggedIn = false}
    }
});

export const { logIn, logOut } = loginSlice.actions;
export default loginSlice.reducer;