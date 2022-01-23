// EXTRA REDUCERS for lists

// @ fetchAllLists

export const fetchAllListsFulfilled = (state, { payload }) => ({
    ...state,
    lists: {
        ...state.lists,
        fetchAllLists: {
            isFetched: true,
            fetching: false,
            error: { isError: false, mes: '' }
        },
        allLists: payload
    }
})

export const fetchAllListsPending = (state) => ({
    ...state,
    lists: {
        ...state.lists,
        fetchAllLists: {
            isFetched: false,
            fetching: true,
            error: { isError: false, mes: '' }
        },
        allLists: []
    }
})

export const fetchAllListsRejected = (state, { error }) => ({
    ...state,
    lists: {
        ...state.lists,
        fetchAllLists: {
            isFetched: false,
            fetching: false,
            error: { isError: true, mes: error.message }
        },
        allLists: []
    }
})

// @ fetchCurrentList

export const fetchCurrentListFulfilled = (state, { payload }) => ({
    ...state,
    lists: {
        ...state.lists,
        fetchCurrentList: {
            isFetched: true,
            fetching: false,
            error: { isError: false, mes: '' }
        },
        currentList: {
            id: payload._id,
            name: payload.name,
            totalBudget: payload.totalBudget,
            totalCosts: payload.totalCosts,
            remainder: payload.remainder,
            items: payload.items
        } 
    }
})

export const fetchCurrentListPending = (state) => ({
    ...state,
    lists: {
        ...state.lists,
        fetchCurrentList: {
            isFetched: false,
            fetching: true,
            error: { isError: false, mes: '' }
        },
        currentList: { id: '', name: '', totalBudget: 0, items: []} 
    }
})

export const fetchCurrentListRejected = (state, { error }) => ({
    ...state,
    lists: {
        ...state.lists,
        fetchCurrentList: {
            isFetched: false,
            fetching: false,
            error: { isError: true, mes: error.message }
        },
        currentList: { id: '', name: '', totalBudget: 0, items: []} 
    }
})

// @ addList

export const addListFulfilled = (state, { payload }) => ({
    ...state,
    lists: {
        ...state.lists,
        addList: {
            isAdded: true,
            adding: false,
            error: { isError: false, mes: '' }
        },
        newList: { name: '', totalBudget: 0 }
    }
})

export const addListPending = (state) => ({
    ...state,
    lists: {
        ...state.lists,
        addList: {
            isAdded: false,
            adding: true,
            error: { isError: false, mes: '' }
        }
    }
})

export const addListRejected = (state, { error }) => ({
    ...state,
    lists: {
        ...state.lists,
        addList: {
            isAdded: false,
            adding: false,
            error: { isError: true, mes: error.message }
        }
    }
})

// @ removeList

export const removeListFulfilled = (state) => ({
    ...state,
    lists: {
        ...state.lists,
        removeList: {
            isRemoved: true,
            removing: false,
            error: { isError: false, mes: '' }
        }
    }
})

export const removeListPending = (state) => ({
    ...state,
    lists: {
        ...state.lists,
        removeList: {
            isRemoved: false,
            removing: true,
            error: { isError: false, mes: '' }
        }
    } 
})

export const removeListRejected = (state, { error }) => ({
    ...state,
    lists: {
        ...state.lists,
        removeList: {
            isRemoved: false,
            removing: false,
            error: { isError: true, mes: error.message }
        }
    }
})