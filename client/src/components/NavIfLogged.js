import { useSelector } from 'react-redux';
import {
    NavItem,
    Button
} from 'reactstrap';
import { ListsDropdown } from './ListsDropdown'

export const NavIfLogged = () => {
    const user = useSelector(({ currentUser }) => currentUser.userData);
    
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