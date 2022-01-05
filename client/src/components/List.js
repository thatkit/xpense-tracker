import { useState } from 'react';
import {
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Row,
    Col
} from 'reactstrap';
import { NewItemFormModule } from './NewItemFormModule';

export const List = (props) => {
    // highlught on click
    const [isActive, setIsActive] = useState(false);
    const clicker = e => {
        setIsActive(!isActive);
    }

    return (
        <>
            <ListGroup>{props.items.map(item => {
                return (
                    <ListGroupItem 
                        key={item._id}
                        action
                        tag="button"
                        onMouseDown={clicker}
                        onMouseUp={clicker}
                        active={isActive}
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
                    </ListGroupItem>
                );
            })}</ListGroup>
            <NewItemFormModule />
        </>
    )
}