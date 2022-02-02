// React
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../AuthProvider';
// React Router
import { Link, useNavigate } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/actions/api/users';
// Reactstrap
import {
    Container,
    Form,
    FormGroup,
    FormFeedback,
    Input,
    Label,
    Button
} from 'reactstrap';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const login = () => dispatch(loginUser({ email, password }));

    // Validating through backend & DB
    const { isError, mes } = useSelector(({ api }) => api.users.login.error);
    
    // Pushing to /home if logged in
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    useEffect(() => {
        // console.log(isError, mes)
        isLoggedIn && navigate('/home');
    }, [dispatch, navigate, isLoggedIn]);

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
                        invalid={mes === 'User doesn\'t exist' && isError}
                    />
                    <Label for="inputEmail">Email</Label>
                    <FormFeedback tooltip>{mes === 'User doesn\'t exist' && mes}</FormFeedback>
                </FormGroup>
                {' '}
                <FormGroup floating>
                    <Input
                        id="inputPassword"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={({ target }) => setPassword(target.value)}
                        invalid={mes === 'Invalid credentials' && isError}
                    />
                    <Label for="inputPassword">Password</Label>
                    <FormFeedback tooltip>{mes === 'Invalid credentials' && mes}</FormFeedback>
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