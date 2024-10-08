import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PasswordResetPage = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1 for requesting reset, Step 2 for OTP verification and password reset
  const navigate = useNavigate();

  const handleRequestReset = async () => {
    try {
      await axios.post('http://showz-backend.socialgear.co.uk/api/passwordreset/request', { phone_number: phone });
      message.success('OTP has been sent to your phone');
      setStep(2); // Move to the next step
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error('Error sending OTP');
      }
    }
  };

  const handleResetPassword = async () => {
    try {
      await axios.post('http://showz-backend.socialgear.co.uk/api/passwordreset/verify', { phone_number: phone, otp, newPassword, newPassword_confirmation: confirmPassword });
      message.success('Password reset successful');
      navigate('/'); // Redirect to the main page
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error('Error resetting password');
      }
    }
  };

  return (
    <section className='admin-upcoming-movies'>
      <h2>Password Reset</h2>
      <div>
        {step === 1 ? (
          <Form onFinish={handleRequestReset}>
            <Form.Item label="Phone Number" name="phone" rules={[{ required: true, message: 'Please input your phone number!' }]}>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Form onFinish={handleResetPassword}>
            <Form.Item label="OTP" name="otp" rules={[{ required: true, message: 'Please input the OTP!' }]}>
              <Input value={otp} onChange={(e) => setOtp(e.target.value)} />
            </Form.Item>
            <Form.Item label="New Password" name="newPassword" rules={[{ required: true, message: 'Please input your new password!' }]}>
              <Input.Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </section>
  );
};

export default PasswordResetPage;
