import React from 'react';
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

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.isOpen = React.createRef();
        this.logger = this.logger.bind(this);
    }

    logger() {
        console.log(this.isOpen)
    }

    render() {
        return (
            <Navbar
                color="light"
                expand="md"
                light
                ref={this.myRef.current}
            >
                <NavbarBrand onClick={this.logger}>
                    Xpense Tracker
                </NavbarBrand>
                <NavbarToggler onClick={function noRefCheck(){}} />
                <Collapse navbar>
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
}
