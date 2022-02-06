// EXTRA REDUCERS for list (add)

// @ validate name

export const validateListNameFulfilled = (state) => ({
    ...state,
    list: {
        ...state.list,
        name: {
            isValid: true,
            error: { isError: false, mes: '' }
        }
    }
});

export const validateListNameRejected = (state, { error }) => ({
    ...state,
    list: {
        ...state.list,
        name: {
            isValid: false,
            error: { isError: true, mes: error.message }
        }
    }
});

// @ validate totalBudget

export const validateListTotalBudgetFulfilled = (state) => ({
    ...state,
    list: {
        ...state.list,
        totalBudget: {
            isValid: true,
            error: { isError: false, mes: '' }
        }
    }
});

export const validateListTotalBudgetRejected = (state, { error }) => ({
    ...state,
    list: {
        ...state.list,
        totalBudget: {
            isValid: false,
            error: { isError: true, mes: error.message }
        }
    }
});