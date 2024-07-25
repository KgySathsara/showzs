import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import axios from 'axios';

const DashboardContainer = () => {
  const [userCount, setUserCount] = useState(0);
  const [latestMovie, setLatestMovie] = useState('');
  const [latestEvent, setLatestEvent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userCountResponse, latestMovieResponse, latestEventResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/user-count'),
          axios.get('http://127.0.0.1:8000/api/movie'),
          axios.get('http://127.0.0.1:8000/api/live-events/showLastEvent'),
        ]);
        setUserCount(userCountResponse.data.count);
        setLatestMovie(latestMovieResponse.data.title);
        setLatestEvent(latestEventResponse.data.title);
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
            $12,345
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
            5,678
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="Total Event Participation" bordered={false}>
            789
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Card title="Total News Readership" bordered={false}>
            1,456
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="Recent Activity" bordered={false}>
            User JohnDoe watched Inception
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="User Engagement" bordered={false}>
            67%
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardContainer;
