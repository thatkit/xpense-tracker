import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar
            color="light"
            expand="md"
            light
        >
            <NavbarBrand href="/">
                Xpense Tracker
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                    <NavItem>
                        <NavLink href="https://github.com/thatkit">
                            Github
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink>
                            Github
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}
