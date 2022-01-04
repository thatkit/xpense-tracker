export const Overview = (props) => {
    return (
        <ul>
            <li>Total budget: {props.totalBudget} RUB</li>
            <li>Total costs: {props.totalCosts} RUB</li>
            <li>Remains: {props.remainder} RUB</li>
        </ul>
    )
}
