import {
    Row,
    Col
} from 'reactstrap';
import { List } from '../List';
import { Overview } from '../Overview';

export const ListBoard = () => {
    // logic for fetching GET to /api/lists with body.listId = useParams()

    // mockup lists collection
    const lists = {
        name: 'Wedding',
        totalBudget: 500000,
        items: [
            { _id: '111', name: 'Beverages', desc: 'Alcoholic drinks', sum: 35000, date: '2021-10-10' },
            { _id: '222', name: 'Restaurant', desc: 'Rent for 50 guests', sum: 100000, date: '2021-11-11' },
            { _id: '333', name: 'Food', desc: 'Restaurant food', sum: 80000, date: '2021-12-12' }
        ],
        get totalCosts() {return this.items.reduce((acc, item) => acc + item.sum, 0)},
        get remainder() {return this.totalBudget - this.totalCosts}
    }
  
    return (
        <>
            <Row>
                <Col xs="12" sm="8">
                    <List 
                        items={lists.items}
                    />
                </Col>
                <Col xs="12" sm="4">
                    <Overview 
                        name={lists.name}
                        totalBudget={lists.totalBudget}
                        totalCosts={lists.totalCosts}
                        remainder={lists.remainder}
                    />
                </Col>
            </Row>
        </>
    )
}
