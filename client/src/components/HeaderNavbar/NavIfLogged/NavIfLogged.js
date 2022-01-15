import { useSelector } from 'react-redux';
import {
    NavItem,
    Button
} from 'reactstrap';
import { ListsDropdown } from './ListsDropdown/ListsDropdown'

export const NavIfLogged = () => {
    const user = useSelector(({ api }) => api.users.data);
    
    return (
        <>
            <NavItem>
                <ListsDropdown />
            </NavItem>
            <NavItem>
                <Button>
                    {user.name || 'User name'}
                </Button>
            </NavItem>
        </>
    )
}