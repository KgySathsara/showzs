import React from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './movieView.css';

const MovieView = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log('Received values:', values);
    form.resetFields();
    navigate('/WatchMovie');
  };

  return (
    <section className='movie-view'>
      <div className='movie-view-container'>
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="details-form">
          <h2>Enter The Code Here</h2>
          <Form.Item name="title" rules={[{ required: true, message: 'Please enter the code' }]}>
            <Input placeholder='Please Enter The Code Here '/>
          </Form.Item>
          <div className="movie-view-btn">
            <Form.Item>
              <Button type="primary" onClick={() => form.resetFields()}>Clear</Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </section>
  );
}

export default MovieView;
