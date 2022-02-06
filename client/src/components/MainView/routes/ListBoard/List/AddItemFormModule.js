import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../../../../redux/actions/api/items';
import { unselectItem } from '../../../../../redux/slices/apiSlice';
import { toggleAddItemFormModule } from '../../../../../redux/slices/uiSlice';
import { validateItemName, validateItemSum } from '../../../../../redux/actions/validation/item';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap';
import { ItemForm } from '../../../../utility/ItemForm';
import { ErrorModule } from '../../../../utility/ErrorModule';

export const AddItemFormModule = () => {
    const dispatch = useDispatch();

    // selectors-validation
    const { name, desc, sum } = useSelector(({ validation }) => validation.item);
    
    // Toggle behaviour
    const isOpen = useSelector(({ ui }) => ui.toggleStates.addItemFormModuleIsOpen);
    const toggler = () => {
        dispatch(unselectItem());
        dispatch(toggleAddItemFormModule());
        // if a user clicks 'Add' without even touching input fields
        dispatch(validateItemName());
        dispatch(validateItemSum());
    }

    // Send (add) a new item
    const addNewItem = () => {
        if ([ name, desc, sum ].every(({ isValid }) => isValid === true)) {
            dispatch(addItem());
            dispatch(unselectItem());
            dispatch(toggleAddItemFormModule());
            return null;
        }
    }

    return (
        <>
            <Button
                color="success"
                onClick={toggler}
            >Add new item</Button>

            <Modal
                centered
                isOpen={isOpen}
                toggle={toggler}
            >
                <ModalHeader>Add new item</ModalHeader>
                <ModalBody>
                    <ItemForm name={name} sum={sum} />
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        onClick={addNewItem}
                    >Add</Button>
                    {' '}
                    <Button onClick={toggler}>
                        Cancel
                    </Button>
                </ModalFooter>

                <ErrorModule />
            </Modal>
        </>
    )
}