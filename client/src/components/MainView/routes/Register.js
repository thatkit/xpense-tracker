import { useEffect, useContext } from 'react';
import { AuthContext } from '../../../AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import {
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    FormFeedback,
    Button
} from 'reactstrap';
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

export const Register = () => {
    const dispatch = useDispatch();

    // Pushing to /home if logged in
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    useEffect(() => {
        isLoggedIn && navigate('/home');
    }, [dispatch, navigate, isLoggedIn]);

    const handleOnChange = ({ target }, key) => {
        // type user to store
        dispatch(typeUser({ [key]: target.value }));
        // validate
        [
            validateUserName,
            validateUserEmail,
            validateUserPassword,
            validateUserRepPassword
        ].forEach(act => dispatch(act()));
    }

    // if validate ok, register
    const register = () => {
        if ([
            nameValidation,
            emailValidation,
            passwordValidation,
            repPasswordValidation
        ].every(({ isValid }) => isValid === true)) {
            dispatch(registerUser());
        }
    }

    // selectors
    const nameValidation = useSelector(({ validation }) => validation.register.name);
    const emailValidation = useSelector(({ validation }) => validation.register.email);
    const passwordValidation = useSelector(({ validation }) => validation.register.password);
    const repPasswordValidation = useSelector(({ validation }) => validation.register.repPassword);
    
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
                        invalid={nameValidation.error.isError}
                    />
                    <Label for="inputName">Name</Label>
                    <FormFeedback tooltip>{nameValidation.error.mes}</FormFeedback>
                </FormGroup>
                <FormGroup floating>
                    <Input
                        id="inputEmail"
                        name="email"
                        placeholder="Email"
                        type="email"
                        onChange={({ target }, key) => handleOnChange({ target }, 'email')}
                        invalid={emailValidation.error.isError}
                    />
                    <Label for="inputEmail">Email</Label>
                    <FormFeedback tooltip>{emailValidation.error.mes}</FormFeedback>
                </FormGroup>
                {' '}
                <FormGroup floating>
                    <Input
                        id="inputPassword"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={({ target }, key) => handleOnChange({ target }, 'password')}
                        invalid={passwordValidation.error.isError}
                    />
                    <Label for="inputPassword">Password</Label>
                    <FormFeedback tooltip>{passwordValidation.error.mes}</FormFeedback>
                </FormGroup>
                <FormGroup floating>
                    <Input
                        id="repeatPassword"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={({ target }, key) => handleOnChange({ target }, 'repPassword')}
                        invalid={repPasswordValidation.error.isError}
                    />
                    <Label for="repeatPassword">Repeat password</Label>
                    <FormFeedback tooltip>{repPasswordValidation.error.mes}</FormFeedback>
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
