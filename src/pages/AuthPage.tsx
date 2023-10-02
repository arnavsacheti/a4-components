import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);  // toggle between login and register
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // to display any error messages
  const navigate = useNavigate();

  const handleSubmit = () => {
    const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/register';

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          navigate('/');
        } else {
          setError(data.message);
        }
      });
  };

  return (
    <div>
      <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>{isLoginMode ? 'Login' : 'Register'}</button>
      <p>
        {isLoginMode ? 'New here?' : 'Already have an account?'}
        <button onClick={() => setIsLoginMode(!isLoginMode)}>
          {isLoginMode ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;
