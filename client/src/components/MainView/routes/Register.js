import { Link } from 'react-router-dom';
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
import {
    validateUserName,
    validateUserEmail,
    validateUserPassword,
    validateUserRepPassword
} from '../../../redux/actions/validation/user';

export const Register = () => {
    const dispatch = useDispatch();

    const handleOnChange = ({ target }, key) => {
        dispatch(typeUser({ [key]: target.value }));
    }

    // validate
    const validate = () => {
        [
            validateUserName,
            validateUserEmail,
            validateUserPassword,
            validateUserRepPassword
        ].forEach(act => dispatch(act()));
    }

    // selectors
    const nameValidation = useSelector(({ validation }) => validation.register.name.error);
    const emailValidation = useSelector(({ validation }) => validation.register.email.error);
    const passwordValidation = useSelector(({ validation }) => validation.register.password.error);
    const repPasswordValidation = useSelector(({ validation }) => validation.register.repPassword.error);
    
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
                        invalid={nameValidation.isError}
                    />
                    <Label for="inputName">Name</Label>
                    <FormFeedback tooltip>{nameValidation.mes}</FormFeedback>
                </FormGroup>
                <FormGroup floating>
                    <Input
                        id="inputEmail"
                        name="email"
                        placeholder="Email"
                        type="email"
                        onChange={({ target }, key) => handleOnChange({ target }, 'email')}
                        invalid={emailValidation.isError}
                    />
                    <Label for="inputEmail">Email</Label>
                    <FormFeedback tooltip>{emailValidation.mes}</FormFeedback>
                </FormGroup>
                {' '}
                <FormGroup floating>
                    <Input
                        id="inputPassword"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={({ target }, key) => handleOnChange({ target }, 'password')}
                        invalid={passwordValidation.isError}
                    />
                    <Label for="inputPassword">Password</Label>
                    <FormFeedback tooltip>{passwordValidation.mes}</FormFeedback>
                </FormGroup>
                <FormGroup floating>
                    <Input
                        id="repeatPassword"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={({ target }, key) => handleOnChange({ target }, 'repPassword')}
                        invalid={repPasswordValidation.isError}
                    />
                    <Label for="repeatPassword">Repeat password</Label>
                    <FormFeedback tooltip>{repPasswordValidation.mes}</FormFeedback>
                </FormGroup>
                {' '}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem'
                }}>
                    <Button 
                        style={{width: '6rem'}}
                        onClick={validate}
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
