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
        // @        /api/items/selectItem
        // !!! in order to actually use EDIT menu
        // we need to store prev item id
        // for further reference
        // pseudocode:
        // when (hover) selectItem(curId)
        // when (mouseLeave) setPrevId(curId becomes prevId)
        // prevId is referenced when edit
    }
});

export const {
    toggleListsDropdown,
    toggleNewListFormModule,
    toggleNewItemFormModule
} = uiSlice.actions;
export default uiSlice.reducer;