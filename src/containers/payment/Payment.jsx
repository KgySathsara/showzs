import React from 'react';
import { Form, Input, Button, Row, Col, Typography, Card } from 'antd';
import visaLogo from '../../assest/visa.png';
import paypalLogo from '../../assest/paypal.png';
import mastercardLogo from '../../assest/mastercard.png';

import './Payment.css';

const { Title } = Typography;

const PaymentForm = () => {
  return (
    <div className='payment-container'>
      <Card className='payment-card'>
        <Title level={2} className='payment-title'>Payment</Title>
        <Form layout="vertical">
          <Form.Item
            name="paymentMethods"
            rules={[{ required: true, message: 'Please select a payment method!' }]}
          >
            <div className='payment-methods'>
              <img src={visaLogo} alt="Visa" className='payment-logo' />
              <img src={paypalLogo} alt="Paypal" className='payment-logo' />
              <img src={mastercardLogo} alt="Mastercard" className='payment-logo' />
            </div>
          </Form.Item>
          <Form.Item
            label="Name on card"
            name="nameOnCard"
            rules={[{ required: true, message: 'Please enter the name on the card!' }]}
          >
            <Input placeholder="Name on card" />
          </Form.Item>
          <Form.Item
            label="Card Number"
            name="cardNumber"
            rules={[{ required: true, message: 'Please enter the card number!' }]}
          >
            <Input placeholder="Card Number" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Expiry Date"
                name="expiryDate"
                rules={[{ required: true, message: 'Please enter the expiry date!' }]}
              >
                <Input placeholder="MM / YY" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="CVV"
                name="cvv"
                rules={[{ required: true, message: 'Please enter the CVV!' }]}
              >
                <Input placeholder="CVV" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" className='confirm-payment-btn'>
              Confirm Payment
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default PaymentForm;
