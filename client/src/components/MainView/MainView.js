import { Routes, Route } from 'react-router-dom';
import { Login } from './routes/Login';
import { Register } from './routes/Register';
import { ListBoard } from './routes/ListBoard/ListBoard';
import { Home } from './routes/Home/Home';
import { RequireAuth } from './RequireAuth';

export const MainView = () => {
  
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Private (protected) routes */}
      <Route 
        path="/home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/:listId"
        element={
          <RequireAuth>
            <ListBoard />
          </RequireAuth>
        }
      />
    </Routes>
  )
}
