export const List = (props) => {
    return (
        <ul>
            {props.items.map(item => {
                return (
                    <li>{item.name}</li>
                );
            })}
        </ul>
    )
}
