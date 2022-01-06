import { useDispatch, useSelector } from 'react-redux';
import { setCurrentItem, removeCurrentItem } from '../redux/slices/uiSlice';
import {
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Row,
    Col,
    Badge
} from 'reactstrap';
import { NewItemFormModule } from './NewItemFormModule';

export const List = (props) => {
    // Bottom 'Edit' and 'Remove' menu
    const dispatch = useDispatch();
    const isCurrentItemId = useSelector(({ ui }) => ui.currentItem._id);
    const openMenu = (e, id) => dispatch(setCurrentItem(id));
    const closeMenu = () => dispatch(removeCurrentItem());

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
                        onMouseLeave={closeMenu}
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
                        {isCurrentItemId === item._id && (
                            <Row>
                                <Col><Badge color="warning">Edit</Badge></Col>
                                <Col><Badge color="danger">Remove</Badge></Col>
                            </Row>
                        )}
                    </ListGroupItem>
                );
            })}</ListGroup>
            <NewItemFormModule listId={props.listId} />
        </>
    )
}