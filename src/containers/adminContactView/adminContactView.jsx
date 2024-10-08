import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import axios from 'axios';
import './AdminContact.css';

export default function AdminContact() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://showz-backend.socialgear.co.uk/api/contact-messages')
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the contact messages:', error);
      });
  }, []);

  return (
    <section className='admin-contact'>
      <h2>Contact Us Messages</h2>
      <Row gutter={[16, 16]}>
        {messages.map((msg, index) => (
          <Col
            key={index}
            xs={24} sm={24} md={12} lg={8} xl={8}
          >
            <Card title={msg.subject} bordered={true}>
              <p><strong>Name:</strong> {msg.name}</p>
              <p><strong>Email:</strong> {msg.email}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              <p><strong>Timestamp:</strong> {msg.timestamp}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}
