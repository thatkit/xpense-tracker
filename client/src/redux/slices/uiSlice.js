import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        listsDropdownIsOpen: false,
        newListFormModuleIsOpen: false,
        newItemFormModuleIsOpen: false,
        items: { prevItemId: '' }
    },
    reducers: {
        // @        reducers for isOpen reactstrap props
        toggleListsDropdown(state) { state.listsDropdownIsOpen = !state.listsDropdownIsOpen },
        toggleNewListFormModule(state) { state.newListFormModuleIsOpen = !state.newListFormModuleIsOpen },
        toggleNewItemFormModule(state) { state.newItemFormModuleIsOpen = !state.newItemFormModuleIsOpen },
    }
});

export const {
    toggleListsDropdown,
    toggleNewListFormModule,
    toggleNewItemFormModule
} = uiSlice.actions;
export default uiSlice.reducer;