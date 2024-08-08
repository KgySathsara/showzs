import React from 'react';
import { Row, Col} from 'antd';
import ticket from '../../assest/ticket.jpg';
import paymentImage from '../../assest/visaladarenews.jpg';
import './Payment.css';

const Payment = () => {;
  return (
    <div className='payment-container'>
      <Row gutter={16}>
        <Col span={24} md={12}>
          <div className='payment-image'>
            <img src={paymentImage} alt="Payment" />
          </div>
        </Col>
        <Col span={24} md={12} className="centered-col">
  <div className="movie-actions frame">
    <img src={ticket} alt="Ticket" className="ticketImg" />
    <button className="watch-trailer">BOOK NOW</button>
  </div>
</Col>

      </Row>
    </div>
  );
}

export default Payment;
