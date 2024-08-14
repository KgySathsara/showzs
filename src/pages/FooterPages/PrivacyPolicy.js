import React from 'react';
import { Typography, Layout, Divider } from 'antd';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../containers/footer/Footer';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const PrivacyPolicy = () => {
    return (
      <section>
        <Navbar />
        <Layout style={{ padding: '24px', minHeight: '100vh', backgroundColor: '#fff' }}>
            <Content style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Title level={2} style={{ textAlign: 'center' }}>Privacy Policy</Title>
                <Paragraph style={{ textAlign: 'center', fontStyle: 'italic', marginTop: '10px' }}>
                    <strong>Effective Date : 2024/08/14</strong>
                </Paragraph>
                <Divider />
                <Typography>
                    <Title level={4}>1. Introduction</Title>
                    <Paragraph>
                        Welcome to Showzs, a service of <b>GLOBAL Mesh</b>. We respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect, how we use it, and the choices you have regarding your data.
                    </Paragraph>

                    <Title level={4}>2. Information We Collect</Title>
                    <Paragraph>
                        <strong>Personal Information:</strong> When you register, purchase content, or contact our support, we may collect your name, email address, phone number, payment details, and billing information.
                    </Paragraph>
                    <Paragraph>
                        <strong>Usage Data:</strong> This includes information such as your IP address, device type, browser type, operating system, and how you interact with our platform (e.g., pages viewed, time spent on each page).
                    </Paragraph>
                    <Paragraph>
                        <strong>Cookies and Tracking Technologies:</strong> We use cookies, pixels, and other tracking technologies to collect data about your interaction with our site, including user preferences and analytics.
                    </Paragraph>

                    <Title level={4}>3. How We Use Your Information</Title>
                    <Paragraph>
                        <strong>To Provide Services:</strong> We use your personal information to process transactions, deliver content, provide customer support, and enhance your user experience.
                    </Paragraph>
                    <Paragraph>
                        <strong>Marketing Communications:</strong> We may use your contact information to send you promotional materials or updates about our services, though you can opt out at any time.
                    </Paragraph>
                    <Paragraph>
                        <strong>Legal Compliance:</strong> We may use your data to comply with legal obligations, resolve disputes, and enforce our agreements.
                    </Paragraph>

                    <Title level={4}>4. Sharing Your Information</Title>
                    <Paragraph>
                        <strong>Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, and marketing assistance. These providers are bound by confidentiality obligations.
                    </Paragraph>
                    <Paragraph>
                        <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.
                    </Paragraph>
                    <Paragraph>
                        <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or part of our assets, your personal information may be transferred to the acquiring entity.
                    </Paragraph>

                    <Title level={4}>5. Security</Title>
                    <Paragraph>
                        We take reasonable measures to protect your information from unauthorized access, use, or disclosure. This includes encryption, access controls, and regular security audits.
                    </Paragraph>

                    <Title level={4}>6. Your Rights</Title>
                    <Paragraph>
                        <strong>Access and Correction:</strong> You have the right to access and correct your personal information at any time.
                    </Paragraph>
                    <Paragraph>
                        <strong>Data Portability:</strong> You can request a copy of your data in a structured, commonly used, and machine-readable format.
                    </Paragraph>
                    <Paragraph>
                        <strong>Deletion:</strong> You can request the deletion of your personal data, subject to certain legal exceptions.
                    </Paragraph>

                    <Title level={4}>7. Data Retention</Title>
                    <Paragraph>
                        We retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
                    </Paragraph>

                    <Title level={4}>8. International Data Transfers</Title>
                    <Paragraph>
                        If you are accessing our services from outside [Your Jurisdiction], your information may be transferred to, stored, and processed in a different jurisdiction. By using our services, you consent to this transfer.
                    </Paragraph>

                    <Title level={4}>9. Changes to This Privacy Policy</Title>
                    <Paragraph>
                        We may update this policy to reflect changes in our practices or for other operational, legal, or regulatory reasons. The updated policy will be posted on our website with a revised effective date.
                    </Paragraph>

                    <Title level={4}>10. Contact Us</Title>
                    <Paragraph>
                        If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at <b>info@sounder.com </b>.
                    </Paragraph>
                </Typography>
            </Content>
        </Layout>
        <Footer/> 
      </section>
    );
};

export default PrivacyPolicy;
