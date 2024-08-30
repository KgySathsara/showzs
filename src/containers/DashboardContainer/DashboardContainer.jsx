import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import axios from 'axios';

const DashboardContainer = () => {
  const [userCount, setUserCount] = useState(0);
  const [latestMovie, setLatestMovie] = useState('');
  const [latestEvent, setLatestEvent] = useState('');
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [eventParticipation, setEventParticipation] = useState(0);
  const [movieViewsCount, setMovieViewsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          userCountResponse,
          latestMovieResponse,
          latestEventResponse,
          monthlyRevenueResponse,
          eventParticipationResponse,
          movieViewsCountResponse

        ] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/user-count'),
          axios.get('http://127.0.0.1:8000/api/movie'),
          axios.get('http://127.0.0.1:8000/api/live-events/showLastEvent'),
          axios.get('http://127.0.0.1:8000/api/monthly-revenue'),
          axios.get('http://127.0.0.1:8000/api/event-participation'),
          axios.get('http://127.0.0.1:8000/api/all-movie-views')
        ]);

        setUserCount(userCountResponse.data.count);
        setLatestMovie(latestMovieResponse.data.title);
        setLatestEvent(latestEventResponse.data.title);
        setMonthlyRevenue(monthlyRevenueResponse.data.monthly_revenue);
        setEventParticipation(eventParticipationResponse.data.count);
        setMovieViewsCount(movieViewsCountResponse.data.count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card title="Monthly Revenue" bordered={false}>
            {monthlyRevenue} LKR
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="Total Users" bordered={false}>
            {userCount}
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="Current Movie" bordered={false}>
            Movie Name: {latestMovie}
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Card title="Current Show" bordered={false}>
            Show Name: {latestEvent}
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="Total Movie Views" bordered={false}>
          {movieViewsCount}
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="Total Event Participation" bordered={false}>
            {eventParticipation}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardContainer;
