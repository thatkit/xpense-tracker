import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { HomePage2 } from './pages/HomePage2';

export const MainView = (props) => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/2" element={<HomePage2 />} />
       
    </Routes>
  )
}
