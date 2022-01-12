import { useDispatch, useSelector } from 'react-redux';
import { updateItem } from '../redux/slices/currentListSlice';
import { toggleEditItemFormModule } from '../redux/slices/uiSlice';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Badge
} from 'reactstrap';
import { ItemForm } from './ItemForm';

export const EditItemFormModule = (props) => {
    const dispatch = useDispatch();

    // Toggle behaviour
    const isOpen = useSelector(state => state.ui.editItemFormModuleIsOpen);
    const toggler = () => {
        dispatch(toggleEditItemFormModule());
    }
    
    // Edit (update) an item
    const editItem = () => {
        dispatch(updateItem());
        toggler();
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
                <ModalBody><ItemForm /></ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
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