import React, { useState } from 'react';
import { Form, Input, Button, notification, Radio } from 'antd';
import axios from 'axios';
import './EditorAccount.css';

const PasswordResetForm = () => {
  const [form] = Form.useForm();
  const [resetOption, setResetOption] = useState('email');
  const [otpSent, setOtpSent] = useState(false);

  const onFinish = async (values) => {
    console.log('Form values: ', values);
    // Make API call to reset password
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post('http://127.0.0.1:8000/api/reset-password', values);
      notification.success({
        message: 'Password Reset',
        description: 'Your password has been successfully reset.',
      });
      form.resetFields();
    } catch (error) {
      notification.error({
        message: 'Password Reset Failed',
        description: 'There was an error resetting your password.',
      });
    }
  };

  const sendOtp = async (values) => {
    console.log('Phone number: ', values.phone);
    // Make API call to send OTP
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post('http://127.0.0.1:8000/api/send-otp', { phone: values.phone });
      setOtpSent(true);
      notification.success({
        message: 'OTP Sent',
        description: 'The OTP has been sent to your phone number.',
      });
    } catch (error) {
      notification.error({
        message: 'OTP Sending Failed',
        description: 'There was an error sending the OTP.',
      });
    }
  };

  const handlePhoneFinish = async (values) => {
    await sendOtp(values);
  };

  return (
    <section className='admin-upcoming-movies'>
      <h2>Password Reset</h2>
      <Radio.Group 
        value={resetOption} 
        onChange={(e) => {
          setResetOption(e.target.value);
          setOtpSent(false);
          form.resetFields();
        }} 
        style={{ marginBottom: 20 }}
      >
        <Radio.Button value="email">Email</Radio.Button>
        <Radio.Button value="phone">Phone Number</Radio.Button>
      </Radio.Group>
      <Form
        form={form}
        name="password_reset"
        onFinish={resetOption === 'phone' && !otpSent ? handlePhoneFinish : onFinish}
        layout="vertical"
      >
        {resetOption === 'email' && (
          <>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="new_password"
              label="New Password"
              rules={[{ required: true, message: 'Please input your new password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm_password"
              label="Confirm New Password"
              dependencies={['new_password']}
              rules={[
                { required: true, message: 'Please confirm your new password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('new_password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </>
        )}
        {resetOption === 'phone' && !otpSent && (
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input />
          </Form.Item>
        )}
        {resetOption === 'phone' && otpSent && (
          <>
            <Form.Item
              name="otp"
              label="OTP"
              rules={[{ required: true, message: 'Please input the OTP!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="new_password"
              label="New Password"
              rules={[{ required: true, message: 'Please input your new password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm_password"
              label="Confirm New Password"
              dependencies={['new_password']}
              rules={[
                { required: true, message: 'Please confirm your new password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('new_password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {resetOption === 'phone' && !otpSent ? 'Send OTP' : 'Reset Password'}
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default PasswordResetForm;
