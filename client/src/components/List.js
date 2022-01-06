import { useState } from 'react';
import {
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Row,
    Col,
    Button
} from 'reactstrap';
import { NewItemFormModule } from './NewItemFormModule';

export const List = (props) => {
    // Bottom 'Edit' and 'Remove' menu
    const [isOpen, setIsOpen] = useState(false);
    const toggler = (e, id) => {
        console.log(id)
        setIsOpen(!isOpen);
    }

    return (
        <>
            <ListGroup>{props.items.map(item => {
                return (
                    <ListGroupItem 
                        key={item._id}
                        id={item._id}
                        action
                        tag="button"
                        onClick={(e, id) => toggler(e, item._id)}
                    >
                        <Row>
                            <Col>
                                <ListGroupItemHeading>{item.name}</ListGroupItemHeading>
                                <ListGroupItemText>{item.desc}</ListGroupItemText>                           
                            </Col>
                            <Col>
                                <ListGroupItemText>{item.sum} RUB</ListGroupItemText>
                                <ListGroupItemText>{item.date}</ListGroupItemText>                      
                            </Col>
                        </Row>
                        {isOpen && (
                            <Row>
                                <Col><Button color="warning">Edit</Button></Col>
                                <Col><Button color="danger">Remove</Button></Col>
                            </Row>
                        )}
                    </ListGroupItem>
                );
            })}</ListGroup>
            <NewItemFormModule listId={props.listId} />
        </>
    )
}