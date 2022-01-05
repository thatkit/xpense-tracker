import { useSelector } from 'react-redux';
import {
    NavItem,
    Button
} from 'reactstrap';
import { ListsDropdown } from './ListsDropdown'

export const NavIfLogged = () => {
    const userName = useSelector(({ currentUser }) => currentUser.userData.name);

    return (
        <>
            <NavItem>
                <ListsDropdown />
            </NavItem>
            <NavItem>
                <Button>
                    {userName || 'User name'}
                </Button>
            </NavItem>
        </>
    )
}