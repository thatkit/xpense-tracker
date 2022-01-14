import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/actions/api/items';
import { toggleNewItemFormModule } from '../redux/slices/uiSlice';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap';
import { ItemForm } from './ItemForm';

export const AddItemFormModule = (props) => {
    const dispatch = useDispatch();

    // Toggle behaviour
    const isOpen = useSelector(state => state.ui.newItemFormModuleIsOpen);
    const toggler = () => {
        dispatch(toggleNewItemFormModule());
    }

    // Send (add) a new item
    const addNewItem = () => {
        dispatch(addItem());
        toggler();
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
            </Modal>
        </>
    )
}