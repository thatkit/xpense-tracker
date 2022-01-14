import { createSlice } from "@reduxjs/toolkit";
import { loginUser, fetchUser } from "../actions/api/users"; // ACTIONS for users
import { fetchAllLists, fetchCurrentList } from "../actions/api/lists"; // ACTIONS for lists
import { addItem, removeItem, updateItem } from "../actions/api/items"; // ACTIONS for items

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
        // NEED TO ADD subscribe(listener) to store
    },
    extraReducers: (builder) => {
        // @    /api/users reducers
        //      /login
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
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
        });
        builder.addCase(loginUser.pending, (state) => ({
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
        }));
        builder.addCase(loginUser.rejected, (state, { error }) => ({
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
        }));
        //      /register

        //      /fetchUser
        builder.addCase(fetchUser.fulfilled, (state, { payload }) => ({
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
        }));
        builder.addCase(fetchUser.pending, (state) => ({
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
        }));
        builder.addCase(fetchUser.rejected, (state, { error }) => ({
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
        }));

        // @    /api/lists reducers
        //      /fetchAllLists
        builder.addCase(fetchAllLists.fulfilled, (state, { payload }) => ({
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
        }));
        builder.addCase(fetchAllLists.pending, (state) => ({
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
        }));
        builder.addCase(fetchAllLists.rejected, (state, { error }) => ({
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
        }));
        //      /fetchCurrentList
        builder.addCase(fetchCurrentList.fulfilled, (state, { payload }) => ({
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
        }));
        builder.addCase(fetchCurrentList.pending, (state) => ({
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
        }));
        builder.addCase(fetchCurrentList.rejected, (state, { error }) => ({
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
        }));

        // @    /api/items reducers
        //      /addItem
        builder.addCase(addItem.fulfilled, (state, { payload }) => ({
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
        }));
        builder.addCase(addItem.pending, (state) => ({
            ...state,
            items: {
                ...state.items,
                addItem: {
                    isAdded: false,
                    adding: true,
                    error: { isError: false, mes: '' }
                }
            }
        }));
        builder.addCase(addItem.rejected, (state, { error }) => ({
            ...state,
            items: {
                ...state.items,
                addItem: {
                    isAdded: false,
                    adding: false,
                    error: { isError: true, mes: error.message }
                }
            }
        }));

        //      /removeItem
        builder.addCase(removeItem.fulfilled, (state) => ({
            ...state,
            items: {
                ...state.items,
                removeItem: {
                    isRemoved: true,
                    removing: false,
                    error: { isError: false, mes: '' }
                }
            }
        }));
        builder.addCase(removeItem.pending, (state) => ({
            ...state,
            items: {
                ...state.items,
                removeItem: {
                    isRemoved: false,
                    removing: true,
                    error: { isError: false, mes: '' }
                }
            } 
        }));
        builder.addCase(removeItem.rejected, (state, { error }) => ({
            ...state,
            items: {
                ...state.items,
                removeItem: {
                    isRemoved: false,
                    removing: false,
                    error: { isError: true, mes: error.message }
                }
            }
        }));

        //      /addItem
        builder.addCase(updateItem.fulfilled, (state, { payload }) => ({
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
        }));
        builder.addCase(updateItem.pending, (state) => ({
            ...state,
            items: {
                ...state.items,
                addItem: {
                    isUpdated: false,
                    updating: true,
                    error: { isError: false, mes: '' }
                },
            }
        }));
        builder.addCase(updateItem.rejected, (state, { error }) => ({
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
        }));
    }
});

export const {
    typeItem,
    selectItem,
    unselectItem
} = apiSlice.actions;
export default apiSlice.reducer;