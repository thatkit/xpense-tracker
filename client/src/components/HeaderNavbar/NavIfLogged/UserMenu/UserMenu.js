import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { logout } from '../../../../redux/slices/apiSlice';

export const UserMenu = () => {
    const dispatch = useDispatch();

    const user = useSelector(({ api }) => api.users.currentUser);
    
    return (
        <Button onClick={() => dispatch()}>
            {user.name || 'User name'}
        </Button>
    )
}