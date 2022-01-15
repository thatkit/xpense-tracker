import { useSelector } from 'react-redux';
import {
    Navbar,
    Nav
} from 'reactstrap';
import { NavIfLogged } from './NavIfLogged/NavIfLogged';
import { NavIfNOTLogged } from './NavIfNOTLogged';

export const HeaderNavbar = () => {
    const isLoggedIn = useSelector(({ api }) => api.users.login.isLoggedIn);

    return (
        <Navbar
            color="dark"
            dark
            expand="xs"
        >
            <Nav navbar style={{
                width: '100vw',
                display: 'flex',
                justifyContent: 'space-between'
            }}>

            {
                isLoggedIn
                ? <NavIfLogged />
                : <NavIfNOTLogged />
            }
            </Nav>
        </Navbar>
    )
}
