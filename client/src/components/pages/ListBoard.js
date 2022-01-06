import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchList } from '../../redux/slices/currentListSlice';
import {
    Row,
    Col
} from 'reactstrap';
import { List } from '../List';
import { Overview } from '../Overview';

export const ListBoard = () => {
    const dispatch = useDispatch();
    const data = useParams();
    const isNewItemAdded = useSelector(({ currentList }) => currentList.itemSent);
    useEffect(() => {
        dispatch(fetchList({ listId: data.listId }));
    }, [dispatch, data, isNewItemAdded]);

    // Current list data
    const list = useSelector(({ currentList }) => currentList.listData);
  
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
