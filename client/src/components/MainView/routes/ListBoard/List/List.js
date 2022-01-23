import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../../../../redux/actions/api/items';
import { selectItem } from '../../../../../redux/slices/apiSlice';
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

    // this is needed in order to escape selectItem() action from dispatching when actually editing
    const isFormOpen = useSelector(({ ui }) => ui.editItemFormModuleIsOpen);;
    
    // Bottom 'Edit' and 'Remove' menu
    const curItemId = useSelector(({ api }) => api.items.data.itemId);
    const openMenu = (e, itemObj) => {
        !isFormOpen && dispatch(selectItem(itemObj));
    };

    // 'Remove' button
    const remove = () => dispatch(removeItem());

    return (
        <>
            <ListGroup>
            {props.items.map(item => {
                return (
                    <ListGroupItem 
                        key={item._id}
                        id={item._id}
                        action
                        tag="button"
                        onMouseEnter={(e, itemObj) => openMenu(e, {
                            _id: item._id,
                            name: item.name,
                            desc: item.desc,
                            sum: item.sum
                        })}
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
                        {item._id === curItemId && (
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