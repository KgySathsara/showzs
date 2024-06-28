import React from 'react';
import './register.css';
import background from '../../assest/banner.jpg';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const handleSignup = () => {
    // Navigate to the register page
    navigate('/Login');
  };

  return (
    <section className="registration">
      <img src={background} alt="register-background" />
      <div className="overlay"></div>
      <div className="registration-box">
      <h2 className="registration-heading">Registration</h2>
        <div className='signin-container'>
          <button className="google-signin">
            <FcGoogle className="icon" /> Sign in with Google
          </button>
        </div>
        <div className="separator">
          <span>or</span>
        </div>
        <form>
          <div className="form-row">
            <input type="text" placeholder="Full name" className="input-field" />
            <input type="email" placeholder="Email address" className="input-field" />
          </div>
          <div className="form-row">
            <input type="password" placeholder="Password" className="input-field" />
            <input type="password" placeholder="Confirm password" className="input-field" />
          </div>
          <div className="form-row">
          <input type="tel" placeholder="Phone number" className="input-field1" />
          </div>
          <div className="terms-container">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              I agree to the <a href="/">terms</a> of use and <a href="/">privacy policy</a>
            </label>
          </div>
        </form>
      </div>
      <button type="submit" className="submit-button"  onClick={handleSignup}>SIGN UP</button>
    </section>
  );
};

export default Register;
