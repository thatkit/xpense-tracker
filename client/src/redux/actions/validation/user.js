import { createAsyncThunk } from "@reduxjs/toolkit";
import validator from 'validator';

// @ action     validateUserName
export const validateUserName = createAsyncThunk(
    'validation/user/name',
    (arg, { getState }) => {
        let { name } = getState().api.users.newUser;  
        
        if (!name) throw new Error('Please, fill in your name');
        if (name.length < 4) throw new Error('Your name must include 4 symbols at least');
        if (!validator.isAlphanumeric(name)) throw new Error('Please, use only letters or numbers');

        return true;      
    }
);

// @ action     validateUserEmail
export const validateUserEmail = createAsyncThunk(
    'validation/user/email',
    (arg, { getState }) => {
        let { email } = getState().api.users.newUser;  
        
        if (!email) throw new Error('Please, fill in your email address');
        if (!validator.isEmail(email)) throw new Error('The email address is invalid');

        return true;      
    }
);

// @ action     validateUserPassword

export const validateUserPassword = createAsyncThunk(
    'validation/user/password',
    (arg, { getState }) => {
        let { password } = getState().api.users.newUser;  
        
        if (!password) throw new Error('Please, fill in your password');
        if (!validator.isStrongPassword(password, {
            minLowercase: 0,
            minUppercase: 0,
            minNumbers: 0,
            minSymbols: 0
        })) throw new Error('The password should contain at least 8 characters');

        return true;      
    }
);

// @ action     validateUserRepPassword

export const validateUserRepPassword = createAsyncThunk(
    'validation/user/repPassword',
    (arg, { getState }) => {
        let { password, repPassword } = getState().api.users.newUser;  
        
        if (!repPassword) throw new Error('Please, repeat your password');
        if (password !== repPassword) throw new Error('The passwords do not match');

        return true;      
    }
);