import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import ProtectedRoutes from './ProtectedRoutes';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<AuthPage />} />
                <Route path="/*" element={<ProtectedRoutes />} />
            </Routes>
        </Router>
    );
}

export default App;
