import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Typography, Card, notification } from 'antd';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CheckoutForm.css';
import { FaTimes } from 'react-icons/fa';

const { Title } = Typography;

function CountrySelector({ onChange }) {
    const [value, setValue] = useState('');
    const options = useMemo(() => countryList().getData(), []);

    const changeHandler = (value) => {
        setValue(value);
        onChange(value);
    };

    return <Select options={options} value={value} onChange={changeHandler} />;
}

const CheckoutForm = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [cartDetails, setCartDetails] = useState(null); // Track a single item (movie/event) in the cart
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie')
            .then(() => {
                axios.get('http://127.0.0.1:8000/api/current-user')
                    .then(response => {
                        const user = response.data.user;
                        if (user) {
                            form.setFieldsValue({
                                firstName: user.full_name.split(' ')[0] || '',
                                lastName: user.full_name.split(' ')[1] || '',
                                email: user.email || '',
                                mobileNumber: user.phone_number || '',
                                country: user.country || '',
                            });
                            setIsUserLoggedIn(true);
                        }
                    })
                    .catch(error => {
                        notification.error({
                            message: 'Error',
                            description: 'Failed to fetch user details. Please try again.',
                        });
                    });
            });
    }, [form]);

    const handleItemClick = (item) => {
        setCartDetails(item); // Update the cart with the selected movie or event
        setSelectedMovie(item); // Update the selected movie (for the popup)
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedMovie(null);
    };

    const closePopupAndNavigate = () => {
        setIsPopupOpen(false);
        setSelectedMovie(null);
        navigate('/Payment');
    };

    const handleSubmit = (values) => {
        if (!isUserLoggedIn) {
            notification.error({
                message: 'Login Required',
                description: 'Please login first to proceed with the checkout.',
            });
            return;
        }
        console.log('Form submitted:', values);
        navigate('/Payment');
    };

    return (
        <section className="checkout-container">
            <Title level={2} className="form-title">Checkout Form</Title>
            <Row gutter={24}>
                <Col span={16}>
                    <Card
                        title={<span className="card-title">Billing Details</span>}
                        bordered={false}
                        className="details-card"
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                            initialValues={{ remember: true }}
                        >
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[{ required: true, message: 'Please input your first name!' }]}
                            >
                                <Input placeholder="Enter your first name" className="input-field" />
                            </Form.Item>

                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[{ required: true, message: 'Please input your last name!' }]}
                            >
                                <Input placeholder="Enter your last name" className="input-field" />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                            >
                                <Input placeholder="Enter your email" className="input-field" />
                            </Form.Item>

                            <Form.Item
                                label="Mobile Number"
                                name="mobileNumber"
                                rules={[{ required: true, message: 'Please input your mobile number!' }]}
                            >
                                <Input placeholder="Enter your mobile number" className="input-field" />
                            </Form.Item>

                            <Form.Item
                                label="Country"
                                name="country"
                                rules={[{ required: true, message: 'Please select your country!' }]}
                            >
                                <CountrySelector onChange={(value) => form.setFieldsValue({ country: value.label })} />
                            </Form.Item>

                            <Form.Item name="saveInfo" valuePropName="checked">
                                <Checkbox>Save this information for next time</Checkbox>
                            </Form.Item>

                            <Button type="primary" htmlType="submit">
                                Continue to checkout
                            </Button>
                        </Form>
                    </Card>
                </Col>

                <Col span={8}>
                    <Card
                        title={<span className="card-title">Your Cart</span>}
                        bordered={false}
                        className="cart-card"
                    >
                        {cartDetails ? (
                            <div className="movie-container">
                                <div className="movie">
                                    {cartDetails.picture && (
                                        <img src={cartDetails.picture} alt={cartDetails.title} />
                                    )}
                                    <h2>{cartDetails.title}</h2>
                                    <p>{cartDetails.duration} min</p>
                                    <p>Category: {cartDetails.genre || cartDetails.category}</p>
                                    <p>Ticket Price: Rs.{cartDetails.price || cartDetails.ticketPrice}</p>
                                    <div className="buttons">
                                        <Button type="primary" onClick={() => handleItemClick(cartDetails)} className="buy-tickets">Buy Ticket</Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>No item selected.</p>
                        )}
                    </Card>
                </Col>
            </Row>

            {isPopupOpen && selectedMovie && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <button onClick={closePopup} className="close-icon">
                            <FaTimes />
                        </button>
                        <h2>{selectedMovie.title}</h2>
                        <p>Duration: {selectedMovie.duration} min</p>
                        <p>Category: {selectedMovie.genre}</p>
                        <p>Ticket Price: {selectedMovie.price}</p>
                        <div className="popup-actions">
                            <Button type="primary" onClick={closePopupAndNavigate} className="close-popup">Buy Ticket</Button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default CheckoutForm;
