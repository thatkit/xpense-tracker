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
import { typeUser } from '../../../redux/slices/apiSlice';
import {
    validateUserName,
    validateUserEmail,
    validateUserPassword,
    validateUserRepPassword
} from '../../../redux/actions/validation/user';

export const Register = () => {
    const dispatch = useDispatch();
    // const register = () => {
    //     // 1. check if name, email and password is not nullish
    //     if (!password) {
    //         console.log('no password');
    //         return;
    //     }
    //     // 2. check if passwords match
    //     if (password !== repPassword) {
    //         console.log('ERROR: passwords do not match!');
    //         return;
    //     }
    //     // 3. validate password
    //     schema.validate(password)
    //         ? console.log('registering user...')
    //         : console.log('password is invalid');
    // }
    const handleOnChange = ({ target }, key) => {
        dispatch(typeUser({ [key]: target.value }));
    }

    const test = () => {
        dispatch(validateUserName());
        dispatch(validateUserEmail());
        dispatch(validateUserPassword());
        dispatch(validateUserRepPassword());
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
                    />
                    <Label for="inputName">Name</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input
                        id="inputEmail"
                        name="email"
                        placeholder="Email"
                        type="email"
                        onChange={({ target }, key) => handleOnChange({ target }, 'email')}
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
                        onChange={({ target }, key) => handleOnChange({ target }, 'password')}
                    />
                    <Label for="inputPassword">Password</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input
                        id="repeatPassword"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={({ target }, key) => handleOnChange({ target }, 'repPassword')}
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
                        onClick={test}
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
