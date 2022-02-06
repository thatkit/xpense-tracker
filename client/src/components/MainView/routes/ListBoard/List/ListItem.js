import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../../../../redux/actions/api/items';
import { selectItem } from '../../../../../redux/slices/apiSlice';
import {
    Badge,
    Col,
    Row,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText
} from 'reactstrap';
import { EditItemFormModule } from './EditItemFormModule';

export const ListItem = props => {
    const dispatch = useDispatch();

    useEffect(() => {

    });

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
        <ListGroupItem 
            id={props.itemId}
            action
            tag="button"
            onMouseEnter={(e, itemObj) => openMenu(e, {
                _id: props.itemId,
                name: props.itemName,
                desc: props.itemDesc,
                sum: props.itemSum
            })}
        >
            <Row>
                <Col>
                    <ListGroupItemHeading>{props.itemName}</ListGroupItemHeading>
                    <ListGroupItemText>{props.itemDesc}</ListGroupItemText>                           
                </Col>
                <Col>
                    <ListGroupItemText>{props.itemSum} RUB</ListGroupItemText>
                    <ListGroupItemText>{props.itemDate}</ListGroupItemText>                      
                </Col>
            </Row>
            {props.itemId === curItemId && (
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
    )
};
