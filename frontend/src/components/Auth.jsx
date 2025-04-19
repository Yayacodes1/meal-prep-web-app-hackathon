import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  // State variables to store form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  
  // Get authentication functions from our AuthContext
  const { signup, login } = useAuth();
  const navigate = useNavigate();

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault(); // Prevent the form from refreshing the page
    
    try {
      setError(''); // Clear any previous errors
      
      if (isLogin) {
        // If we're in login mode
        await login(email, password);
      } else {
        // If we're in signup mode
        await signup(email, password);
      }
      
      // If successful, navigate to the dashboard
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      
      {/* Show error message if there is one */}
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      
      {/* Toggle between Login and Sign Up */}
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="toggle-button"
      >
        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
      </button>
    </div>
  );
} 