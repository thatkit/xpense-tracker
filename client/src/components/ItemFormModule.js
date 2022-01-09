import { useDispatch, useSelector } from 'react-redux';
import { sendItem, updateItem, setActionName } from '../redux/slices/currentListSlice';
import { toggleNewItemFormModule } from '../redux/slices/uiSlice';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Badge
} from 'reactstrap';
import { ItemForm } from './ItemForm';

export const ItemFormModule = (props) => {
    const dispatch = useDispatch();

    // Toggle behaviour
    const isOpen = useSelector(state => state.ui.newItemFormModuleIsOpen);
    const toggler = (e, actionName = '') => {
        dispatch(setActionName(actionName));
        dispatch(toggleNewItemFormModule());
    }

    // Send (add) a new item
    const currentItemId = useSelector(({ ui }) => ui.currentItem._id);
    const addOrEditItem = () => {
        console.log(props)
        // // if ADD
        // props.actionName === 'add' && dispatch(sendItem({
        //     listId: props.listId,
        //     name: itemNameInput,
        //     desc: itemDescInput,
        //     sum: itemSumInput
        // }));
        // // if EDIT
        // props.actionName === 'edit' && console.log(currentItemId)
        // // props.actionName === 'edit' && dispatch(updateItem({
        // //     itemId: props.listId,
        // //     name: itemNameInput,
        // //     desc: itemDescInput,
        // //     sum: itemSumInput
        // // }));
        // toggler();
        // // removing values from inputs 
        // setItemNameInput('');
        // setItemDescInput('');
        // setItemSumInput(0);
    }

    return (
        <>
            {/* if ADD */}
            {props.actionName === 'add' && (
                <Button
                    color="success"
                    onClick={(e) => toggler(e, 'add')}
                >Add new item</Button>
            )}

            {/* if EDIT */}
            {props.actionName === 'edit' && (
                <Badge
                    color="warning"
                    onClick={(e) => toggler(e, 'edit')}
                >Edit</Badge>
            )}

            {/* Modal itself */}
            <Modal
                centered
                isOpen={isOpen}
                toggle={toggler}
            >
                <ModalHeader>{props.actionName}</ModalHeader>
                <ModalBody><ItemForm /></ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        onClick={addOrEditItem}
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