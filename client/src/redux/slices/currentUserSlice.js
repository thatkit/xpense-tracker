import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

// // @ action     postNewUser
// // @ POST       api/users/register
// export const postNewUser = createAsyncThunk(
//     'user/postNewUser',
//     async ({ name, email, password }, thunkAPI) => {
//         let response = await fetch('/api/users', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, password })
//         });
//         response = await response.json();
//         return response;
//     }
// );

export const currentUserSlice = createSlice({
    name: 'user',
    initialState: {
        isLoginned: false,
        logging: false,
        loggingError: false,
        loggingErrorMes: null,
        userData: null
    },
    reducers: {
        // @ reducer    authUser
        authUser(state, { payload }) {
            console.log(state.isLoginned);
            console.log(payload);
        }
    },
    extraReducers: (builder) => {
        // @ reducer    loginUser
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            document.cookie = `jwt_token=${payload.token}`;
            return {
                ...state,
                isLoginned: true,
                userData: payload,
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
        // builder.addCase(fetchUserByCredentials.fulfilled, (state, { payload }) => {
        //     state.isRegisteredUser = payload.isRegistered;
        //     state.fetchingUser = false;
        //     state.fetchingUserError = false;
        // });
        // builder.addCase(fetchUserByCredentials.pending, (state) => {
        //     state.isRegisteredUser = false;
        //     state.fetchingUser = true;
        //     state.fetchingUserError = false;
        // });
        // builder.addCase(fetchUserByCredentials.rejected, (state) => {
        //     state.isRegisteredUser = false;
        //     state.fetchingUser = false;
        //     state.fetchingUserError = true;
        // });
        // // @ reducer    addNewUserCredentials
        // builder.addCase(addNewUserCredentials.fulfilled, (state) => {
        //     state.registeringUser = false;
        //     state.registeringUserError = false;
        // });
        // builder.addCase(addNewUserCredentials.pending, (state) => {
        //     state.registeringUser = true;
        //     state.registeringUserError = false;
        // });
        // builder.addCase(addNewUserCredentials.rejected, (state) => {
        //     state.registeringUser = false;
        //     state.registeringUserError = true;
        // });
    }
});

export default currentUserSlice.reducer;