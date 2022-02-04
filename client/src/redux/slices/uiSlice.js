import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        toggleStates: {
            listsDropdownIsOpen: false,
            addListFormModuleIsOpen: false,
            addItemFormModuleIsOpen: false,
            editItemFormModuleIsOpen: false,
            errorModuleIsOpen: false
        }
    },
    reducers: {
        // @        reducers for isOpen reactstrap props
        toggleListsDropdown(state) {
            return {
                ...state,
                toggleStates: {
                    ...state.toggleStates,
                    listsDropdownIsOpen: !state.toggleStates.listsDropdownIsOpen
                }
            }
        },
        toggleAddListFormModule(state) {
            return {
                ...state,
                toggleStates: {
                    ...state.toggleStates,
                    addListFormModuleIsOpen: !state.toggleStates.addListFormModuleIsOpen
                }
            }
        },
        toggleAddItemFormModule(state) {
            return {
                ...state,
                toggleStates: {
                    ...state.toggleStates,
                    addItemFormModuleIsOpen: !state.toggleStates.addItemFormModuleIsOpen
                }
            }
        },
        toggleEditItemFormModule(state) {
            return {
                ...state,
                toggleStates: {
                    ...state.toggleStates,
                    editItemFormModuleIsOpen: !state.toggleStates.editItemFormModuleIsOpen
                }
            }
        },
        toggleErrorModuleIsOpen(state) {
            return {
                ...state,
                toggleStates: {
                    ...state.toggleStates,
                    errorModuleIsOpen: !state.toggleStates.errorModuleIsOpen
                }
            }
        }
    }
});

export const {
    toggleListsDropdown,
    toggleAddListFormModule,
    toggleAddItemFormModule,
    toggleEditItemFormModule,
    toggleErrorModuleIsOpen
} = uiSlice.actions;
export default uiSlice.reducer;