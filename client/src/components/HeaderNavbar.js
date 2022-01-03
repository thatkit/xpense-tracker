import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar,
    Nav
} from 'reactstrap';
import { NavIfLogged } from './NavIfLogged';
import { NavIfNOTLogged } from './NavIfNOTLogged';

export const HeaderNavbar = (props) => {
    const loggedIn = true; // just for now

    return (
        <div>
            <Navbar
                color="dark"
                dark
                expand="sm"
            >
                <Nav navbar style={{
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>

                {
                    loggedIn
                    ? <NavIfLogged />
                    : <NavIfNOTLogged />
                }
                </Nav>
            </Navbar>
        </div>
    )
}
