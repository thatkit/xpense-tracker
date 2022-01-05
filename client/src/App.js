import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { currentUserSlice } from './redux/slices/currentUserSlice';
import { getCookies } from './helpers/cookies';
import { HeaderNavbar } from './components/HeaderNavbar'
import { MainView } from './components/MainView'

const App = () => {
  // Automatically login user if there's JWT token saved in cookies
  const dispatch = useDispatch();

  useEffect(() => {
    const jwtToken = getCookies('jwt_token');
    jwtToken && dispatch(currentUserSlice.actions.authUser(jwtToken));
  });

  return (
    <>
      <HeaderNavbar />
      <MainView />
    </>
  )
}

export default App;