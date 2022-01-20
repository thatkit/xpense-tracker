// react router Link instead of reactstrap Button
import { useSelector } from 'react-redux';
import {
    CardGroup,
    Card,
    CardTitle,
    CardBody,
    CardSubtitle
} from 'reactstrap';

export const AllListsBoard = () => {
    const allLists = useSelector(({ api }) => api.users.currentUser.lists);

    return (
        <CardGroup>
            {allLists.map(list => {
                return (
                    <Card
                        color="light"
                    >
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
                            {/* # progress bar */}
                        </CardBody>
                    </Card>
                )
            })}
        </CardGroup>
    )
}