import React from 'react'
import background from '../../assest/banner.jpg'
import './login.css';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const handleSignin = () => {
    // Navigate to the register page
    navigate('/');
  };

  const handleRegister = () => {
    // Navigate to the register page
    navigate('/Register');
  };

  return (
    <section className='login'>
      <div className="overlay"></div>
      <img src={ background } alt="login-background"></img>
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
        <form>
          <div className="form-details">
            <input type="email" placeholder="Email address" className="input-field-login" />
            <input type="password" placeholder="Password" className="input-field-login" />
          </div>
          <div className="options">
            <label className="checkbox">
              <input type="checkbox" /> Remember me
            </label>
            <a href="/" className="forgot-password">Forgot password?</a>
          </div>
        </form>
        <button type="submit" className="signin-button"  onClick={handleSignin}>SIGN IN</button>
        <div className="register-link">
          Don't have an account? <button className="reg-btn" onClick={handleRegister}>Register</button>
        </div>
      </div>
    </section>
  )
}

export default Login
