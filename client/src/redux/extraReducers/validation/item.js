// EXTRA REDUCERS for item (add and edit)

// @ validate name

export const validateItemNameFulfilled = (state) => ({
    ...state,
    item: {
        ...state.item,
        name: {
            isValid: true,
            error: { isError: false, mes: '' }
        }
    }
});

export const validateItemNameRejected = (state, { error }) => ({
    ...state,
    item: {
        ...state.item,
        name: {
            isValid: false,
            error: { isError: true, mes: error.message }
        }
    }
});

// @ validate sum

export const validateItemSumFulfilled = (state) => ({
    ...state,
    item: {
        ...state.item,
        sum: {
            isValid: true,
            error: { isError: false, mes: '' }
        }
    }
});

export const validateItemSumRejected = (state, { error }) => ({
    ...state,
    item: {
        ...state.item,
        sum: {
            isValid: false,
            error: { isError: true, mes: error.message }
        }
    }
});