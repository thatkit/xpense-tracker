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
import { FormModule } from './FormModule';

export const List = (props) => {
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
            <FormModule 
                header="Add new item"
                inputFields={[
                    { name: 'name', type: String, required: true },
                    { name: 'desc', type: String, required: false },
                    { name: 'sum', type: Number, required: true },
                    { name: 'date', type: Date, required: true }
                ]}
            />
        </>
    )
}