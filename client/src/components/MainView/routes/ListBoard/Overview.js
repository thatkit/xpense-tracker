import {
    Toast,
    ToastHeader,
    ToastBody,
    ListGroup,
    ListGroupItem
} from 'reactstrap';

export const Overview = (props) => {
    return (
        <Toast>
            <ToastHeader>{props.name}</ToastHeader>
            <ToastBody>
                <ListGroup flush>
                    <ListGroupItem>Total budget: <b>{props.totalBudget} RUB</b></ListGroupItem>
                    <ListGroupItem>Total costs: <b>{props.totalCosts} RUB</b></ListGroupItem>
                    <ListGroupItem>Remains: <b>{props.remainder} RUB</b></ListGroupItem>
                </ListGroup>
            </ToastBody>
        </Toast>
    )
}