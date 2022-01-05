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
// Redux imports
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/slices/currentUserSlice';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const login = () => dispatch(loginUser({ email, password }));
  
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
