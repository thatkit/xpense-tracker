// EXTRA REDUCERS for items

// @ addItem

export const addItemFulfilled = (state, { payload }) => ({
    ...state,
    items: {
        ...state.items,
        addItem: {
            isAdded: true,
            adding: false,
            error: { isError: false, mes: '' }
        },
        data: { listId: '', itemId: '', name: '', desc: '', sum: 0 }
    }
})

export const addItemPending = (state) => ({
    ...state,
    items: {
        ...state.items,
        addItem: {
            isAdded: false,
            adding: true,
            error: { isError: false, mes: '' }
        }
    }
})

export const addItemRejected = (state, { error }) => ({
    ...state,
    items: {
        ...state.items,
        addItem: {
            isAdded: false,
            adding: false,
            error: { isError: true, mes: error.message }
        }
    }
})

// @ removeItem

export const removeItemFulfilled = (state) => ({
    ...state,
    items: {
        ...state.items,
        removeItem: {
            isRemoved: true,
            removing: false,
            error: { isError: false, mes: '' }
        }
    }
})

export const removeItemPending = (state) => ({
    ...state,
    items: {
        ...state.items,
        removeItem: {
            isRemoved: false,
            removing: true,
            error: { isError: false, mes: '' }
        }
    } 
})

export const removeItemRejected = (state, { error }) => ({
    ...state,
    items: {
        ...state.items,
        removeItem: {
            isRemoved: false,
            removing: false,
            error: { isError: true, mes: error.message }
        }
    }
})

// @ updateItem

export const updateItemFulfilled = (state, { payload }) => ({
    ...state,
    items: {
        ...state.items,
        addItem: {
            isUpdated: true,
            updating: false,
            error: { isError: false, mes: '' }
        },
        data: { listId: '', itemId: '', name: '', desc: '', sum: 0 }
    }
})

export const updateItemPending = (state) => ({
    ...state,
    items: {
        ...state.items,
        addItem: {
            isUpdated: false,
            updating: true,
            error: { isError: false, mes: '' }
        },
    }
})

export const updateItemRejected = (state, { error }) => ({
    ...state,
    items: {
        ...state.items,
        addItem: {
            isUpdated: false,
            updating: false,
            error: { isError: true, mes: error.message }
        },
        data: { listId: '', itemId: '', name: '', desc: '', sum: 0 }
    }
})