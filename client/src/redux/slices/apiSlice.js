import { createSlice } from "@reduxjs/toolkit";
// INITIAL STATE
import { initialState } from '../initialStates/api';
// ACTIONS
import { loginUser, registerUser, fetchUser } from "../actions/api/users"; // for users
import { fetchAllLists, fetchCurrentList, addList } from "../actions/api/lists"; // for lists
import { addItem, removeItem, updateItem } from "../actions/api/items"; // for items
// EXTRA REDUCERS
import {
    loginUserFulfilled, loginUserPending, loginUserRejected,
    registerUserFulfilled, registerUserPending, registerUserRejected,
    fetchUserFulfilled, fetchUserPending, fetchUserRejected
} from "../extraReducers/api/users"; // for users
import {
    fetchAllListsFulfilled, fetchAllListsPending, fetchAllListsRejected,
    fetchCurrentListFulfilled, fetchCurrentListPending, fetchCurrentListRejected,
    addListFulfilled, addListPending, addListRejected,
} from "../extraReducers/api/lists"; // for lists
import {
    addItemFulfilled, addItemPending, addItemRejected,
    removeItemFulfilled, removeItemPending, removeItemRejected,
    updateItemFulfilled, updateItemPending, updateItemRejected
} from "../extraReducers/api/items"; // for items

// SLICE
export const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        // for storing new user data
        typeUser(state, { payload }) {
            return {
                ...state,
                users: {
                    ...state.users,
                    newUser: {
                        ...state.users.newUser,
                        [Object.keys(payload)[0]]: Object.values(payload)[0]
                    }
                }
            }
        },
        // for resetting (logging out) initialState
        logout() {
            return initialState;
        },
        // for typing new list
        typeList(state, { payload }) {
            return {
                ...state,
                lists: {
                    ...state.lists,
                    newList: {
                        ...state.lists.newList,
                        [Object.keys(payload)[0]]: Object.values(payload)[0]
                    }
                }
            }
        },
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
        unselectItem(state) {
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
        builder.addCase(registerUser.fulfilled, registerUserFulfilled);
        builder.addCase(registerUser.pending, registerUserPending);
        builder.addCase(registerUser.rejected, registerUserRejected);
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
        //      /addList
        builder.addCase(addList.fulfilled, addListFulfilled);
        builder.addCase(addList.pending, addListPending);
        builder.addCase(addList.rejected, addListRejected);

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
    typeUser,
    typeList,
    typeItem,
    selectItem,
    unselectItem,
    logout
} = apiSlice.actions;
export default apiSlice.reducer;