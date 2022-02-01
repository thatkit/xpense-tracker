import { useEffect, createContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from './redux/actions/api/users';
import { getCookies } from './helpers/cookies';

// Authentication Context
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();

    const { isLoggedIn } = useSelector(({ api }) => api.users.login);
    const { isFetched, error } = useSelector(({ api }) => api.users.fetchUser);
    const hasJwtToken = getCookies('jwt_token');
    
    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch, isLoggedIn]);   

    // the conditional below children makes it possible to go to /home immediately after render
    return (
        <AuthContext.Provider value={{
            isLoggedIn: isFetched,
            hasJwtToken
        }}>
            {(isFetched || error.isError) && children}
        </AuthContext.Provider>
    );
};
