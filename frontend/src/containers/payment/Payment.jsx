import React from 'react';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import visaLogo from '../../assest/visa.png';
import paypalLogo from '../../assest/paypal.png';
import mastercardLogo from '../../assest/mastercard.png';
import paymentImage from '../../assest/visaladarenews.jpg'; // Add your image path here
import './Payment.css';

const { Title } = Typography;

const Payment = () => {
  return (
    <div className='payment-container'>
      <Row gutter={16}>
        <Col span={12}>
          <div className='payment-image'>
            <img src={paymentImage} alt="Payment" />
          </div>
        </Col>
        <Col span={12}>
          <Title level={2} className='payment-title'>Payment</Title>
          <Form layout="vertical">
            <Form.Item>
              <div className='payment-methods'>
                <img src={visaLogo} alt="Visa" className='payment-logo' />
                <img src={paypalLogo} alt="Paypal" className='payment-logo' />
                <img src={mastercardLogo} alt="Mastercard" className='payment-logo' />
              </div>
            </Form.Item>
            <Form.Item label="Name on card">
              <Input placeholder="Name on card" />
            </Form.Item>
            <Form.Item label="Card Number">
              <Input placeholder="Card Number" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="MM / YY">
                  <Input placeholder="MM / YY" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="CVV">
                  <Input placeholder="CVV" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit" className='confirm-payment-btn'>
                CONFIRM PAYMENT
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Payment;
