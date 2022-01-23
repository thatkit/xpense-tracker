export const initialState = {
    // @    to /api/users
    users: {
        // POST
        login: {
            isLoggedIn: false,
            loggingIn: false,
            error: { isError: false, mes: '' }
        },
        // POST
        register: {
            isRegistered: false,
            registering: false,
            error: { isError: false, mes: '' }
        },
        // GET
        fetchUser: {
            isFetched: false,
            fetching: false,
            error: { isError: false, mes: '' }
        },
        // Current user data container
        currentUser: { id: '', name: '', email: '', lists: [] },
        // New user data container
        newUser: { name: '', email: '', password: '', repPassword: '' }
    },
    // @    to /api/lists
    lists: {
        // GET all
        fetchAllLists: {
            isFetched: false,
            fetching: false,
            error: { isError: false, mes: '' }
        },
        // GET by id
        fetchCurrentList: {
            isFetched: false,
            fetching: false,
            error: { isError: false, mes: '' }
        },
        // POST
        addList: {
            isAdded: false,
            adding: false,
            error: { isError: false, mes: '' }
        },
        // DELETE
        deleteList: {
            isDeleted: false,
            deleting: false,
            error: { isError: false, mes: '' },
        },
        // All lists data container
        allLists: [],
        // Current list data container
        currentList: { id: '', name: '', totalBudget: 0, totalCosts: 0, remainder: 0, items: [] },
        // New list data container
        newList: { name: '', totalBudget: 0 }
    },
    // @    to /api/items
    items: {
        // POST
        addItem: {
            isAdded: false,
            adding: false,
            error: { isError: false, mes: '' }
        },
        // PUT
        updateItem: {
            isUpdated: false,
            updating: false,
            error: { isError: false, mes: '' }
        },
        // DELETE
        removeItem: {
            isRemoved: false,
            removing: false,
            error: { isError: false, mes: '' },
        },
        // Item data container
        data: { itemId: '', name: '', desc: '', sum: 0 }
    }
}