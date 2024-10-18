import React, { useState } from 'react';
import background from '../../assest/banner.jpg';
import './login.css';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { notification } from 'antd'; // Import Ant Design notification
import 'antd/dist/reset.css'; // Ensure Ant Design CSS is imported/reset
import { useGoogleLogin } from '@react-oauth/google';
import ForgotPassword from '../../containers/ForgotPassword/ForgotPassword'; // Import the ForgotPassword component

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isForgotPasswordVisible, setForgotPasswordVisible] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  // Open notification helper function
  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      openNotification('error', 'Login Error', 'Please correct the errors before submitting.');
      return;
    }
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
      
      const user = response.data.user;
      const role = response.data.role;         

      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('userRole', role);
  
      if (role === 'admin') {
        openNotification('success', 'Login Successful', 'Admin logged in successfully.');
        navigate('/admin');
      } else if (role === 'editor') {
        openNotification('success', 'Login Successful', 'Editor logged in successfully.');
        navigate('/admin');
      } else if (role === 'contect_owner') {
        openNotification('success', 'Login Successful', 'Content Owner logged in successfully.');
        navigate('/admin');
      } else {
        openNotification('success', 'Login Successful', 'Welcome back.');
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
      openNotification('error', 'Login Failed', errorMessage);
      setErrors({ general: errorMessage });
    }
  };

  const handleRegister = () => {
    navigate('/Register');
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/google-login', {
          token: tokenResponse.access_token,
        });
  
        const user = response.data.user; 
        const role = response.data.user_type;    

        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('userRole', role);
  
        openNotification('success', 'Google Sign-In', 'Google Sign-In successful!');
  
        if (role === 'admin' || role === 'contect_owner' || role === 'editor') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error(error);
        openNotification('error', 'Google Sign-In Failed', 'Google Sign-In failed!');
      }
    },
    onError: () => {
      openNotification('error', 'Google Sign-In Failed', 'Google Sign-In failed!');
    },
  });

  // Functions to open and close the ForgotPassword modal
  const showForgotPasswordModal = () => {
    setForgotPasswordVisible(true);
  };

  const closeForgotPasswordModal = () => {
    setForgotPasswordVisible(false);
  };

  return (
    <>
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
              {errors.email && <span className="error">{errors.email}</span>}
              <input
                type="password"
                placeholder="Password"
                className="input-field-login"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <span className="error">{errors.password}</span>}
              {errors.general && <span className="error">{errors.general}</span>}
            </div>
            <div className="options">
              <label className="checkbox">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" onClick={showForgotPasswordModal} className="forgot-password">Forgot password?</a>
            </div>
            <button type="submit" className="signin-button">
              SIGN IN
            </button>
          </form>
          <div className="register-link">
            Don't have an account? <button className="reg-btn" onClick={handleRegister}>Register</button>
          </div>
        </div>
      </section>

      {/* ForgotPassword Modal */}
      <ForgotPassword visible={isForgotPasswordVisible} onClose={closeForgotPasswordModal} />
    </>
  );
};

export default Login;
