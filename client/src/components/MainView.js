import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ListBoard } from './pages/ListBoard';

export const MainView = (props) => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Private (protected) routes */}
      <Route path="/:listId" element={<ListBoard />} />
    </Routes>
  )
}
