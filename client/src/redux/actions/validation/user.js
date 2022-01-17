import { createAsyncThunk } from "@reduxjs/toolkit";
import validator from 'validator';

// @ action     validateUserName
export const validateUserName = createAsyncThunk(
    'validation/user/name',
    (arg, { getState }) => {
        let userName = getState().api.users.newUser.name;  
        
        if (!userName) throw new Error('Please, fill in your name');
        if (userName.length < 4) throw new Error('Your name must include 4 symbols at least');
        if (!validator.isAlphanumeric(userName)) throw new Error('Please, use only letters or numbers');

        return true;      
    }
);

// @ action     validateUserEmail
export const validateUserEmail = createAsyncThunk(
    'validation/user/email',
    (arg, { getState }) => {
        let userEmail = getState().api.users.newUser.email;  
        
        if (!userEmail) throw new Error('Please, fill in your email address');
        if (!validator.isEmail(userEmail)) throw new Error('The email address is invalid');

        return true;      
    }
);

// @ action     validateUserPassword

export const validateUserPassword = createAsyncThunk(
    'validation/user/password',
    (arg, { getState }) => {
        let userPassword = getState().api.users.newUser.password;  
        
        if (!userPassword) throw new Error('Please, fill in your password');
        if (!validator.isStrongPassword(userPassword, {
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
        let userPassword = getState().api.users.newUser.password;  
        let userRepPassword = getState().api.users.newUser.repPassword;  
        
        if (!userRepPassword) throw new Error('Please, repeat your password');
        if (userPassword !== userRepPassword) throw new Error('The passwords do not match');

        return true;      
    }
);