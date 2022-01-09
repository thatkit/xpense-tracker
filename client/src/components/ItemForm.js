import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { typeItem } from '../redux/slices/currentItemSlice';
import {
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';

export const ItemForm = (props) => {
    // Inner state for inputs
    const [itemInput, setItemInput] = useState({
        name: '',
        desc: '',
        sum: 0
    });
    
    // onChange event handlers
    const setName = ({ target }) => setItemInput({
        ...itemInput,
        name: target.value
    });
    const setDesc = ({ target }) => setItemInput({
        ...itemInput,
        desc: target.value
    });
    const setSum = ({ target }) => setItemInput({
        ...itemInput,
        sum: target.value
    })

    // Sending inner state to the Redux store
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(typeItem(itemInput));
    }, [dispatch, itemInput]);

    return (
        <Form inline>
            <FormGroup floating>
                <Input 
                    id='name'
                    name='name'
                    placeholder='Name'
                    required
                    onChange={setName}
                />
                <Label for="name">Name</Label>
            </FormGroup>
            <FormGroup floating>
                <Input 
                    id='desc'
                    name='desc'
                    placeholder='Description'
                    onChange={setDesc}
                />
                <Label for="desc">Description</Label>
            </FormGroup>
            <FormGroup floating>
                <Input 
                    id='sum'
                    name='sum'
                    placeholder='Sum'
                    required
                    onChange={setSum}
                />
                <Label for="sum">Sum</Label>
            </FormGroup>
        </Form>
    );
}