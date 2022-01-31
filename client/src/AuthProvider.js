import { useEffect, createContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from './redux/actions/api/users';
import { getCookies } from './helpers/cookies';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const jwtToken = getCookies('jwt_token');
        jwtToken && dispatch(fetchUser());
    }, []);
    
    const { isFetched, error } = useSelector(({ api }) => api.users.fetchUser);

    // the conditional before children makes it possible to go to /home immediately after render
    return (
        <AuthContext.Provider value={isFetched}>
            {(isFetched || error.isError) && children}
        </AuthContext.Provider>);
};
