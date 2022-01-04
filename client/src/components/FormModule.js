import { useState } from 'react';
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

export const FormModule = (props) => {
    // Toggle logic
    const [isOpen, setIsOpen] = useState(false);
    const toggler = () => setIsOpen(!isOpen);

    // Inner state for inputs
    const initialState = new Object();
    props.inputFields.forEach(({ name }) => {
        Object.defineProperty(initialState, name, {
            value: 'hi there',
            writable: true
        });
    });
    const [state, setState] = useState(initialState);

    // Mimic send POST request
    const post = () => {
        console.log(state);
    }

    return (
        <div>
            <Button
                color="success"
                onClick={toggler}
            >Click Me</Button>

            <Modal
                centered
                isOpen={isOpen}
                toggle={toggler}
            >
                <ModalHeader>{props.header}</ModalHeader>
                <ModalBody>
                    <Form inline>{props.inputFields.map(field => {
                        return (<FormGroup floating key={field.name}>
                            <Input 
                                id={field.name}
                                name={field.name}
                                placeholder={field.name.toUpperCase()}
                                required={field.required}
                                onChange={({ target }) => setState(prevState => ({
                                    ...prevState,
                                    [field.name]: target.value
                                }))}
                            />
                            <Label for={field.name}>{field.name}</Label>
                        </FormGroup>);
                    })}</Form>
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