import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from './redux/actions/api/users';
import { getCookies } from './helpers/cookies';
import { HeaderNavbar } from './components/HeaderNavbar/HeaderNavbar'
import { MainView } from './components/MainView/MainView';
import { AuthProvider } from './AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  // Automatically login user if there's JWT token saved in cookies
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const jwtToken = getCookies('jwt_token');
  //   jwtToken && dispatch(fetchUser());
  // });

  return (
    <AuthProvider>
      <HeaderNavbar />
      <MainView />
    </AuthProvider>
  )
}

export default App;