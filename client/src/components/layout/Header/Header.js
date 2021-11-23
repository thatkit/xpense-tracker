import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

export const Header = (props) => {
    // Collapse toggle behaviour
    const [isOpen, setIsOpen] = useState(false);
    const toggler = () => setIsOpen(!isOpen);

    return (
        <div>
        <Navbar
            color="dark"
            dark
        >
            <NavbarBrand
                className="me-auto"
                href="/"
            >
                Xpense Tracker
            </NavbarBrand>
            <NavbarToggler
                className="me-2"
                onClick={toggler}
            />
            <Collapse isOpen={isOpen} navbar>
                <Nav navbar>
                    <NavItem>
                        <NavLink href="/components/">
                            Something's something
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://github.com/thatkit">
                            GitHub
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
        </div>
    )
}
