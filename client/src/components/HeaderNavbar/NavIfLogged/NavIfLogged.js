import { NavItem } from 'reactstrap';
import { ListsDropdown } from './ListsDropdown/ListsDropdown';
import { UserMenu } from './UserMenu/UserMenu';

export const NavIfLogged = () => {
    return (
        <>
            <NavItem>
                <ListsDropdown />
            </NavItem>
            <NavItem>
                <UserMenu />
            </NavItem>
        </>
    )
}