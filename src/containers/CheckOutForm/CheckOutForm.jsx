import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Typography, Card, Spin, message } from 'antd';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CheckoutForm.css';
import visaLogo from '../../assest/visa (1).png';
import mastercardLogo from '../../assest/mastercard (1).png';
import AmericanExpressLogo from '../../assest/amex.png';
import DinersClubInternationalLogo from '../../assest/dinersclub.png';
import DiscoverLogo from '../../assest/discover.jpg';

const { Title } = Typography;

// Country Selector Component
function CountrySelector({ onChange, value }) {
    const options = useMemo(() => countryList().getData(), []);

    const changeHandler = (selectedOption) => {
        onChange(selectedOption);
    };

    return <Select options={options} value={value} onChange={changeHandler} />;
}

const CheckoutForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [cartDetails, setCartDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Check if user is logged in and pre-fill form
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

        // Get cart details from local storage
        const storedCartDetails = localStorage.getItem('selectedItem');
        if (storedCartDetails) {
            setCartDetails(JSON.parse(storedCartDetails));
        }
    }, [form]);

    // Handle payment success
    const handlePaymentSuccess = (checkoutId) => {
        axios.post(`http://127.0.0.1:8000/api/update-payment-status/${checkoutId}`)
            .then((response) => {
                if (response.data.status === 'success') {
                    message.success('Your payment status has been updated.');
                    navigate('/payment-success');
                } else {
                    message.error('Failed to update payment status.');
                }
            })
            .catch((error) => {
                console.error('Payment Status Update Error:', error);
            });
    };

    // Handle form submission
    const handleSubmit = async (values) => {
        if (!isUserLoggedIn) {
            message.error('Please login first to proceed with the checkout.');
            navigate('/login');
            return;
        }

        setLoading(true); // Set loading state when form submission starts

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/onepay-store', {
                name: values.name,
                email: values.email,
                mobileNumber: values.mobileNumber,
                country: values.country.label,
                title: cartDetails?.title || 'N/A',
                director: cartDetails?.director || 'N/A',
                description: cartDetails?.description || 'N/A',
                category: cartDetails?.genre || cartDetails?.category || 'N/A',
                price: cartDetails?.price || cartDetails?.ticketPrice || 0,
                link: cartDetails?.movie || cartDetails?.streamLink || 'N/A',
            });

            if (response.data.status === 'success') {
                message.success('Now redirecting to the payment gateway...', 1);

                const checkoutId = response.data.data.id;

                // Call OnePay API to generate the payment link
                const onePayResponse = await axios.post('http://127.0.0.1:8000/api/onepay', {
                    name: values.name,
                    email: values.email,
                    mobileNumber: values.mobileNumber,
                    country: values.country.label,
                    price: cartDetails?.price || cartDetails?.ticketPrice,
                });

                setLoading(false);

                if (onePayResponse.data.status === 'success' && onePayResponse.data.redirect_url) {
                    window.location.href = onePayResponse.data.redirect_url;
                    handlePaymentSuccess(checkoutId);
                } else {
                    message.error('Failed to initiate the payment process.');
                }
            } else if (response.data.status === 'error' && response.data.message === 'You have already purchased this item.') {
                setLoading(false);
                message.info('You have already purchased this item. It is available in your purchase history.');
            } else {
                setLoading(false);
                message.error('Failed to store the payment information.');
            }
        } catch (error) {
            setLoading(false);

            // Check for server response error
            if (error.response) {
                // Server responded with a status code outside the 2xx range
                const errorMessage = error.response.data.message || 'An unexpected error occurred on the server.';
                message.error(errorMessage); // Display the specific error message from the server
            } else if (error.request) {
                // The request was made but no response was received
                message.error('No response received from the server. Please check your network connection.');
            } else {
                // Something else caused the error
                message.error(error.message || 'An unknown error occurred.');
            }
        }
    };

    return (
        <section className="checkout-container">
            <Title level={2} className="form-title">Checkout Form</Title>
            <Card className="secure-payment-description">
                <p>We take your security seriously. All transactions are securely encrypted and processed using the latest payment technology. Your personal information and payment details are protected with industry-standard security protocols. You can proceed with confidence, knowing that your payment is safe and secure.</p>
                <h3>Payment Methods</h3>
                <img src={visaLogo} alt="Visa" />
                <img src={mastercardLogo} alt="MasterCard" />
                <img src={AmericanExpressLogo} alt="American Express" />
                <img src={DinersClubInternationalLogo} alt="Diners Club International" />
                <img src={DiscoverLogo} alt="Discover" />
            </Card>
            <Spin spinning={loading}> {/* Show loading spinner while submitting */}
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
                                validateTrigger="onBlur"
                                initialValues={{ remember: true }}
                            >
                                {/* User Name Validation */}
                                <Form.Item
                                    label="User Name"
                                    name="name"
                                    rules={[
                                        { required: true, message: 'Please input your user name!' },
                                        { min: 3, message: 'Name must be at least 3 characters long!' },
                                        { max: 50, message: 'Name can\'t be more than 50 characters!' },
                                        { pattern: /^[a-zA-Z ]*$/, message: 'Name must contain only letters!' },
                                    ]}
                                >
                                    <Input placeholder="Enter your user name" className="input-field" />
                                </Form.Item>

                                {/* Email Validation */}
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Please input a valid email!', type: 'email' },
                                    ]}
                                >
                                    <Input placeholder="Enter your email" className="input-field" />
                                </Form.Item>

                                {/* Mobile Number Validation */}
                                <Form.Item
                                    label="Mobile Number"
                                    name="mobileNumber"
                                    rules={[
                                        { required: true, message: 'Please input a valid mobile number!' },
                                    ]}
                                >
                                    <Input placeholder="Enter your mobile number" className="input-field" />
                                </Form.Item>

                                {/* Country Selector */}
                                <Form.Item
                                    label="Country"
                                    name="country"
                                    rules={[{ required: true, message: 'Please select your country!' }]}
                                >
                                    <CountrySelector />
                                </Form.Item>

                                {/* Terms Checkbox */}
                                <Form.Item name="remember" valuePropName="checked" rules={[{ required: true }]}>
                                    <Checkbox>I agree to the terms and conditions</Checkbox>
                                </Form.Item>

                                {/* Submit Button */}
                                <Button type="primary" htmlType="submit" className="submit-btn">
                                    Proceed to Payment
                                </Button>
                            </Form>
                        </Card>
                    </Col>

                    {/* Cart Details */}
                    <Col span={8}>
                        <Card
                            title={<span className="card-title">Your Cart</span>}
                            bordered={false}
                            className="cart-card"
                        >
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
            </Spin>
        </section>
    );
};

export default CheckoutForm;
