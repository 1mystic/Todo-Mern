import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';
import MoodPage from './pages/MoodPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background font-sans">
        <Header />
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/tasks" element={<PrivateRoute><TasksPage /></PrivateRoute>} />
            <Route path="/mood" element={<PrivateRoute><MoodPage /></PrivateRoute>} />
          </Routes>
        </MainLayout>
      </div>
    </AuthProvider>
  );
}

export default App; 