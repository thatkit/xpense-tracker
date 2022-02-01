import { useEffect, createContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from './redux/actions/api/users';
import { getCookies } from './helpers/cookies';

// Authentication Context
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();

    const { isFetched, error } = useSelector(({ api }) => api.users.fetchUser);
    const hasJwtToken = Boolean(getCookies('jwt_token'));
    
    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);   

    // the conditional before children makes it possible to go to /home immediately after render
    return (
        <AuthContext.Provider value={{
            isLoggedIn: isFetched,
            hasJwtToken
        }}>
            {(isFetched || error.isError) && children}
        </AuthContext.Provider>
    );
};
