// React imports
import { useState, useEffect } from 'react';
import {
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Button
} from 'reactstrap';
// Redux imports
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchUserByCredentials } from '../../../redux/slices/loginSlice';
import { addNewUserCredentials } from '../../../redux/slices/loginSlice';
export const LogAndRegView = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    
    const isAlreadyRegistered = useSelector(state => state.user.isRegisteredUser);
    // useEffect(() => console.log(isAlreadyRegistered), [isAlreadyRegistered]);

    const dispatch = useDispatch();

    // Login logic
    const login = () => {
        dispatch(fetchUserByCredentials({ email, password }));
    }

    // Register logic
    const register = () => {
        dispatch(fetchUserByCredentials({ email, password }));
        isAlreadyRegistered 
            ? console.log('The user already exists')
            : dispatch(addNewUserCredentials({ email, password }));
    }
    
    return (
        <Container style={{margin: '5rem auto'}}>
            <Form inline>
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
                {' '}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem'
                }}>
                    <Button 
                        style={{width: '6rem'}}
                        onClick={login}
                    >Login</Button>
                    <p>or</p>
                    <Button 
                        style={{width: '6rem'}}
                        onClick={register}
                    >Register</Button>
                </div>
            </Form>
        </Container>
    )
}
