import { useSelector } from 'react-redux';
import {
    Navbar,
    Nav
} from 'reactstrap';
import { NavIfLogged } from './NavIfLogged';
import { NavIfNOTLogged } from './NavIfNOTLogged';

export const HeaderNavbar = () => {
    const isLoginned = useSelector(({ currentUser }) => currentUser.isLoginned);

    return (
        <div>
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
                    isLoginned
                    ? <NavIfLogged />
                    : <NavIfNOTLogged />
                }
                </Nav>
            </Navbar>
        </div>
    )
}
