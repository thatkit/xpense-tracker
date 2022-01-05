import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleListsDropdown } from '../redux/slices/uiSlice';
import { NewListFormModule } from './NewListFormModule';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

export const ListsDropdown = (props) => {
    const dispatch = useDispatch();

    // Collapse toggle behaviour
    const isOpen = useSelector(state => state.ui.listsDropdownIsOpen);
    const toggler = () => dispatch(toggleListsDropdown());

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
                <NewListFormModule />
            </DropdownMenu>
        </Dropdown>
    )
}
