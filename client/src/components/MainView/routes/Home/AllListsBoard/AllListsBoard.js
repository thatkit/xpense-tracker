import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    CardGroup,
    Card,
    CardTitle,
    CardBody,
    CardSubtitle,
    Progress
} from 'reactstrap';
import { calcProgress } from '../../../../../helpers/progressBar';

export const AllListsBoard = () => {
    const allLists = useSelector(({ api }) => api.users.currentUser.lists);

    return (
        <CardGroup>
            {allLists.map(list => {
                return (
                    <Card color="light" key={list._id}>
                    <Link to={`../${list._id}`} style={{textDecoration: 'none'}}>
                        <CardBody>
                            <CardTitle tag="h5">
                                {list.name}
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                            >
                                {list.totalBudget}
                            </CardSubtitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                            >
                                {list.totalCosts}
                            </CardSubtitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                            >
                                {list.remainder}
                            </CardSubtitle>
                            <Progress
                                value={calcProgress(100, 75)}
                                color={75 <= 80 ? 'success' : 'warning'}
                                animated
                            ></Progress>
                        </CardBody>
                    </Link>
                    </Card>
                )
            })}
        </CardGroup>
    )
}