import React from 'react';
import { Layout } from 'antd';
import { Adminnavbar } from '../../components';
import { AdminUpcomingMovies } from '../../containers';

const { Content } = Layout;

const Admin = () => {
  return (
    <Layout style={{ minHeight: '100vh'}}>
      <Adminnavbar />
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <AdminUpcomingMovies />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
