import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from './Admin-Dashboard/LoginPage';
import { AuthProvider, useAuth } from './context/UserContext';
import Dashboard from './Admin-Dashboard/Dashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
export default App;

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to='/' />;
  return children;
}