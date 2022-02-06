import { ListGroup } from 'reactstrap';
import { AddItemFormModule } from './AddItemFormModule';
import { ListItem } from './ListItem';

export const List = (props) => { 
    return (
        <>
            <ListGroup>
            {props.items.map(item => {
                return (
                    <ListItem
                        key={item._id}
                        itemId={item._id}
                        itemName={item.name}
                        itemDesc={item.desc}
                        itemSum={item.sum}
                        itemDate={item.date}
                    />
                );
            })}</ListGroup>
            <AddItemFormModule />
        </>
    )
}