// EXTRA REDUCERS for users

// @ login

export const loginUserFulfilled = (state, { payload }) => {
    document.cookie = `jwt_token=${payload.token}`;
    return {
        ...state,
        users: {
            ...state.users,
            login: {
                isLoggedIn: true,
                loggingIn: false,
                error: { isError: false, mes: '' }
            },
            data: {
                id: payload.user._id,
                name: payload.user.name,
                email: payload.user.email,
                lists: payload.user.lists
            }
        }
    }
}

export const loginUserPending = (state) => ({
    ...state,
    users: {
        ...state.users,
        login: {
            isLoggedIn: false,
            loggingIn: true,
            error: { isError: false, mes: '' }
        },
        data: { id: '', name: '', email: '', lists: [] }
    }
})

export const loginUserRejected = (state, { error }) => ({
    ...state,
    users: {
        ...state.users,
        login: {
            isLoggedIn: false,
            loggingIn: false,
            error: { isError: true, mes: error.message }
        },
        data: { id: '', name: '', email: '', lists: [] }
    }
})

// @ register

// @ fetchUser

export const fetchUserFulfilled = (state, { payload }) => ({
    ...state,
    users: {
        ...state.users,
        login: {
            isLoggedIn: true,
            loggingIn: false,
            error: { isError: false, mes: '' }
        },
        fetchUser: {
            isFetched: true,
            fetching: false,
            error: { isError: false, mes: '' }
        },
        data: {
            id: payload._id,
            name: payload.name,
            email: payload.email,
            lists: payload.lists
        }
    }
})

export const fetchUserPending = (state) => ({
    ...state,
    users: {
        ...state.users,
        fetchUser: {
            isFetched: false,
            fetching: true,
            error: { isError: false, mes: '' }
        },
        data: { id: '', name: '', email: '', lists: [] }
    }
})

export const fetchUserRejected = (state, { error }) => ({
    ...state,
    users: {
        ...state.users,
        fetchUser: {
            isFetched: false,
            fetching: false,
            error: { isError: true, mes: error.message }
        },
        data: { id: '', name: '', email: '', lists: [] }
    }
})