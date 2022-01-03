import {
    NavItem,
    NavLink
} from 'reactstrap';

export const NavIfNOTLogged = () => {
    return (
        <div>
            <NavItem>
                <NavLink href="https://github.com/thatkit" target="_blank">
                    Please, log in or register
                </NavLink>
            </NavItem>
        </div>
    )
}