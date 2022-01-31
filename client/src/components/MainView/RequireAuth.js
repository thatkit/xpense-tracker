import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCookies } from "../../helpers/cookies";
import { fetchUser } from "../../redux/actions/api/users";

export const RequireAuth = ({ children }) => {
    const isLoggedIn = useSelector(({ api }) => api.users.login.isLoggedIn);
    // const isFetchingUser = useSelector(({ api }) => api.users.fetchUser.fetching);
    const isCookie = Boolean(getCookies('jwt_token'));
     
    if (!isCookie) return <Navigate to="/register" />;

    
    if (!isLoggedIn) return <Navigate to="/login" />;
    
    return children;
};
