import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const RequireAuth = () => {
    const isLoggedIn = useSelector(({ api }) => api.users.login.isLoggedIn);

    if (!isLoggedIn) return <Navigate to="/login" />;
};
