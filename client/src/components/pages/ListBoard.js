import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentList } from '../../redux/actions/api/lists';
import { Row, Col } from 'reactstrap';
import { List } from '../List';
import { Overview } from '../Overview';

export const ListBoard = () => {
    const dispatch = useDispatch();
    const data = useParams();

    // Autoupdates when an item is edited or removed
    const isNewItemAdded = useSelector(({ api }) => api.items.addItem.isAdded);
    const isItemRemoved = useSelector(({ api }) => api.items.removeItem.isRemoved);
    useEffect(() => {
        dispatch(fetchCurrentList({ listId: data.listId }));
    }, [dispatch, data, isNewItemAdded, isItemRemoved]);

    // Current list data
    const list = useSelector(({ api }) => api.lists.currentList);
  
    return (
        <>
            <Row>
                <Col xs="12" sm="8">
                    <List 
                        items={list.items}
                        listId={data.listId}
                    />
                </Col>
                <Col xs="12" sm="4">
                    <Overview 
                        name={list.name}
                        totalBudget={list.totalBudget}
                        totalCosts={list.totalCosts}
                        remainder={list.remainder}
                    />
                </Col>
            </Row>
        </>
    )
}
