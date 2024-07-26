import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Select, Upload, DatePicker, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

const AdminEditNews = () => {
    const [form] = Form.useForm();
    const [newsList, setNewsList] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    const [isNewsSelected, setIsNewsSelected] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/news');
                setNewsList(response.data.news);
            } catch (error) {
                console.error('Failed to fetch news list:', error);
            }
        };

        fetchNews();
    }, []);

    const fetchNewsDetails = async (newsId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/news/${newsId}`);
            const newsData = response.data;
            const formData = {
                title: newsData.title,
                date: moment(newsData.date),
                duration: newsData.duration,
                category: newsData.category,
                description: newsData.description,
                price: newsData.price,
            };
            setSelectedNews(newsData);
            form.setFieldsValue(formData);
            setIsNewsSelected(true);
        } catch (error) {
            console.error('Failed to fetch news details:', error);
        }
    };

    const handleSubmit = async (values) => {
        if (selectedNews) {
            try {
                const formattedValues = {
                    ...values,
                    date: values.date ? moment(values.date).format('YYYY-MM-DD HH:mm:ss') : null,
                  };
                await axios.put(`http://127.0.0.1:8000/api/news/${selectedNews.id}`, formattedValues);
                message.success('News updated successfully');
                setIsNewsSelected(false);
            } catch (error) {
                console.error('Failed to update news:', error);
                message.error('Failed to update news');
            }
        }
    };

    const handleDelete = async () => {
        if (selectedNews) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/news/${selectedNews.id}`);
                message.success('News deleted successfully');
                setNewsList(newsList.filter(news => news.id !== selectedNews.id));
                setSelectedNews(null);
                form.resetFields();
                setIsNewsSelected(false);
            } catch (error) {
                console.error('Failed to delete news:', error);
                message.error('Failed to delete news');
            }
        }
    };

    const handleNewsSelect =(value) => {
        console.log('Selected news:', value);
        fetchNewsDetails(value);
    }

    return (
        <section className='admin-edit-news'>
            <h2>Edit News</h2>
            <div className="select-item-container">
                <Form.Item name="news" label="News" rules={[{ required: true, message: 'Please select a news item' }]}>
                    <Select onChange={handleNewsSelect}>
                        {newsList.map(news => (
                            <Option key={news.id} value={news.id}>{news.title}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </div>
            <div className="news-management-container">
                <div className='news-management-details'>
                    <Form form={form} layout="vertical" onFinish={handleSubmit} className="details-form">
                        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the news title' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select the date' }]}>
                            <DatePicker />
                        </Form.Item>
                        <Form.Item name="duration" label="Duration"  rules={[{ required: true, message: 'Please enter the duration' }]}>
                            <Input placeholder='e.g., 2h 30m'/>
                        </Form.Item>
                        <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select the category' }]}>
                            <Select placeholder='Select Category'>
                                <Option value="Action">Action</Option>
                                <Option value="Drama">Drama</Option>
                                <Option value="Comedy">Comedy</Option>
                                <Option value="Thriller">Thriller</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter the description' }]}>
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the price' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="image" label="Image or Video">
                            <Upload name="image" listType="picture">
                                <Button icon={<UploadOutlined />}>Upload Media</Button>
                            </Upload>
                        </Form.Item>
                        <div className="form-buttons">
                            <Button type="primary" className='btn-news-management' htmlType="submit" >
                                {isNewsSelected ? 'Submit News' : 'Edit News'}
                            </Button>
                            <Button type="primary" className='btn-news-management' htmlType="button" onClick={handleDelete}>Delete News</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default AdminEditNews;
