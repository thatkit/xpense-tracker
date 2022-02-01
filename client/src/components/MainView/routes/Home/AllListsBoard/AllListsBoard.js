import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    CardGroup,
    Card,
    CardTitle,
    CardBody,
    CardSubtitle,
    Progress
} from 'reactstrap';
import { calcProgress } from '../../../../../helpers/progressBar';
import { fetchAllLists } from '../../../../../redux/actions/api/lists';

export const AllListsBoard = () => {
    const dispatch = useDispatch();

    // Lists
    const { newList, allLists } = useSelector(({ api }) => api.lists);

    // Autoupdate when first loggin in
    useEffect(() => {
        dispatch(fetchAllLists());
    }, [dispatch, newList]);
    
    return (
        <CardGroup>
            {allLists.map(list => {
                
                const totalSpent = calcProgress(list.totalBudget, list.totalCosts);

                return (
                    <Card color="light" key={list._id}>
                    <Link to={`../lists/${list._id}`} style={{textDecoration: 'none'}}>
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
                                value={totalSpent}
                                color={totalSpent <= 80 ? 'success' : 'warning'}
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