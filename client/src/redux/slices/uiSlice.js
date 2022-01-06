import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        listsDropdownIsOpen: false,
        newListFormModuleIsOpen: false,
        newItemFormModuleIsOpen: false,
        currentItem: { _id: '' }
    },
    reducers: {
        // reducers for isOpen reactstrap props
        toggleListsDropdown(state) { state.listsDropdownIsOpen = !state.listsDropdownIsOpen },
        toggleNewListFormModule(state) { state.newListFormModuleIsOpen = !state.newListFormModuleIsOpen },
        toggleNewItemFormModule(state) { state.newItemFormModuleIsOpen = !state.newItemFormModuleIsOpen },
        // reducers for toggling an item's 'edit' and 'remove' menu
        setCurrentItem(state, { payload }) { state.currentItem._id = payload },
        removeCurrentItem(state) { state.currentItem._id = '' }
    }
});

export const {
    toggleListsDropdown,
    toggleNewListFormModule,
    toggleNewItemFormModule,
    setCurrentItem,
    removeCurrentItem
} = uiSlice.actions;
export default uiSlice.reducer;