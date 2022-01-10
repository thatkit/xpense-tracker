import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleListsDropdown } from '../redux/slices/uiSlice';
import { fetchLists } from '../redux/slices/currentUserSlice';
import { NewListFormModule } from './NewListFormModule';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

export const ListsDropdown = () => {
    const dispatch = useDispatch();

    // Collapse toggle behaviour
    const isOpen = useSelector(({ ui }) => ui.listsDropdownIsOpen);
    const toggler = () => dispatch(toggleListsDropdown());

    // Lists
    const lists = useSelector(({ api }) => api.users.data.lists);

    // Autoupdate when first loggin in
    useEffect(() => {
        dispatch(fetchLists());
    }, []);

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
                {lists.map(({ _id, name }) => {
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
