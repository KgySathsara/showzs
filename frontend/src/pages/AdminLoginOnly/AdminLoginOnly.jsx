import React from 'react'
import background from '../../assest/banner.jpg';
import './AdminLoginOnly.css';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';

const AdminLoginOnly = () => {

  const navigate = useNavigate();

  const handleSignin = () => {
    // Navigate to the register page
    navigate('/');
  };

  // eslint-disable-next-line no-unused-vars
  const handleRegister = () => {
    // Navigate to the register page
    navigate('/Register');
  };

  return (
    <section className='login'>
      <div className="overlay"></div>
      <img src={ background } alt="login-background"></img>
      <div className="login-box">
      <h2 style={{ textAlign: 'center' }} className="login-heading">Login</h2>
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
      </div>
    </section>
  )
}

export default AdminLoginOnly;