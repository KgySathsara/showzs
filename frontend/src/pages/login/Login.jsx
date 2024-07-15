import React, { useState } from 'react';
import background from '../../assest/banner.jpg';
import './login.css';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
      console.log(response.data);
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Login failed.');
    }
  };

  const handleRegister = () => {
    navigate('/register');
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
        <form onSubmit={handleSubmit}>
          <div className="form-details">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="input-field-login"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input-field-login"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="options">
            <label className="checkbox">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              /> Remember me
            </label>
            <a href="/" className="forgot-password">Forgot password?</a>
          </div>
          <button type="submit" className="signin-button">SIGN IN</button>
        </form>
        <div className="register-link">
          Don't have an account? <button className="reg-btn" onClick={handleRegister}>Register</button>
        </div>
      </div>
    </section>
  );
};

export default Login;
