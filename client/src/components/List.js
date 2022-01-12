import { useDispatch, useSelector } from 'react-redux';
import { removeItem, selectItem, unselectItem } from '../redux/slices/apiSlice';
import {
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Row,
    Col,
    Badge
} from 'reactstrap';
import { EditItemFormModule } from './EditItemFormModule';
import { AddItemFormModule } from './AddItemFormModule';

export const List = (props) => {
    const dispatch = useDispatch();
    
    // Bottom 'Edit' and 'Remove' menu
    const currentItemId = useSelector(({ api }) => api.items.data.itemId);
    const openMenu = (e, id) => dispatch(selectItem(id));
    const closeMenu = (e, id) => dispatch(unselectItem(id));

    // 'Remove' button
    const remove = () => dispatch(removeItem());

    return (
        <>
            <ListGroup>{props.items.map(item => {
                return (
                    <ListGroupItem 
                        key={item._id}
                        id={item._id}
                        action
                        tag="button"
                        onMouseEnter={(e, id) => openMenu(e, item._id)}
                        onMouseLeave={(e, id) => closeMenu(e, item._id)}
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
                        {item._id === currentItemId && (
                            <Row>
                                <Col>
                                    <EditItemFormModule />
                                </Col>
                                <Col><Badge
                                    color="danger"
                                    onClick={remove}
                                >Remove</Badge></Col>
                            </Row>
                        )}
                    </ListGroupItem>
                );
            })}</ListGroup>
            <AddItemFormModule />
        </>
    )
}