/* eslint-disable no-undef */
import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import './EditorAccount.css';

const PasswordResetForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log('Form values: ', values);
    // Make API call to reset password
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post('/api/reset-password', values);
      notification.success({
        message: 'Password Reset',
        description: 'Your password has been successfully reset.',
      });
    } catch (error) {
      notification.error({
        message: 'Password Reset Failed',
        description: 'There was an error resetting your password.',
      });
    }
  };

  return (
    <section className='admin-upcoming-movies'>
      <h2>Password Reset</h2>
      <Form
        form={form}
        name="password_reset"
        onFinish={onFinish}
        layout="vertical"
      >
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default PasswordResetForm;
