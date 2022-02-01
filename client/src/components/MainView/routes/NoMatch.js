import { Link } from "react-router-dom";
import { Container, Alert } from "reactstrap";

export const NoMatch = () => {
    return (
        <Container>
            <Alert color="warning">
                The requested page was not found. You can browse to&nbsp;
                <Link to='home'>Home</Link>.
            </Alert>            
        </Container>
    );
};
