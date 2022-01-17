// EXTRA REDUCERS for user (register)

// @ validate name

export const validateUserNameFulfilled = (state) => ({
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

export const validateUserEmailFulfilled = (state) => ({
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

export const validateUserPasswordFulfilled = (state) => ({
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

// @ validate repPassword

export const validateUserRepPasswordFulfilled = (state) => ({
    ...state,
    register: {
        ...state.register,
        repPassword: {
            isValid: true,
            error: { isError: false, mes: '' }
        }
    }
});

export const validateUserRepPasswordRejected = (state, { error }) => ({
    ...state,
    register: {
        ...state.register,
        repPassword: {
            isMatched: false,
            error: { isError: true, mes: error.message }
        }
    }
});