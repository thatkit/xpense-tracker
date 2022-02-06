import { useDispatch, useSelector } from 'react-redux';
import { typeList } from '../../../../redux/slices/apiSlice';
import { addList } from '../../../../redux/actions/api/lists';
import { toggleListsDropdown, toggleAddListFormModule } from '../../../../redux/slices/uiSlice';
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

export const AddListFormModule = () => {

    
    // Sending inputs to the Redux store
    const dispatch = useDispatch();
    const handleOnChange = ({ target }, key) => {
        dispatch(typeList({ [key]: target.value }));
    }

    // Toggle behaviour
    const isOpen = useSelector(({ ui }) => ui.toggleStates.addListFormModuleIsOpen);
    const toggler = () => {
        dispatch(toggleListsDropdown());
        dispatch(toggleAddListFormModule());
    }

    // Send (add) a new list
    const addNewList = () => {
        dispatch(addList());
        toggler();
    }

    return (
        <div>
            <Button
                color="success"
                onClick={toggler}
            >Add new list</Button>

            <Modal
                centered
                isOpen={isOpen}
                toggle={toggler}
            >
                <ModalHeader toggle={toggler}>Add new list</ModalHeader>
                <ModalBody>
                    <Form inline>
                    <FormGroup floating>
                            <Input 
                                id='listName'
                                name='listName'
                                placeholder='List name'
                                required
                                onChange={({ target }, key) => handleOnChange({ target }, 'name')}
                            />
                            <Label for="listName">List name</Label>
                        </FormGroup>
                        <FormGroup floating>
                            <Input 
                                id='budget'
                                name='budget'
                                placeholder='List budget'
                                required
                                onChange={({ target }, key) => handleOnChange({ target }, 'totalBudget')}
                            />
                            <Label for="budget">List budget</Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        onClick={addNewList}
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