import React from 'react';
import { Row, Col, Card } from 'antd';

const DashboardContainer = () => (
  <>
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8}>
        <Card title="Monthly Revenue" bordered={false}>
          $12,345
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card title="Total Users" bordered={false}>
          1,234
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card title="Current Movie" bordered={false}>
          Movie Name: Inception
        </Card>
      </Col>
    </Row>
    <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
      <Col xs={24} sm={12} md={8}>
        <Card title="Current Show" bordered={false}>
          Show Name: Game of Thrones
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

export default DashboardContainer;
