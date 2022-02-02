import {
    NavItem,
    NavLink
} from 'reactstrap';

export const NavIfNOTLogged = () => {
    return (
        <>
            <NavItem>
                <NavLink href="/">
                    Xpense-Tracker by thatkit
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="https://github.com/thatkit/xpense-tracker" target="_blank">
                    Github
                </NavLink>
            </NavItem>
        </>
    )
}