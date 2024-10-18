import React, { useState } from 'react';
import { Modal, Input, Button, notification } from 'antd';
import axios from 'axios';

const ForgotPassword = ({ visible, onClose }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/password-reset/request', { email });
      notification.success({ message: 'OTP sent to your email!' });
      setIsOtpSent(true);
    } catch (error) {
      notification.error({ message: 'Failed to send OTP. Please try again.' });
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      notification.error({ message: 'Passwords do not match!' });
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/password-reset/verify', { email, otp, newPassword });
      notification.success({ message: 'Password reset successfully!' });
      onClose(); // Close the modal
    } catch (error) {
      notification.error({ message: 'Failed to reset password. Please try again.' });
    }
  };

  return (
    <Modal title="Forgot Password" visible={visible} onCancel={onClose} footer={null}>
      {!isOtpSent ? (
        <>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="primary" onClick={handleSendOtp} style={{ marginTop: '1rem' }}>
            Send OTP
          </Button>
        </>
      ) : (
        <>
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ marginTop: '1rem' }}
          />
          <Input.Password
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ marginTop: '1rem' }}
          />
          <Input.Password
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ marginTop: '1rem' }}
          />
          <Button type="primary" onClick={handleResetPassword} style={{ marginTop: '1rem' }}>
            Save
          </Button>
          <Button onClick={onClose} style={{ marginTop: '1rem' }}>
            Cancel
          </Button>
        </>
      )}
    </Modal>
  );
};

export default ForgotPassword;
