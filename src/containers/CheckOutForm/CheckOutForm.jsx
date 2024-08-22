import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Typography, Card, notification } from 'antd';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import axios from 'axios';
import './CheckoutForm.css';

const { Title } = Typography;

function CountrySelector({ onChange, value }) {
    const options = useMemo(() => countryList().getData(), []);

    const changeHandler = (selectedOption) => {
        onChange(selectedOption);
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
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [cartDetails, setCartDetails] = useState(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            form.setFieldsValue({
                name: user.full_name || '',
                email: user.email || '',
                mobileNumber: user.phone_number || '',
                country: { label: user.country, value: user.country } || '',
            });
            setIsUserLoggedIn(true);
        }

        const storedSelectedItem = localStorage.getItem('selectedItem');
        const storedSelectedEvent = localStorage.getItem('selectedEvent');

        const cartDetails = storedSelectedEvent ? JSON.parse(storedSelectedEvent) : JSON.parse(storedSelectedItem);
        if (cartDetails) {
            setCartDetails(cartDetails);
        }
    }, [form]);

    const handleSubmit = async (values) => {
        if (!isUserLoggedIn) {
            notification.error({
                message: 'Login Required',
                description: 'Please login first to proceed with the checkout.',
            });
            return;
        }

        const purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || [];
        if (purchasedItems.includes(cartDetails.id)) {
            notification.error({
                message: 'Duplicate Purchase',
                description: 'You have already purchased this item.',
            });
            return;
        }

        const otherOnePayParams = {
            merchantId: 'YOUR_MERCHANT_ID',
            merchantSecret: 'YOUR_MERCHANT_SECRET',
        };

        try {
            await axios.post('http://127.0.0.1:8000/api/checkout', {
                name: values.name,
                email: values.email,
                mobileNumber: values.mobileNumber,
                country: values.country.label,
                itemId: cartDetails.id,
            });

            const paymentResponse = await axios.post('https://merchant-api-live-v2.onepay.lk/api/ipg/gateway', {
                amount: cartDetails.price || cartDetails.ticketPrice,
                currency: 'INR',
                description: cartDetails.title,
                returnUrl: 'http://your-website.com/payment-success',
                cancelUrl: 'http://your-website.com/payment-cancel',
                ...otherOnePayParams,
            });

            if (paymentResponse.data.paymentUrl) {
                window.location.href = paymentResponse.data.paymentUrl;
            } else {
                notification.error({
                    message: 'Payment Error',
                    description: 'Unable to initiate payment. Please try again.',
                });
            }
        } catch (error) {
            console.error('There was an error submitting the form or initiating payment!', error);
            notification.error({
                message: 'Error',
                description: 'There was an error submitting your data or initiating payment.',
            });
        }
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
                                label="User Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your user name!' }]}
                            >
                                <Input placeholder="Enter your user name" className="input-field" />
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
                                <CountrySelector
                                    value={form.getFieldValue('country')}
                                    onChange={(value) => form.setFieldsValue({ country: value })}
                                />
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
                                    <h3> {cartDetails.title}</h3>
                                    <p>Director: {cartDetails.director || 'N/A'}</p>
                                    <p>Description: {cartDetails.description || 'N/A'}</p>
                                    <p>Category: {cartDetails.genre || cartDetails.category || 'N/A'}</p>
                                    <p>Ticket Price: Rs.{cartDetails.price || cartDetails.ticketPrice || 'N/A'}</p>
                                </div>
                            </div>
                        ) : (
                            <p>No item selected.</p>
                        )}
                    </Card>
                </Col>
            </Row>
        </section>
    );
};

export default CheckoutForm;
