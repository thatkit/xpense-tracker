import { HeaderNavbar } from './components/HeaderNavbar/HeaderNavbar'
import { MainView } from './components/MainView/MainView';
import { AuthProvider } from './AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <AuthProvider>
      <HeaderNavbar />
      <MainView />
    </AuthProvider>
  )
}

export default App;