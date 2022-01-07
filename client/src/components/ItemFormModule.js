import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendItem, updateItem } from '../redux/slices/currentListSlice';
import { toggleNewItemFormModule } from '../redux/slices/uiSlice';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Badge
} from 'reactstrap';

export const ItemFormModule = (props) => {
    const dispatch = useDispatch();

    // Inner state for inputs
    const [itemNameInput, setItemNameInput] = useState('');
    const [itemDescInput, setItemDescInput] = useState('');
    const [itemSumInput, setItemSumInput] = useState(0);

    // Toggle behaviour
    const isOpen = useSelector(state => state.ui.newItemFormModuleIsOpen);
    const toggler = () => dispatch(toggleNewItemFormModule());

    // Send (add) a new item
    const currentItemId = useSelector(({ ui }) => ui.currentItem._id);
    const addOrEditItem = () => {
        console.log(props.actionName)
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
                    onClick={toggler}
                >Add new item</Button>
            )}

            {/* if EDIT */}
            {props.actionName === 'edit' && (
                <Badge
                    color="warning"
                    onClick={toggler}
                >Edit</Badge>
            )}

            {/* Modal itself */}
            <Modal
                centered
                isOpen={isOpen}
                toggle={toggler}
            >
                <ModalHeader>Add new item</ModalHeader>
                <ModalBody>
                    <Form inline>
                        <FormGroup floating>
                            <Input 
                                id='name'
                                name='name'
                                placeholder='Name'
                                required
                                onChange={({ target }) => setItemNameInput(target.value)}
                            />
                            <Label for="name">Name</Label>
                        </FormGroup>
                        <FormGroup floating>
                            <Input 
                                id='desc'
                                name='desc'
                                placeholder='Description'
                                onChange={({ target }) => setItemDescInput(target.value)}
                            />
                            <Label for="desc">Description</Label>
                        </FormGroup>
                        <FormGroup floating>
                            <Input 
                                id='sum'
                                name='sum'
                                placeholder='Sum'
                                required
                                onChange={({ target }) => setItemSumInput(target.value)}
                            />
                            <Label for="sum">Sum</Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
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