import {
    NavItem,
    NavLink
} from 'reactstrap';
import { ListsDropdown } from './ListsDropdown'

export const NavIfLogged = () => {
    return (
        <>
            <NavItem>
                <ListsDropdown />
            </NavItem>
            <NavItem>
                <NavLink href="https://github.com/thatkit" target="_blank">
                        User
                </NavLink>
            </NavItem>
        </>
    )
}