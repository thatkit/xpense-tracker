import { Routes, Route } from 'react-router-dom';
import { Login } from './routes/Login';
import { Register } from './routes/Register';
import { ListBoard } from './routes/ListBoard/ListBoard';

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
