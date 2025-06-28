import './App.css';
import { useAuth } from './auth/AuthContext';
import Dashboard from '@components/pages/Dashboard/Dashboard';
import Login from '@components/pages/Login/Login';

export default function App() {
    const { isAuthenticated } = useAuth();

    return (
        <div className='min-h-dvh flex justify-center'>
            {!isAuthenticated && <Login />}
            {isAuthenticated && <Dashboard />}
        </div>
    );
}
