import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { logout } from '../../../../redux/slices/apiSlice';

export const UserMenu = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector(({ api }) => api.users);
    
    return (
        <Button onClick={() => dispatch(logout())}>
            {currentUser.name || 'User name'}
        </Button>
    )
}