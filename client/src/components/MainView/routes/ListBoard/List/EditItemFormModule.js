import { useDispatch, useSelector } from 'react-redux';
import { updateItem } from '../../../../../redux/actions/api/items';
import { unselectItem } from '../../../../../redux/slices/apiSlice';
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

    // selectors-validation
    const { itemId, name, sum } = useSelector(({ validation }) => validation.item);
    // selectors for prev item data
    const { name as , sum } = useSelector(({ api }) => api.lists.currentList.items)
        .find(({ _id }) => _id === itemId);

    // Toggle behaviour
    const isOpen = useSelector(({ ui }) => ui.toggleStates.editItemFormModuleIsOpen);
    const toggler = () => {
        dispatch(toggleEditItemFormModule());
    }
    
    // Edit (update) an item
    const editItem = () => {
        // if no change
        if ([ name, sum ].every(({ isValid }) => isValid === true)) {
            console.log('1')
            dispatch(updateItem());
            dispatch(unselectItem());
            dispatch(toggleEditItemFormModule());
            return null;
        }
        console.log('2')
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