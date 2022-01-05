import { useState } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FormModule } from './FormModule';

export const ListsDropdown = (props) => {
    // Collapse toggle behaviour
    const [isOpen, setIsOpen] = useState(false);
    const toggler = () => setIsOpen(!isOpen);

    // mockup users collection
    const users = {
        lists: [
            { _id: '123123123123', name: 'Wedding' },
            { _id: '456456456456', name: 'Avramenko' },
            { _id: '789789789789', name: 'Honeymoon' }
        ]
    }

    return (
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
                {users.lists.map(({ _id, name }) => {
                    return (
                        <DropdownItem key={_id}>
                            <Link to={_id}>{name}</Link>
                        </DropdownItem>
                    )
                })}
                <FormModule
                    header="Add new list"
                    inputFields={[
                        { name: 'name', type: String, required: true },
                        { name: 'budget', type: Number, required: true }
                    ]}
                />
            </DropdownMenu>
        </Dropdown>
    )
}
