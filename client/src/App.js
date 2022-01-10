import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from './redux/slices/apiSlice';
import { getCookies } from './helpers/cookies';
import { HeaderNavbar } from './components/HeaderNavbar'
import { MainView } from './components/MainView'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  // Automatically login user if there's JWT token saved in cookies
  const dispatch = useDispatch();

  useEffect(() => {
    const jwtToken = getCookies('jwt_token');
    jwtToken && dispatch(fetchUser());
  });

  return (
    <>
      <HeaderNavbar />
      <MainView />
    </>
  )
}

export default App;