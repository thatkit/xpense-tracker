// React imports
// import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Button
} from 'reactstrap';
// Redux imports
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserByCredentials } from '../../redux/slices/loginSlice';
// import { addNewUserCredentials } from '../../redux/slices/loginSlice';

export const Login = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const login = () => console.log('login'); // REDUX dispatch action
    
    // const user = useSelector(state => state.user);
    // useEffect(() => {
    //     dispatch(fetchUserByCredentials({ email, password }));
    // }, [email, password]);

    // const dispatch = useDispatch();

    // // Login logic
    // const login = () => {
    //     user.isRegisteredUser 
    //         ? console.log('Login successfull')
    //         : console.log('Login failed: the user doesn\'t exist');
    // }

    // // Register logic
    // const register = () => {
    //     !user.isRegisteredUser 
    //         ? console.log('Signed up')
    //         : console.log('Couldn\'t sign up: the user already exists');
    // }
    
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
                    <Link
                        to="../register"
                        style={{width: '6rem'}}
                    >or register</Link>
                </div>
            </Form>
        </Container>
    )
}
