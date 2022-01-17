// EXTRA REDUCERS for user (register)

// @ validate name

export const validateUserNameFulfilled = (state, { payload }) => ({
    ...state,
    register: {
        ...state.register,
        name: {
            isValid: true,
            error: { isError: false, mes: '' }
        }
    }
});

export const validateUserNameRejected = (state, { error }) => ({
    ...state,
    register: {
        ...state.register,
        name: {
            isValid: false,
            error: { isError: true, mes: error.message }
        }
    }
});

// @ validate email

export const validateUserEmailFulfilled = (state, { payload }) => ({
    ...state,
    register: {
        ...state.register,
        email: {
            isValid: true,
            error: { isError: false, mes: '' }
        }
    }
});

export const validateUserEmailRejected = (state, { error }) => ({
    ...state,
    register: {
        ...state.register,
        email: {
            isValid: false,
            error: { isError: true, mes: error.message }
        }
    }
});

// @ validate password

export const validateUserPasswordFulfilled = (state, { payload }) => ({
    ...state,
    register: {
        ...state.register,
        password: {
            isValid: true,
            error: { isError: false, mes: '' }
        }
    }
});

export const validateUserPasswordRejected = (state, { error }) => ({
    ...state,
    register: {
        ...state.register,
        password: {
            isValid: false,
            error: { isError: true, mes: error.message }
        }
    }
});