import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { typeItem } from '../../redux/slices/apiSlice';
import { validateItemName, validateItemSum } from '../../redux/actions/validation/item';
import {
    Form,
    FormGroup,
    Input,
    Label,
    FormFeedback
} from 'reactstrap';

export const ItemForm = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(validateItemName());
        dispatch(validateItemSum());
    }, [dispatch]);

    // Sending inputs to the Redux store and validating
    const handleOnChange = ({ target }, key) => {
        // for number type
        if (key === 'sum') {
            dispatch(typeItem({ [key]: Number(target.value) }));
            dispatch(validateItemSum());
            return null;
        }

        // for anything else
        dispatch(typeItem({ [key]: target.value }));
        key === 'name' && dispatch(validateItemName());
    }

    // retrieving item data props for editting
    const { name, desc, sum } = useSelector(({ api }) => api.items.data);

    return (
        <Form inline>
            <FormGroup floating>
                <Input
                    value={name}
                    id='name'
                    name='name'
                    placeholder='Name'
                    required
                    onChange={({ target }, key) => handleOnChange({ target }, 'name')}
                    invalid={props.name.error.isError}
                />
                <Label for="name">Name</Label>
                <FormFeedback tooltip>{props.name.error.mes}</FormFeedback>
            </FormGroup>
            <FormGroup floating>
                <Input
                    value={desc}
                    id='desc'
                    name='desc'
                    placeholder='Description'
                    onChange={({ target }, key) => handleOnChange({ target }, 'desc')}
                />
                <Label for="desc">Description</Label>
            </FormGroup>
            <FormGroup floating>
                <Input
                    value={sum}
                    id='sum'
                    name='sum'
                    placeholder='Sum'
                    required
                    onChange={({ target }, key) => handleOnChange({ target }, 'sum')}
                    invalid={props.sum.error.isError}
                    type="number"
                />
                <Label for="sum">Sum</Label>
                <FormFeedback tooltip>{props.sum.error.mes}</FormFeedback>
            </FormGroup>
        </Form>
    );
}