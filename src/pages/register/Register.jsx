import React, { useState } from 'react';
import './register.css';
import background from '../../assest/banner.jpg';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { notification } from 'antd'; // Import Ant Design's notification component

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone_number: '',
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    
    if (!formData.full_name) {
      newErrors.full_name = 'Full name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.full_name)) {
      newErrors.full_name = 'Full name should contain only letters and spaces';
    }

    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (formData.password_confirmation !== formData.password) {
      newErrors.password_confirmation = 'Passwords do not match';
    }

    if (!formData.phone_number) {
      newErrors.phone_number = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone_number)) {
      newErrors.phone_number = 'Phone number must be a valid 10-digit number';
    }

    if (!formData.terms) {
      newErrors.terms = 'You must agree to the terms and privacy policy';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Object.keys(newErrors).forEach(key => {
        notification.error({
          message: newErrors[key],
          placement: 'topRight',
        });
      });
      return;
    }
  
    try {
      await axios.post('http://127.0.0.1:8000/api/register', formData);
      notification.success({
        message: 'Registration successful!',
        placement: 'topRight',
      });
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        
        // Check if the email is already taken
        if (serverErrors.email) {
          notification.error({
            message: 'Email already taken',
            placement: 'topRight',
          });
        } else {
          notification.error({
            message: 'Registration failed!',
            placement: 'topRight',
          });
        }
      } else {
        notification.error({
          message: 'Registration failed!',
          placement: 'topRight',
        });
      }
    }
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

        notification.success({
          message: 'Google Sign-In successful!',
          placement: 'topRight',
        });
        navigate('/');
      } catch (error) {
        notification.error({
          message: 'Google Sign-In failed!',
          placement: 'topRight',
        });
      }
    },
    onError: () => {
      notification.error({
        message: 'Google Sign-In failed!',
        placement: 'topRight',
      });
    },
  });

  return (
    <section className="registration">
      <img src={background} alt="register-background" />
      <div className="overlay"></div>
      <div className="registration-box">
        <h2 style={{ textAlign: 'center' }} className="registration-heading">Registration</h2>

        <div className='signin-container'>
          <button className="google-signin" onClick={googleLogin}>
            <FcGoogle className="icon" /> Sign in with Google
          </button>
        </div>
        <div className="separator">
          <span>or</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input 
              type="text" 
              name="full_name" 
              placeholder="Full name" 
              className="input-field" 
              value={formData.full_name} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email address" 
              className="input-field" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-row">
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              className="input-field" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="password" 
              name="password_confirmation" 
              placeholder="Confirm password" 
              className="input-field" 
              value={formData.password_confirmation} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-row">
            <input 
              type="tel" 
              name="phone_number" 
              placeholder="Phone number" 
              className="input-field1" 
              value={formData.phone_number} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="terms-container">
            <input 
              type="checkbox" 
              id="terms" 
              name="terms" 
              checked={formData.terms} 
              onChange={handleChange} 
            />
            <label htmlFor="terms">
              I agree to the <a href="/TermsAndConditions">terms</a> of use and <a href="/PrivacyPolicy">privacy policy</a>
            </label>
            <div className='signup-button'>
              <label htmlFor="terms">
                Already have an account ?<a href="/Login">Sign in</a>
              </label>
            </div>
          </div>

          <button type="submit" className="submit-button">SIGN UP</button>
        </form>
      </div>
    </section>
  );
};

export default Register;
