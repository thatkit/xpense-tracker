// React
import { useEffect, useContext } from 'react';
import { AuthContext } from '../../../AuthProvider';
// React Router
import { Link, useNavigate } from 'react-router-dom';
// Redux imports
import { useDispatch, useSelector } from 'react-redux';
import { typeUser } from '../../../redux/slices/apiSlice';
import { registerUser } from '../../../redux/actions/api/users';
import {
    validateUserName,
    validateUserEmail,
    validateUserPassword,
    validateUserRepPassword
} from '../../../redux/actions/validation/user';
// Reactstrap
import {
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    FormFeedback,
    Button
} from 'reactstrap';

export const Register = () => {
    const dispatch = useDispatch();

    // Pushing to /home if logged in
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    useEffect(() => {
        isLoggedIn && navigate('/home');
    }, [dispatch, navigate, isLoggedIn]);

    // on change handler
    const handleOnChange = ({ target }, key) => {
        // type user to store
        dispatch(typeUser({ [key]: target.value }));

        // validate
        key === 'name' && dispatch(validateUserName());
        key === 'email' && dispatch(validateUserEmail());
        key === 'password' && dispatch(validateUserPassword());
        key === 'repPassword' && dispatch(validateUserRepPassword());
    }

    // selectors-validation
    const {
        name,
        email,
        password,
        repPassword
    } = useSelector(({ validation }) => validation.register);

    // if validate ok, register
    const register = () => {
        if ([
            name,
            email,
            password,
            repPassword
        ].every(({ isValid }) => isValid === true)) {
            dispatch(registerUser());
        }
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
                        onChange={({ target }, key) => handleOnChange({ target }, 'name')}
                        invalid={name.error.isError}
                    />
                    <Label for="inputName">Name</Label>
                    <FormFeedback tooltip>{name.error.mes}</FormFeedback>
                </FormGroup>
                <FormGroup floating>
                    <Input
                        id="inputEmail"
                        name="email"
                        placeholder="Email"
                        type="email"
                        onChange={({ target }, key) => handleOnChange({ target }, 'email')}
                        invalid={email.error.isError}
                    />
                    <Label for="inputEmail">Email</Label>
                    <FormFeedback tooltip>{email.error.mes}</FormFeedback>
                </FormGroup>
                {' '}
                <FormGroup floating>
                    <Input
                        id="inputPassword"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={({ target }, key) => handleOnChange({ target }, 'password')}
                        invalid={password.error.isError}
                    />
                    <Label for="inputPassword">Password</Label>
                    <FormFeedback tooltip>{password.error.mes}</FormFeedback>
                </FormGroup>
                <FormGroup floating>
                    <Input
                        id="repeatPassword"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={({ target }, key) => handleOnChange({ target }, 'repPassword')}
                        invalid={repPassword.error.isError}
                    />
                    <Label for="repeatPassword">Repeat password</Label>
                    <FormFeedback tooltip>{repPassword.error.mes}</FormFeedback>
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
