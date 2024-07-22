import React, { useState } from 'react';
import background from '../../assest/banner.jpg';
import './login.css';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setErrors({});
    
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post('http://localhost:8000/api/login', { email, password });
      
      // Show success toast
      toast.success('User logged in successfully');
      navigate('/'); // Redirect after successful login
    } catch (error) {
      let errorMessage = 'An unexpected error occurred.';
      
      if (error.response) {
        if (error.response.data.errors) {
          // Handle validation errors
          setErrors(error.response.data.errors);
        } else if (error.response.data.message) {
          // Handle specific error messages
          errorMessage = error.response.data.message;
        }
      } else {
        // Handle network errors
        errorMessage = 'Network error. Please try again.';
      }
      
      // Display the error message
      toast.error(errorMessage);
      setErrors({ general: errorMessage });
    }
  };

  const handleRegister = () => {
    navigate('/Register');
  };

  return (
    <section className='login'>
      <div className="overlay"></div>
      <img src={background} alt="login-background" />
      <div className="login-box">
        <h2 className="login-heading">Login</h2>
        <div className="login-container">
          <button className="google-login">
            <FcGoogle className="icon" /> Sign in with Google
          </button>
        </div>
        <div className="separator">
          <span>or</span>
        </div>
        <form onSubmit={handleSignin}>
          <div className="form-details">
            <input
              type="email"
              placeholder="Email address"
              className="input-field-login"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error">{errors.email[0]}</span>}
            <input
              type="password"
              placeholder="Password"
              className="input-field-login"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="error">{errors.password[0]}</span>}
            {errors.general && <span className="error">{errors.general}</span>}
          </div>
          <div className="options">
            <label className="checkbox">
              <input type="checkbox" /> Remember me
            </label>
            <a href="/" className="forgot-password">Forgot password?</a>
          </div>
          <button type="submit" className="signin-button">
            SIGN IN
          </button>
        </form>
        <div className="register-link">
          Don't have an account? <button className="reg-btn" onClick={handleRegister}>Register</button>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;
