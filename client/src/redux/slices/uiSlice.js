import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        listsDropdownIsOpen: false,
        newListFormModuleIsOpen: false,
        newItemFormModuleIsOpen: false,
        editItemFormModuleIsOpen: false,
        items: { prevItemId: '' }
    },
    reducers: {
        // @        reducers for isOpen reactstrap props
        toggleListsDropdown(state) { state.listsDropdownIsOpen = !state.listsDropdownIsOpen },
        toggleNewListFormModule(state) { state.newListFormModuleIsOpen = !state.newListFormModuleIsOpen },
        toggleNewItemFormModule(state) { state.newItemFormModuleIsOpen = !state.newItemFormModuleIsOpen },
        toggleEditItemFormModule(state) { state.editItemFormModuleIsOpen = !state.editItemFormModuleIsOpen },
    }
});

export const {
    toggleListsDropdown,
    toggleNewListFormModule,
    toggleNewItemFormModule,
    toggleEditItemFormModule
} = uiSlice.actions;
export default uiSlice.reducer;