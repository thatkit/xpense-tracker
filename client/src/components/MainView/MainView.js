import { Routes, Route } from 'react-router-dom';
import { Login } from './routes/Login';
import { Register } from './routes/Register';
import { ListBoard } from './routes/ListBoard/ListBoard';
import { Home } from './routes/Home/Home';
import { NoMatch } from './routes/NoMatch';
import { RequireAuth } from './RequireAuth';

export const MainView = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Private (protected) routes */}
      <Route 
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route 
        path="/home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/lists/:listId"
        element={
          <RequireAuth>
            <ListBoard />
          </RequireAuth>
        }
      />
      <Route
        path="*"
        element={<NoMatch />}
      />
    </Routes>
  )
}
