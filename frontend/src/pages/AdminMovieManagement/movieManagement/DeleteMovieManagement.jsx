import React from 'react';
import { Form, Input, Button } from 'antd';
import './movieManagement.css';

const DeleteMovieManagement = () => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        console.log('Movie to delete:', values.title);
        form.resetFields();
    };

    return (
        <div className="admin-movie-container">
            <h2>Delete Movie</h2>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the movie title' }]} >
                    <Input placeholder="Title" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit"> Delete Movie </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default DeleteMovieManagement;
