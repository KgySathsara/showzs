/* eslint-disable no-undef */
import React from 'react';
import { Form, Input, Button, Select, notification } from 'antd';
import axios from 'axios';
import './EditorAccount.css';

const { Option } = Select;

const EditorAccountForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log('Form values: ', values);
    // Make API call to create editor account
    // Example using Axios (make sure to install Axios if not already installed)
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post('/api/create-editor', values);
      notification.success({
        message: 'Account Created',
        description: 'The editor account has been successfully created.',
      });
    } catch (error) {
      notification.error({
        message: 'Account Creation Failed',
        description: 'There was an error creating the editor account.',
      });
    }
  };

  return (
    <section className='admin-upcoming-movies'>
      <h2>Account Create</h2>
      <Form
        form={form}
        name="editor_account"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input the username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input the email!', type: 'email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input the password!' }]}
        >
          <Input.Password />
        </Form.Item>

        {/* New Section */}
        <section className='additional-section'>

          <Form.Item
            name="category"
            label="Section"
            rules={[{ required: true, message: 'Please select the section' }]}
          >
            <Select placeholder='Select Category'>
              <Option value="3">Editor</Option>
              <Option value="2">Admin</Option>
            </Select>
          </Form.Item>
        </section>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default EditorAccountForm;
