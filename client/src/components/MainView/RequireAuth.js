import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCookies } from "../../helpers/cookies";

export const RequireAuth = () => {
    const isLoggedIn = useSelector(({ api }) => api.users.login.isLoggedIn);
    const isCookie = Boolean(getCookies('jwt_token'));
    console.log(isLoggedIn, isCookie);
    if (!isCookie) return <Navigate to="/register" />;
    if (!isLoggedIn) return <Navigate to="/login" />;
};
