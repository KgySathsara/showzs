import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Card } from 'antd';

const LiveEventProfile = () => {
  const [form] = Form.useForm();
  const [eventData, setEventData] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [profileViews, setProfileViews] = useState(0);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        // Fetch event data
        const response = await axios.get('http://showz-backend.socialgear.co.uk/api/live-events/show');
        const eventData = response.data;

        setEventData(eventData);
        form.setFieldsValue(eventData);

        // Fetch monthly revenue for this event
        const revenueResponse = await axios.get('http://showz-backend.socialgear.co.uk/api/event-revenue', {
          params: { title: eventData.title }
        });
        setMonthlyRevenue(revenueResponse.data.monthly_revenue);

        // Fetch profile views for this event
        const profileViewsResponse = await axios.get('http://showz-backend.socialgear.co.uk/api/event-views', {
          params: { title: eventData.title }
        });
        setProfileViews(profileViewsResponse.data.count);
      } catch (error) {
        console.error('Failed to fetch event data:', error);
      }
    };

    fetchEventData();
  }, [form]);

  return (
    <section className='admin-movie-management'>
      <h2>Live Event Profile</h2>
      <div className='movie-profile-card'>
        <Card title="Monthly Revenue" className='profile-card'>
          <p>{monthlyRevenue} LKR</p>
        </Card>
        <Card title="Profile Views" className='profile-card'>
          <p>{profileViews}</p>
        </Card>
      </div>
      <div className="movie-management-container">
        <div className="video-container">
          <h3>Live Event</h3>
          {eventData && (
            <img src={eventData.coverImage} alt={eventData.title} />
          )}
        </div>
        <div className='movie-profile-management'>
          <Form form={form} layout="vertical" className="details-form">
            <Form.Item name="title" label="Event" rules={[{ required: true, message: 'Please enter the Event title' }]}>
              <Input readOnly />
            </Form.Item>
            <Form.Item name="description" label="Event Description" rules={[{ required: true, message: 'Please enter the Event Description' }]}>
              <Input readOnly />
            </Form.Item>
            <Form.Item name="date" label="Event Date" rules={[{ required: true, message: 'Please enter the Date' }]}>
              <Input readOnly />
            </Form.Item>
            <Form.Item name="time" label="Event Time" rules={[{ required: true, message: 'Please select the event time' }]}>
              <Input readOnly />
            </Form.Item>
            <Form.Item name="ticketPrice" label="Ticket Price" rules={[{ required: true, message: 'Please enter the ticket price' }]}>
              <Input readOnly />
            </Form.Item>
            <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please enter the Category' }]}>
              <Input readOnly />
            </Form.Item>
            <Form.Item name="streamLink" label="Stream Link" rules={[{ required: true, message: 'Please enter the stream link' }]}>
              <Input readOnly />
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default LiveEventProfile;
