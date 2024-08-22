import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Typography, Card, notification } from 'antd';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import axios from 'axios';
import jsPDF from 'jspdf';
import './CheckoutForm.css';

const { Title } = Typography;

function CountrySelector({ onChange, value }) {
    const options = useMemo(() => countryList().getData(), []);

    return <Select options={options} value={value} onChange={onChange} />;
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
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        const storedSelectedItem = JSON.parse(localStorage.getItem('selectedItem'));
        const storedSelectedEvent = JSON.parse(localStorage.getItem('selectedEvent'));

        if (storedUser) {
            form.setFieldsValue({
                name: storedUser.full_name || '',
                email: storedUser.email || '',
                mobileNumber: storedUser.phone_number || '',
                country: { label: storedUser.country, value: storedUser.country } || '',
            });
            setIsUserLoggedIn(true);
        }

        setCartDetails(storedSelectedEvent || storedSelectedItem);
    }, [form]);

    const generatePDF = (values) => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Checkout Details", 20, 20);
        doc.setFontSize(12);
        doc.text(`Name: ${values.name}`, 20, 30);
        doc.text(`Email: ${values.email}`, 20, 40);
        doc.text(`Mobile Number: ${values.mobileNumber}`, 20, 50);
        doc.text(`Country: ${values.country.label}`, 20, 60);

        if (cartDetails) {
            doc.text("Cart Details", 20, 80);
            doc.text(`Title: ${cartDetails.title}`, 20, 90);
            doc.text(`Director: ${cartDetails.director || 'N/A'}`, 20, 100);
            doc.text(`Description: ${cartDetails.description || 'N/A'}`, 20, 110);
            doc.text(`Category: ${cartDetails.genre || cartDetails.category || 'N/A'}`, 20, 120);
            doc.text(`Ticket Price: Rs.${cartDetails.price || cartDetails.ticketPrice || 'N/A'}`, 20, 130);
        }


        doc.save("checkout-details.pdf");
    };



    const handleSubmit = async (values) => {
        if (!isUserLoggedIn) {
            return notification.error({
                message: 'Login Required',
                description: 'Please login first to proceed with the checkout.',
            });
        }

        /*const purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || [];
        if (purchasedItems.includes(cartDetails.id)) {
            return notification.error({
                message: 'Duplicate Purchase',
                description: 'You have already purchased this item.',
            });
        }*/

        try {
            await axios.post('http://127.0.0.1:8000/api/checkout', {
                ...values,
                country: values.country.label,
                itemId: cartDetails.id,
            });


            notification.success({
                message: 'Success',
                description: 'Your data has been submitted successfully!',
            });

            //purchasedItems.push(cartDetails.id);
            //localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));

            generatePDF(values);
            navigate('/Payment');
        } catch (error) {
            console.error('There was an error submitting the form!', error);

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
                    <Card title={<span className="card-title">Billing Details</span>} bordered={false} className="details-card">
                        <Form form={form} layout="vertical" onFinish={handleSubmit}>
                            <Form.Item label="User Name" name="name" rules={[{ required: true, message: 'Please input your user name!' }]}>
                                <Input placeholder="Enter your user name" className="input-field" />
                            </Form.Item>
                            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}>
                                <Input placeholder="Enter your email" className="input-field" />
                            </Form.Item>
                            <Form.Item label="Mobile Number" name="mobileNumber" rules={[{ required: true, message: 'Please input your mobile number!' }]}>
                                <Input placeholder="Enter your mobile number" className="input-field" />
                            </Form.Item>
                            <Form.Item label="Country" name="country" rules={[{ required: true, message: 'Please select your country!' }]}>
                                <CountrySelector value={form.getFieldValue('country')} onChange={(value) => form.setFieldsValue({ country: value })} />
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
                    <Card title={<span className="card-title">Your Cart</span>} bordered={false} className="cart-card">
                        {cartDetails ? (
                            <div className="movie-container">
                                <div className="movie">
                                    <h3>{cartDetails.title}</h3>
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
