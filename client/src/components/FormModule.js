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
    const [isPopped, setIsPopped] = useState(false);
    const toggler = () => setIsPopped(!isPopped);

    // Inner state for inputs
    const initialInputFields = {};
    props.inputFields.forEach(({ name }) => {
        Object.defineProperty(initialInputFields, name, {
            value: '',
            writable: true
        });
    });
    const [inputFields, setInputFields] = useState(initialInputFields);

    // Mimic send POST request
    const post = () => {
        console.log(inputFields);
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
                isOpen={isPopped}
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
                                onChange={({ target }) => setInputFields(prevInputFields => ({
                                    ...prevInputFields,
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