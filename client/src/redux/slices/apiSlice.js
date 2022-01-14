import { createSlice } from "@reduxjs/toolkit";
// ACTIONS
import { loginUser, fetchUser } from "../actions/api/users"; // for users
import { fetchAllLists, fetchCurrentList } from "../actions/api/lists"; // for lists
import { addItem, removeItem, updateItem } from "../actions/api/items"; // for items
// EXTRA REDUCERS
import {
    loginUserFulfilled, loginUserPending, loginUserRejected,
    fetchUserFulfilled, fetchUserPending, fetchUserRejected
} from "../extraReducers/api/users"; // for users
import {
    fetchAllListsFulfilled, fetchAllListsPending, fetchAllListsRejected,
    fetchCurrentListFulfilled, fetchCurrentListPending, fetchCurrentListRejected
} from "../extraReducers/api/lists"; // for lists
import {
    addItemFulfilled, addItemPending, addItemRejected,
    removeItemFulfilled, removeItemPending, removeItemRejected,
    updateItemFulfilled, updateItemPending, updateItemRejected
} from "../extraReducers/api/items"; // for items

// SLICE
export const apiSlice = createSlice({
    name: 'api',
    initialState: {
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
            // User data container
            data: { id: '', name: '', email: '', lists: [] }
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
            currentList: { id: '', name: '', totalBudget: 0, items: []} 
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
            data: { listId: '', itemId: '', name: '', desc: '', sum: 0 }
        }
    },
    reducers: {
        // These 3 are sort of UI reducers but since they use item data I put them in state.api.items
        // @       /api/items/typeItem
        typeItem(state, { payload }) {
            return {
                ...state,
                items: {
                    ...state.items,
                    data: {
                        ...state.items.data,
                        [Object.keys(payload)[0]]: Object.values(payload)[0]
                    }
                }
            }
        },
        // @        /api/items/selectItem
        selectItem(state, { payload }) {
            return {
                ...state,
                items: {
                    ...state.items,
                    data: {
                        ...state.items.data,
                        itemId: payload
                    }
                }
            }
        },
        // @        /api/items/unselectItem
        unselectItem(state, { payload }) {
            return {
                ...state,
                items: {
                    ...state.items,
                    data: {
                        ...state.items.data,
                        itemId: ''
                    }
                }
            }
        },
    },
    extraReducers: (builder) => {
        // @    /api/users reducers
        //      /login
        builder.addCase(loginUser.fulfilled, loginUserFulfilled);
        builder.addCase(loginUser.pending, loginUserPending);
        builder.addCase(loginUser.rejected, loginUserRejected);
        //      /register

        //      /fetchUser
        builder.addCase(fetchUser.fulfilled, fetchUserFulfilled);
        builder.addCase(fetchUser.pending, fetchUserPending);
        builder.addCase(fetchUser.rejected, fetchUserRejected);

        // @    /api/lists reducers
        //      /fetchAllLists
        builder.addCase(fetchAllLists.fulfilled, fetchAllListsFulfilled);
        builder.addCase(fetchAllLists.pending, fetchAllListsPending);
        builder.addCase(fetchAllLists.rejected, fetchAllListsRejected);
        //      /fetchCurrentList
        builder.addCase(fetchCurrentList.fulfilled, fetchCurrentListFulfilled);
        builder.addCase(fetchCurrentList.pending, fetchCurrentListPending);
        builder.addCase(fetchCurrentList.rejected, fetchCurrentListRejected);

        // @    /api/items reducers
        //      /addItem
        builder.addCase(addItem.fulfilled, addItemFulfilled);
        builder.addCase(addItem.pending, addItemPending);
        builder.addCase(addItem.rejected, addItemRejected);

        //      /removeItem
        builder.addCase(removeItem.fulfilled, removeItemFulfilled);
        builder.addCase(removeItem.pending, removeItemPending);
        builder.addCase(removeItem.rejected, removeItemRejected);

        //      /updateItem
        builder.addCase(updateItem.fulfilled, updateItemFulfilled);
        builder.addCase(updateItem.pending, updateItemPending);
        builder.addCase(updateItem.rejected, updateItemRejected);
    }
});

export const {
    typeItem,
    selectItem,
    unselectItem
} = apiSlice.actions;
export default apiSlice.reducer;