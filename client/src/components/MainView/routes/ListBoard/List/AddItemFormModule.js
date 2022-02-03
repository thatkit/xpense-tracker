import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../../../../redux/actions/api/items';
import { unselectItem } from '../../../../../redux/slices/apiSlice';
import { toggleNewItemFormModule } from '../../../../../redux/slices/uiSlice';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap';
import { ItemForm } from '../../../../utility/ItemForm';
import { ErrorModule } from '../../../../utility/ErrorModule';
import { useState } from 'react';  // # test area

export const AddItemFormModule = (props) => {
    const dispatch = useDispatch();

    // Toggle behaviour
    const isOpen = useSelector(state => state.ui.newItemFormModuleIsOpen);
    const toggler = () => {
        dispatch(unselectItem());
        dispatch(toggleNewItemFormModule());
    }

    // Send (add) a new item
    const addNewItem = () => {
        dispatch(addItem());
        dispatch(unselectItem());
        toggler();
    }

    // # test area
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    // # test area

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

                    <Button onClick={() => setIsErrorOpen(!isErrorOpen)}>Error module</Button>
                </ModalFooter>

                <ErrorModule isOpen={isErrorOpen} errorMes='ERORRRR!!!!' />
            </Modal>
        </>
    )
}