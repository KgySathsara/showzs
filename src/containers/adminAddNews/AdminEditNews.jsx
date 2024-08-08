import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Select, Upload, DatePicker, message, Modal, Spin, Progress } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

const AdminEditNews = () => {
    const [form] = Form.useForm();
    const [newsList, setNewsList] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    const [isNewsSelected, setIsNewsSelected] = useState(false);
    const [progressModalVisible, setProgressModalVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [modalAction, setModalAction] = useState('');
    const [trailerList, setTrailerList] = useState([]);

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

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('file_name', file.name);
        formData.append('file_type', file.type);
        formData.append('object_type', 'movieTrailers');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/s3-upload-url', formData);
            const { url } = response.data;

            await axios.put(url, file, {
                headers: {
                    'Content-Type': file.type,
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                }
            });

            return url.split('?')[0];
        } catch (error) {
            console.error('Failed to upload file:', error);
            message.error('Failed to upload file');
            throw error;
        }
    };

    const handleSubmit = async (values) => {
        setModalAction('updating');
        setProgressModalVisible(true);
        setProgress(0);
        if (selectedNews) {
            try {
                const formattedValues = {
                    ...values,
                    date: values.date ? moment(values.date).format('YYYY-MM-DD HH:mm:ss') : null,
                };

                if (trailerList.length > 0) {
                    const trailerFile = trailerList[0].originFileObj;

                    // Check for correct file type
                    if (!trailerFile.type.startsWith('video/')) {
                        message.error('Please upload only video files.');
                        return;
                    }

                    formattedValues.trailer = await handleUpload(trailerFile);
                }

                await axios.put(`http://127.0.0.1:8000/api/news/${selectedNews.id}`, formattedValues, {
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setProgress(percentCompleted);
                    }
                });

                message.success('News updated successfully');
                setIsNewsSelected(false);
                setProgressModalVisible(false);
            } catch (error) {
                console.error('Failed to update news:', error);
                message.error('Failed to update news');
                setProgressModalVisible(false);
            }
        }
    };

    const handleDelete = async () => {
        setModalAction('deleting');
        setProgressModalVisible(true);
        setProgress(0);
        if (selectedNews) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/news/${selectedNews.id}`, {
                    onDownloadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setProgress(percentCompleted);
                    }
                });

                if (selectedNews.trailer) {
                    await axios.post('http://127.0.0.1:8000/api/s3-delete-object', {
                        object_type: 'movieTrailers',
                        file_name: selectedNews.trailer,
                    });
                }

                message.success('News deleted successfully');
                setNewsList(newsList.filter(news => news.id !== selectedNews.id));
                setSelectedNews(null);
                form.resetFields();
                setIsNewsSelected(false);
                setProgressModalVisible(false);
            } catch (error) {
                console.error('Failed to delete news:', error);
                message.error('Failed to delete news');
                setProgressModalVisible(false);
            }
        }
    };

    const handleNewsSelect = (value) => {
        fetchNewsDetails(value);
    };

    const handleFileChange = ({ fileList }) => {
        const isVideo = fileList.every(file => file.type.startsWith('video/'));
        if (isVideo) {
            setTrailerList(fileList);
        } else {
            message.error('Please upload only video files.');
            setTrailerList([]);
        }
    };

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
                        <Form.Item name="duration" label="Duration" rules={[{ required: true, message: 'Please enter the duration' }]}>
                            <Input placeholder='e.g., 2h 30m' />
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
                        <Form.Item name="trailer" label="Trailer">
                            <Upload name="trailer" listType="picture" beforeUpload={() => false}
                                onChange={handleFileChange}>
                                <Button icon={<UploadOutlined />}>Upload Media</Button>
                            </Upload>
                        </Form.Item>
                        <div className="form-buttons">
                            <Button type="primary" className='btn-news-management' htmlType="submit">
                                {isNewsSelected ? 'Submit News' : 'Edit News'}
                            </Button>
                            <Button type="primary" className='btn-news-management' htmlType="button" onClick={handleDelete}>Delete News</Button>
                        </div>
                    </Form>
                </div>
            </div>
            <Modal
                visible={progressModalVisible}
                onCancel={() => setProgressModalVisible(false)}
                footer={null}
                className="progress-modal"
                closable={false}
                maskClosable={false}
            >
                <Spin
                    indicator={
                        <LoadingOutlined
                            style={{
                                fontSize: 48,
                            }}
                            spin
                        />
                    }
                />
                <Progress percent={progress} style={{ marginTop: '20px' }} />
                <div className="progress-modal-text">
                    Please wait, do not close the window
                    <br />
                    {modalAction === 'updating' ? 'News is updating...' : 'News is deleting...'}
                </div>
            </Modal>
        </section>
    );
};

export default AdminEditNews;
