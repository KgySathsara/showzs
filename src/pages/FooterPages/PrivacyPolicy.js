import React from 'react';
import { Typography, Layout, Divider } from 'antd';
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../containers/footer/Footer'

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const PrivacyPolicy = () => {
  return (
    <section>
    <Navbar />
    <Layout style={{ padding: '24px' }}>
      <Content style={{ background: '#fff', padding: '24px', borderRadius: '8px' }}>
        <Typography>
          <Title level={2}>Privacy Policy</Title> 
          <Divider />
          <Paragraph>
            Welcome to Showz Movie. We are committed to protecting your personal information and your right to privacy.
            This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.
          </Paragraph>
          <Title level={3}>1. Information We Collect</Title>
          <Paragraph>
            We collect personal information that you voluntarily provide to us when you register on the Website, express
            an interest in obtaining information about us or our products and services, when you participate in activities
            on the Website, or otherwise when you contact us.
          </Paragraph>
          <Title level={3}>2. How We Use Your Information</Title>
          <Paragraph>
            We use the information we collect or receive to communicate directly with you, to send you marketing and promotional
            communications, to fulfill and manage your orders, to enforce our terms, conditions, and policies, and for other
            business purposes such as data analysis, identifying usage trends, and improving our services.
          </Paragraph>
          <Title level={3}>3. Sharing Your Information</Title>
          <Paragraph>
            We only share and disclose your information in the following situations: compliance with laws, business transfers,
            vendors, consultants, and other third-party service providers who perform services for us or on our behalf.
          </Paragraph>
          <Title level={3}>4. Data Security</Title>
          <Paragraph>
            We have implemented appropriate technical and organizational security measures designed to protect the security
            of any personal information we process. However, please also remember that we cannot guarantee that the internet
            itself is 100% secure.
          </Paragraph>
          <Title level={3}>5. Your Privacy Rights</Title>
          <Paragraph>
            You have the right to request access to the personal information we collect from you, change that information,
            or delete it in some circumstances. To exercise your privacy rights, please contact us.
          </Paragraph>
          <Title level={3}>6. Updates to this Policy</Title>
          <Paragraph>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy
            Policy on this page.
          </Paragraph>
          <Title level={3}>7. Contact Us</Title>
          <Paragraph>
            If you have any questions or concerns about this Privacy Policy, please contact us at: privacy@showzmovie.com
          </Paragraph>
        </Typography>
      </Content>
    </Layout>
    <Footer/> 
    </section>
  );
};

export default PrivacyPolicy;