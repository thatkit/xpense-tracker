import { useState } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

export const ListsDropdown = (props) => {
    // Collapse toggle behaviour
    const [isOpen, setIsOpen] = useState(false);
    const toggler = () => setIsOpen(!isOpen);

    return (
        <div>
            <Dropdown isOpen={isOpen} toggle={toggler}>
                <DropdownToggle caret>
                    Expenses lists
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>
                        <Link to="login">Login</Link>
                    </DropdownItem>
                    <DropdownItem>
                        <Link to="register">Register</Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                        Add new list
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
