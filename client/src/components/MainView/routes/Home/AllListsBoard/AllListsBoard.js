import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
// import { AllListsBoard } from ;

export const AllListsBoard = () => {
    // const dispatch = useDispatch(); # is really needed here?
  
    const allLists = useSelector(({ api }) => api.users.currentUser.lists);

    return (
        <>
            {allLists.map(list => {
                return (
                    <li>hi</li>
                )
            })}
        </>
    )
}