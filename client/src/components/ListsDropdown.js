import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleListsDropdown } from '../redux/slices/uiSlice';
import { fetchList } from '../redux/slices/currentListSlice';
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

    const lists = useSelector(({ currentUser }) => currentUser.userData.lists);

    useEffect(() => {
        dispatch(fetchList({ listId: '61d2402bc83a9c676c6b1d50' }));
    })

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
