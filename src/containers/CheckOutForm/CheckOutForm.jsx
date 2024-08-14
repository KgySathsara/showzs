import React from 'react';
import { Form, Input, Button, Select, Checkbox, Row, Col, Typography, Card } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './CheckoutForm.css';

const { Title, Text } = Typography;
const { Option } = Select;

const CheckoutForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate(); // Initialize the navigate function

    const handleSubmit = (values) => {
        console.log('Form submitted:', values);
        // Redirect to the payment page after form submission
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
                                <Select placeholder="Select your country" className="select-field">
                                    <Option value="India">India</Option>
                                    <Option value="USA">USA</Option>
                                    <Option value="UK">UK</Option>
                                </Select>
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
                        <p>Visal Adare</p>
                        <p>Movie</p>
                        <Text strong>Total (Rs) : Rs.500</Text>
                    </Card>
                </Col>
            </Row>
        </section>
    );
};

export default CheckoutForm;
