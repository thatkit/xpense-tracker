import { useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import { Navigate } from "react-router-dom";
import { getCookies } from "../../helpers/cookies";

export const RequireAuth = ({ children }) => {
    const isLoggedIn = useContext(AuthContext);
    const isCookie = Boolean(getCookies('jwt_token'));
    
    if (!isCookie) return <Navigate to="/register" />;
    if (!isLoggedIn) return <Navigate to="/login" />;
    
    return children;
};
