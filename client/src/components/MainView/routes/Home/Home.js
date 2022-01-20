import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';

export const Home = () => {
    const dispatch = useDispatch();
    const data = useParams();
  
    return (
        <>
            <Row>
                <Col xs="12" sm="8">
                    {/* Welcome {user} */}
                </Col>
                <Col xs="12" sm="4">
                    {/* AllListsBoard */}
                </Col>
            </Row>
        </>
    )
}
