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