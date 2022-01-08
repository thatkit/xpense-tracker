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
    const [itemNameInput, setItemNameInput] = useState('');
    const [itemDescInput, setItemDescInput] = useState('');
    const [itemSumInput, setItemSumInput] = useState(0);

    const [itemInput, setItemInput] = useState({
        name: '',
        desc: '',
        sum: 0
    });
    
    // Sending inner state to the Redux store
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(typeItem({ inputType: 'name', inputValue: itemNameInput }));
    // }, [dispatch, itemNameInput]);
    // useEffect(() => {
    //     dispatch(typeItem({ inputType: 'desc', inputValue: itemDescInput }));
    // }, [dispatch, itemDescInput]);
    // useEffect(() => {
    //     dispatch(typeItem({ inputType: 'sum', inputValue: itemSumInput }));
    // }, [dispatch, itemSumInput]);

    return (
        <Form inline>
            <FormGroup floating>
                <Input 
                    id='name'
                    name='name'
                    placeholder='Name'
                    required
                    onChange={({ target }) => dispatch(typeItem({ inputType: 'name', inputValue: target.value }))}
                />
                <Label for="name">Name</Label>
            </FormGroup>
            <FormGroup floating>
                <Input 
                    id='desc'
                    name='desc'
                    placeholder='Description'
                    onChange={({ target }) => dispatch(typeItem({ inputType: 'desc', inputValue: target.value }))}
                />
                <Label for="desc">Description</Label>
            </FormGroup>
            <FormGroup floating>
                <Input 
                    id='sum'
                    name='sum'
                    placeholder='Sum'
                    required
                    onChange={({ target }) => dispatch(typeItem({ inputType: 'sum', inputValue: target.value }))}
                />
                <Label for="sum">Sum</Label>
            </FormGroup>
        </Form>
    );
}