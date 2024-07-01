import React from 'react';
import { Layout } from 'antd';
import { Adminnavbar } from '../../components';
import './AdminLiveEvents.css';

const { Content } = Layout;

const AdminLiveEvents = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Adminnavbar />
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            sssssssssssssssss
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLiveEvents;
