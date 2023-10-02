import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainPage from './pages/MainPage';

const ProtectedRoutes: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/check-auth')
            .then(response => {
                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    navigate('/login');  // Redirect to login if not authenticated.
                }
            });
    }, [navigate]);

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
        </Routes>
    );
}

export default ProtectedRoutes;
