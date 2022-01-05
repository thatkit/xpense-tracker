import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleNewListFormModule } from '../redux/slices/uiSlice';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';

export const NewListFormModule = (props) => {
    const dispatch = useDispatch();

    // Toggle behaviour
    const isOpen = useSelector(state => state.ui.newListFormModuleIsOpen);
    const toggler = () => dispatch(toggleNewListFormModule());

    // Inner state for inputs
    const [listNameInput, setListNameInput] = useState('');
    const [listBudgetInput, setListBudgetInput] = useState(0);

    // Mimic send POST request
    const post = () => {
        console.log(listNameInput, listBudgetInput);
    }

    return (
        <div>
            <Button
                color="success"
                onClick={toggler}
            >{props.header}</Button>

            <Modal
                backdrop="static"
                centered
                isOpen={isOpen}
                toggle={toggler}
            >
                <ModalHeader>{props.header}</ModalHeader>
                <ModalBody>
                    <Form inline>
                    <FormGroup floating>
                            <Input 
                                id='listName'
                                name='listName'
                                placeholder='List name'
                                required
                                onChange={({ target }) => setListNameInput(target.value)}
                            />
                            <Label for="listName">List name</Label>
                        </FormGroup>
                        <FormGroup floating>
                            <Input 
                                id='budget'
                                name='budget'
                                placeholder='List budget'
                                required
                                onChange={({ target }) => setListBudgetInput(target.value)}
                            />
                            <Label for="budget">List budget</Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        onClick={post}
                    >Add</Button>
                    {' '}
                    <Button onClick={toggler}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}