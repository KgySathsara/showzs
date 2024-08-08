import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import './ContactForm.css';

const { TextArea } = Input;

export default function ContactForm() {
  const [form] = Form.useForm();  // Destructure form instance from Form.useForm

  const onFinish = (values) => {
    axios.post('http://127.0.0.1:8000/api/contact', values)
      .then(response => {
        console.log('Success:', response.data);
        message.success('Message sent successfully');
        form.resetFields(); 
      })
      .catch(error => {
        console.error('Error Message Sent:', error);
        message.error('Failed to send message');
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <section className='contact-form'>
      <h2>Facing any issues? Have feedback to share? We are here to help!</h2>
      <Form
        form={form}  // Attach form instance to the form
        name="contact"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input placeholder='Name' />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
        >
          <Input placeholder='E Mail ID' />
        </Form.Item>
        <Form.Item
          name="subject"
          rules={[{ required: true, message: 'Please input the subject!' }]}
        >
          <Input placeholder='Subject' />
        </Form.Item>
        <Form.Item
          name="message"
          rules={[{ required: true, message: 'Please input your message!' }]}
          className="ant-form-item-textarea"
        >
          <TextArea placeholder='Type your message' rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send Message
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}
