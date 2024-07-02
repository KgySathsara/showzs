import React from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './movieManagement.css';

const AddMovieManagement = () => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        console.log('Received values:', values);
        form.resetFields();
    };

    const handleUpload = ({ fileList }) => {
        return fileList;
    };

    return (
        <div className="admin-movie-container">
            <h2>Add New Movie</h2>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the movie title' }]} >
                    <Input />
                </Form.Item>
                <Form.Item name="genre" label="Genre" rules={[{ required: true, message: 'Please enter the movie genre' }]} >
                    <Input />
                </Form.Item>
                <Form.Item name="director" label="Director" rules={[{ required: true, message: 'Please enter the movie director' }]} >
                    <Input />
                </Form.Item>
                <Form.Item name="duration" label="Duration (in minutes)" rules={[{ required: true, message: 'Please enter the movie duration' }]} >
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="picture" label="Picture" valuePropName="fileList" getValueFromEvent={handleUpload} >
                    <Upload name="picture" listType="picture" beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit"> Add Movie </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddMovieManagement;
