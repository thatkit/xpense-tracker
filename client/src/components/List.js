import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../redux/slices/currentListSlice';
import { setCurrentItem, removeCurrentItem, setItemAction } from '../redux/slices/uiSlice';
import {
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Row,
    Col,
    Badge
} from 'reactstrap';
import { ItemFormModule } from './ItemFormModule';

export const List = (props) => {
    const dispatch = useDispatch();
    
    // Bottom 'Edit' and 'Remove' menu
    const currentItem = useSelector(({ ui }) => ui.currentItem);
    const openMenu = (e, id) => dispatch(setCurrentItem(id));
    const closeMenu = () => dispatch(removeCurrentItem());
    const setAction = () => dispatch(setItemAction());

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
                        {currentItem._id
                            ? item._id === currentItem._id && (
                            <Row>
                                <Col><ItemFormModule 
                                    listId={props.listId}
                                    actionName="edit"
                                /></Col>
                                <Col><Badge
                                    color="danger"
                                    onClick={remove}
                                >Remove</Badge></Col>
                            </Row>
                            )
                            : item._id === currentItem.prevId && (
                            <Row>
                                <Col><ItemFormModule 
                                    listId={props.listId}
                                    actionName="edit"
                                    onClick={setAction}
                                /></Col>
                                <Col><Badge
                                    color="danger"
                                    onClick={remove}
                                >Remove</Badge></Col>
                            </Row>
                            )
                        }
                    </ListGroupItem>
                );
            })}</ListGroup>
            <ItemFormModule
                listId={props.listId}
                actionName="add"
                onClickFunc={setAction}
            />
        </>
    )
}