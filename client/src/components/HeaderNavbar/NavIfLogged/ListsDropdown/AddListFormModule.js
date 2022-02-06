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
    FormFeedback,
    Input,
    Label
} from 'reactstrap';
import { validateListName, validateListTotalBudget } from '../../../../redux/actions/validation/list';

export const AddListFormModule = () => {
    // selectors-validation
    const { name, totalBudget } = useSelector(({ validation }) => validation.list);
    
    // Sending inputs to the Redux store
    const dispatch = useDispatch();
    const handleOnChange = ({ target }, key) => {
        // for number type
        if (key === 'totalBudget') {
            dispatch(typeList({ [key]: Number(target.value) }));
            dispatch(validateListTotalBudget());
            return null;
        }

        // for anything else
        dispatch(typeList({ [key]: target.value }));
        key === 'name' && dispatch(validateListName());
    }

    // Toggle behaviour
    const isOpen = useSelector(({ ui }) => ui.toggleStates.addListFormModuleIsOpen);
    const toggler = () => {
        dispatch(toggleListsDropdown());
        dispatch(toggleAddListFormModule());
    }

    // Send (add) a new list
    const addNewList = () => {

        // if ([ name, totalBudget ].every(({ isValid }) => isValid === true)) {
        //     dispatch(addItem());
        //     dispatch(unselectItem());
        //     dispatch(toggleAddItemFormModule());
        //     return null;
        // }
        
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
                                invalid={name.error.isError}                                
                            />
                            <Label for="listName">List name</Label>
                            <FormFeedback tooltip>{name.error.mes}</FormFeedback>
                        </FormGroup>
                        <FormGroup floating>
                            <Input 
                                id='budget'
                                name='budget'
                                placeholder='List budget'
                                required
                                onChange={({ target }, key) => handleOnChange({ target }, 'totalBudget')}
                                invalid={totalBudget.error.isError}                                
                                type="number"                             
                            />
                            <Label for="budget">List budget</Label>
                            <FormFeedback tooltip>{totalBudget.error.mes}</FormFeedback>
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