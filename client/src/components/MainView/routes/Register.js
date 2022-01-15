// React imports
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Button
} from 'reactstrap';
import schema from '../../../helpers/passwordValidation';
// Redux imports
import { useDispatch } from 'react-redux';
// import { fetchUserByCredentials } from '../../redux/slices/loginSlice';
// import { addNewUserCredentials } from '../../redux/slices/loginSlice';

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repPassword, setRepPassword] = useState('');

    const dispatch = useDispatch();
    const register = () => {
        // 1. check if name, email and password is not nullish
        if (!password) {
            console.log('no password');
            return;
        }
        // 2. check if passwords match
        if (password !== repPassword) {
            console.log('ERROR: passwords do not match!');
            return;
        }
        // 3. validate password
        schema.validate(password)
            ? console.log('registering user...')
            : console.log('password is invalid');
    }
    
    return (
        <Container style={{margin: '5rem auto'}}>
            <Form inline>
                <FormGroup floating>
                    <Input
                        id="inputName"
                        name="name"
                        placeholder="Name"
                        type="name"
                        onChange={({ target }) => setName(target.value)}
                    />
                    <Label for="inputName">Name</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input
                        id="inputEmail"
                        name="email"
                        placeholder="Email"
                        type="email"
                        onChange={({ target }) => setEmail(target.value)}
                    />
                    <Label for="inputEmail">Email</Label>
                </FormGroup>
                {' '}
                <FormGroup floating>
                    <Input
                        id="inputPassword"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    <Label for="inputPassword">Password</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input
                        id="repeatPassword"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={({ target }) => setRepPassword(target.value)}
                    />
                    <Label for="repeatPassword">Repeat password</Label>
                </FormGroup>
                {' '}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem'
                }}>
                    <Button 
                        style={{width: '6rem'}}
                        onClick={register}
                    >Register</Button>
                    <Link
                        to="../login"
                        style={{width: '6rem'}}
                    >or log in</Link>
                </div>
            </Form>
        </Container>
    )
}
