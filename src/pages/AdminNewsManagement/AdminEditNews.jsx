import React from 'react';
import { Layout } from 'antd';
import { Adminnavbar } from '../../components';
import { AdminEditNews } from '../../containers';

const { Content } = Layout;

const EditNews = () => {
    return (
        <Layout style={{ minHeight: '100vh'}}>
          <Adminnavbar />
          <Layout className="site-layout">
            <Content style={{ margin: '0 16px' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <AdminEditNews />
              </div>
            </Content>
          </Layout>
        </Layout>
      );
    };

export default EditNews