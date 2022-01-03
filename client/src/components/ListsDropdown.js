import { useState } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

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
                        List 1
                    </DropdownItem>
                    <DropdownItem>
                        List 2
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
