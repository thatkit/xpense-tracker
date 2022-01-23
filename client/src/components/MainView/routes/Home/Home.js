import { Container } from 'reactstrap';
import { AllListsBoard } from './AllListsBoard/AllListsBoard';

export const Home = () => {
    return (
        <Container>
            <h1 className="display-1">Your expenses lists</h1>
            <AllListsBoard />
        </Container>
    )
}