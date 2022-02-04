import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../../../../redux/actions/api/items';
import { unselectItem } from '../../../../../redux/slices/apiSlice';
import { toggleAddItemFormModule } from '../../../../../redux/slices/uiSlice';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap';
import { ItemForm } from '../../../../utility/ItemForm';
import { ErrorModule } from '../../../../utility/ErrorModule';

export const AddItemFormModule = (props) => {
    const dispatch = useDispatch();

    // Toggle behaviour
    const isOpen = useSelector(({ ui }) => ui.toggleStates.addItemFormModuleIsOpen);
    const toggler = () => {
        dispatch(unselectItem());
        dispatch(toggleAddItemFormModule());
    }

    // Send (add) a new item
    const addNewItem = () => {
        dispatch(addItem());
        dispatch(unselectItem());
        dispatch(toggleAddItemFormModule());
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
                <ModalBody><ItemForm /></ModalBody>
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