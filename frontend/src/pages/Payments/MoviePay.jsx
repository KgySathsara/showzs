import React from 'react';
import { Layout } from 'antd';
import { Adminnavbar } from '../../components';
import { MoviePayment } from '../../containers';
// import './AdminLiveEvents.css';

const { Content } = Layout;

const MoviePay = () => {

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Adminnavbar />
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <h2>Movie Payments Details</h2>
            <br /> 
            <MoviePayment />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MoviePay;