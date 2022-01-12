import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCookies } from '../../helpers/cookies';

// ACTIONS for users

// @ action     loginUser
// @ desc       Login user to receive JWT
// @ POST       api/users/login
export const loginUser = createAsyncThunk(
    'api/users/loginUser',
    async ({ email, password }, thunkAPI) => {
        let response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.status !== 200) {
            response = await response.json(); 
            throw new Error(response.message)
        }
        
        response = await response.json();   
        return response;      
    }
);

// @ action     fetchUser
// @ desc       Fetch user with JWT
// @ GET        api/users/login
export const fetchUser = createAsyncThunk(
    'api/users/fetchUser',
    async (arg, thunkAPI) => {
        let response = await fetch('/api/users/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': getCookies('jwt_token')
            }
        });

        if (response.status !== 200) {
            response = await response.json(); 
            throw new Error(response.message)
        }
        
        response = await response.json();
        return response;      
    }
);

// ACTIONS for lists

// @ action     fetchAllLists
// @ desc       Fetch user's lists with JWT
// @ GET        api/lists
export const fetchAllLists = createAsyncThunk(
    'api/lists/fetchAllLists',
    async ( arg, thunkAPI) => {
        let response = await fetch('/api/lists', {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': getCookies('jwt_token')
            }
        });

        if (response.status !== 200) {
            response = await response.json(); 
            throw new Error(response.message)
        }
        
        response = await response.json();
        return response;      
    }
);

// @ action     fetchCurrentList
// @ desc       Fetch user's list with JWT
// @ GET        api/lists
export const fetchCurrentList = createAsyncThunk(
    'api/lists/fetchCurrentList',
    async ({ listId }, thunkAPI) => {
        let response = await fetch(`/api/lists/${listId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': getCookies('jwt_token')
            }
        });

        if (response.status !== 200) {
            response = await response.json(); 
            throw new Error(response.message)
        }
        
        response = await response.json();
        return response;      
    }
);

// ACTIONS for items

// @ action     addItem
// @ desc       Add new item to user's current list with JWT
// @ POST       api/items
export const addItem = createAsyncThunk(
    'api/items/addItem',
    async (arg, { getState }) => {
        // retrieving state
        const itemInputs = getState().api.items.data;
        const listId = getState().api.lists.currentList.id;

        let response = await fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': getCookies('jwt_token')
            },
            body: JSON.stringify({
                listId: listId,
                name: itemInputs.name,
                desc: itemInputs.desc,
                sum: itemInputs.sum
            })
        });

        if (response.status !== 200) {
            response = await response.json(); 
            throw new Error(response.message)
        }
        
        response = await response.json();
        return response;      
    }
);

// @ action     removeItem
// @ desc       Remove an item from user's current list with JWT
// @ DELETE     api/items/:itemId
export const removeItem = createAsyncThunk(
    'api/lists/removeItem',
    async (arg, { getState }) => {
        // retrieving states
        const listId = getState().lists.currentList.id;
        const itemId = getState().items.data.itemId;

        let response = await fetch(`/api/items/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': getCookies('jwt_token')
            },
            body: JSON.stringify({ listId })
        });

        if (response.status !== 200) {
            response = await response.json(); 
            throw new Error(response.message)
        }
        
        response = await response.json();
        return response;      
    }
);

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
        // @       /api/items/typeItem
        typeItem(state, { payload }) {
            return {
                ...state,
                items: {
                    ...state.items,
                    data: {
                        listId: '',
                        itemId: '',
                        name: payload.name,
                        desc: payload.desc,
                        sum: payload.sum
                    }
                }
            }
        }
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
                },
                // currentList: { id: '', name: '', totalBudget: 0, items: []} 
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
                },
                // currentList: { id: '', name: '', totalBudget: 0, items: []} 
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
                },
                data: { listId: '', itemId: '', name: '', desc: '', sum: 0 }
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
                },
                data: { listId: '', itemId: '', name: '', desc: '', sum: 0 }
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
                },
                data: { listId: '', itemId: '', name: '', desc: '', sum: 0 }
            }
        }));
    }
});

export const { typeItem } = apiSlice.actions;
export default apiSlice.reducer;