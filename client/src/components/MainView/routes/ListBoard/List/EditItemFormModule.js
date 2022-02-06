import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateItem } from '../../../../../redux/actions/api/items';
import { unselectItem } from '../../../../../redux/slices/apiSlice';
import { validateItemName, validateItemSum } from '../../../../../redux/actions/validation/item';
import { toggleEditItemFormModule } from '../../../../../redux/slices/uiSlice';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Badge
} from 'reactstrap';
import { ItemForm } from '../../../../utility/ItemForm';

export const EditItemFormModule = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(validateItemName());
        dispatch(validateItemSum());
    }, [dispatch]);

    // selectors-validation
    const { name, desc, sum } = useSelector(({ validation }) => validation.item);
    // selectors for current item data
    const {
        itemId,
        name: newName,
        desc: newDesc,
        sum: newSum
    } = useSelector(({ api }) => api.items.data);
    // selectors for prev item data
    const {
        name: prevName,
        desc: prevDesc,
        sum: prevSum
    } = useSelector(({ api }) => api.lists.currentList.items)
        .find(({ _id }) => _id === itemId);

    // Toggle behaviour
    const isOpen = useSelector(({ ui }) => ui.toggleStates.editItemFormModuleIsOpen);
    const toggler = () => {
        dispatch(toggleEditItemFormModule());
    }
    
    const editItem = () => {
        // if changes, proceed with validation
        if (prevName !== newName || prevDesc !== newDesc || prevSum !== newSum) {           
            // if validation is ok, update
            if ([ name, desc, sum ].every(({ isValid }) => isValid === true)) {
                dispatch(updateItem());
            }
        }
        dispatch(unselectItem());
        dispatch(toggleEditItemFormModule());
    }

    return (
        <>
            <Badge
                color="warning"
                onClick={toggler}
            >Edit</Badge>

            <Modal
                centered
                isOpen={isOpen}
                toggle={toggler}
            >
                <ModalHeader>Edit item</ModalHeader>
                <ModalBody><ItemForm name={name} sum={sum} /></ModalBody>
                <ModalFooter>
                    <Button
                        color="warning"
                        onClick={editItem}
                    >Edit</Button>
                    {' '}
                    <Button onClick={toggler}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}