import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import { AllListsBoard } from './AllListsBoard/AllListsBoard';

export const Home = () => {
    // const dispatch = useDispatch(); # is really needed here?
  
    const user = useSelector(({ api }) => api.users.currentUser);

    return (
        <>
            <Container>
                <h1 className="display-1">Welcome {user.name}</h1>
                <AllListsBoard />
            </Container>
        </>
    )
}