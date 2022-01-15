import { useDispatch } from 'react-redux';
import { typeItem } from '../../redux/slices/apiSlice';
import {
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';

export const ItemForm = (props) => {
    // Sending inputs to the Redux store
    const dispatch = useDispatch();
    const handleOnChange = ({ target }, key) => {
        dispatch(typeItem({ [key]: target.value }));
    }

    return (
        <Form inline>
            <FormGroup floating>
                <Input 
                    id='name'
                    name='name'
                    placeholder='Name'
                    required
                    onChange={({ target }, key) => handleOnChange({ target }, 'name')}
                />
                <Label for="name">Name</Label>
            </FormGroup>
            <FormGroup floating>
                <Input 
                    id='desc'
                    name='desc'
                    placeholder='Description'
                    onChange={({ target }, key) => handleOnChange({ target }, 'desc')}
                />
                <Label for="desc">Description</Label>
            </FormGroup>
            <FormGroup floating>
                <Input 
                    id='sum'
                    name='sum'
                    placeholder='Sum'
                    required
                    onChange={({ target }, key) => handleOnChange({ target }, 'sum')}
                />
                <Label for="sum">Sum</Label>
            </FormGroup>
        </Form>
    );
}