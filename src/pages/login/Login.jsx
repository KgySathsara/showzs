import React, { useState } from 'react';
import background from '../../assest/banner.jpg';
import './login.css';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setErrors({});
    
    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password });

      toast.success('User logged in successfully');
      
      const role = response.data.role;
      sessionStorage.setItem('userRole', role);

      if (role === 'admin' || role === 'contect_owner' || role === 'editor') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      let errorMessage = 'An unexpected error occurred.';
      
      if (error.response) {
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else {
        errorMessage = 'Network error. Please try again.';
      }
      toast.error(errorMessage);
      setErrors({ general: errorMessage });
    }
  };

  const handleRegister = () => {
    navigate('/Register');
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Google Token Response:', tokenResponse);
  
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/google-login', {
          token: tokenResponse.access_token,
        });
  
        console.log('Server Response:', response);
  
        toast.success('Google Sign-In successful!');
        const role = response.data.user.user_type;
        sessionStorage.setItem('userRole', role);

        if (role === 'admin' || role === 'contect_owner' || role === 'editor') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error(error);
        toast.error('Google Sign-In failed!');
      }
    },
    onError: () => {
      toast.error('Google Sign-In failed!');
    },
  });

  return (
    <section className='login'>
      <div className="overlay"></div>
      <img src={background} alt="login-background" />
      <div className="login-box">
        <h2 style={{ textAlign: 'center' }} className="login-heading">Login</h2>
        <div className="login-container">
          <button className="google-login" onClick={googleLogin}>
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
