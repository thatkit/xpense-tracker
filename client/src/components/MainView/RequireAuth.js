import { useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
    const { isLoggedIn, hasJwtToken } = useContext(AuthContext);

    if (hasJwtToken === null) return <Navigate to="/register" />;
    if (!isLoggedIn) return <Navigate to="/login" />;
    
    return children;
};