import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        listsDropdownIsOpen: false,
        newListFormModuleIsOpen: false,
        newItemFormModuleIsOpen: false,
        currentItem: { _id: '', prevId: '', action: '' }
    },
    reducers: {
        // reducers for isOpen reactstrap props
        toggleListsDropdown(state) { state.listsDropdownIsOpen = !state.listsDropdownIsOpen },
        toggleNewListFormModule(state) { state.newListFormModuleIsOpen = !state.newListFormModuleIsOpen },
        toggleNewItemFormModule(state) { state.newItemFormModuleIsOpen = !state.newItemFormModuleIsOpen },
        // reducers for toggling an item's 'edit' and 'remove' menu
        setCurrentItem({ currentItem }, { payload }) { currentItem._id = payload },
        removeCurrentItem({ currentItem }) {
            currentItem.prevId = currentItem._id;
            currentItem._id = ''
        },
        // reducer for ItemFormModule properties
        setItemAction({ currentItem }, { payload }) {
            currentItem.action = 'payload';
        }
    }
});

export const {
    toggleListsDropdown,
    toggleNewListFormModule,
    toggleNewItemFormModule,
    setCurrentItem,
    removeCurrentItem,
    setItemAction
} = uiSlice.actions;
export default uiSlice.reducer;