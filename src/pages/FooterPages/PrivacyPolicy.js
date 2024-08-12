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
        <Layout style={{ padding: '24px', minHeight: '100vh', backgroundColor: '#fff' }}>
            <Content style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Title level={2} style={{ textAlign: 'center' }}>Privacy Policy</Title>
                <Divider />
                <Typography>
                    <Paragraph>
                        Welcome to Showz Movie! We are committed to protecting your personal information and your right to privacy. 
                        If you have any questions or concerns about our policy, or our practices with regards to your personal information, 
                        please contact us at info@globalmeshsolutions.com.
                    </Paragraph>

                    <Title level={4}>1. Information We Collect</Title>
                    <Paragraph>
                        We collect personal information that you voluntarily provide to us when you register on the platform, 
                        express an interest in obtaining information about us or our products and services, when you participate 
                        in activities on the platform, or otherwise when you contact us.
                    </Paragraph>

                    <Title level={4}>2. How We Use Your Information</Title>
                    <Paragraph>
                        We use personal information collected via our platform for a variety of business purposes described below. 
                        We process your personal information for these purposes in reliance on our legitimate business interests, 
                        in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                    </Paragraph>

                    <Title level={4}>3. Sharing Your Information</Title>
                    <Paragraph>
                        We may process or share data based on the following legal basis: Consent, Legitimate Interests, Performance of a Contract, 
                        Legal Obligations, and Vital Interests.
                    </Paragraph>

                    <Title level={4}>4. Security of Your Information</Title>
                    <Paragraph>
                        We aim to protect your personal information through a system of organizational and technical security measures. 
                        However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet 
                        or information storage technology can be guaranteed to be 100% secure.
                    </Paragraph>

                    <Title level={4}>5. Changes to This Policy</Title>
                    <Paragraph>
                        We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or 
                        for other operational, legal, or regulatory reasons.
                    </Paragraph>

                    <Title level={4}>6. Contact Us</Title>
                    <Paragraph>
                        If you have questions or comments about this policy, you may email us at info@globalmeshsolutions.com.
                    </Paragraph>
                </Typography>
            </Content>
        </Layout>
        <Footer/> 
        </section>
    );
};

export default PrivacyPolicy;
