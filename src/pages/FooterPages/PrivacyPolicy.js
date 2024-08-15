import React, { useEffect } from 'react';
import { Typography, Layout, Divider } from 'antd';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../containers/footer/Footer';
import './PrivacyPolicy.css'; // Import the CSS file

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    return (
      <section className="privacy-policy-section">
        <Navbar />
        <Layout style={{ padding: '24px', minHeight: '100vh', backgroundColor: '#0047ab' }}>
            <Content className="privacy-policy-content">
                <Title className="privacy-policy-title" level={2}>Privacy Policy</Title>
                <Divider className="terms-and-conditions-divider" />
                <Paragraph className="privacy-policy-italic">
                    <strong>Effective Date: 2024/08/14</strong>
                </Paragraph>
                <Divider className="privacy-policy-divider" />
                <Typography>
                    <Title className="privacy-policy-subtitle " level={4}>1. Introduction</Title>
                    <Paragraph className="privacy-policy-paragraph">
                        Welcome to Showzs, a service of <b>GLOBAL Mesh</b>. We respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect, how we use it, and the choices you have regarding your data.
                    </Paragraph>

                    <Title className="privacy-policy-subtitle" level={4}>2. Information We Collect</Title>
                    <Paragraph className="privacy-policy-paragraph">
                        <strong>Personal Information:</strong> When you register, purchase content, or contact our support, we may collect your name, email address, phone number, payment details, and billing information.
                    </Paragraph>
                    <Paragraph className="privacy-policy-paragraph">
                        <strong>Usage Data:</strong> This includes information such as your IP address, device type, browser type, operating system, and how you interact with our platform (e.g., pages viewed, time spent on each page).
                    </Paragraph>
                    <Paragraph className="privacy-policy-paragraph">
                        <strong>Cookies and Tracking Technologies:</strong> We use cookies, pixels, and other tracking technologies to collect data about your interaction with our site, including user preferences and analytics.
                    </Paragraph>

                    <Title className="privacy-policy-subtitle" level={4}>3. How We Use Your Information</Title>
                    <Paragraph className="privacy-policy-paragraph">
                        <strong>To Provide Services:</strong> We use your personal information to process transactions, deliver content, provide customer support, and enhance your user experience.
                    </Paragraph>
                    <Paragraph className="privacy-policy-paragraph">
                        <strong>Marketing Communications:</strong> We may use your contact information to send you promotional materials or updates about our services, though you can opt out at any time.
                    </Paragraph>
                    <Paragraph className="privacy-policy-paragraph">
                        <strong>Legal Compliance:</strong> We may use your data to comply with legal obligations, resolve disputes, and enforce our agreements.
                    </Paragraph>

                    <Title className="privacy-policy-subtitle" level={4}>4. Sharing Your Information</Title>
                    <Paragraph className="privacy-policy-paragraph">
                        <strong>Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, and marketing assistance. These providers are bound by confidentiality obligations.
                    </Paragraph>
                    <Paragraph className="privacy-policy-paragraph">
                        <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.
                    </Paragraph>
                    <Paragraph className="privacy-policy-paragraph">
                        <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or part of our assets, your personal information may be transferred to the acquiring entity.
                    </Paragraph>

                    <Title className="privacy-policy-subtitle" level={4}>5. Security</Title>
                    <Paragraph className="privacy-policy-paragraph">
                        We take reasonable measures to protect your information from unauthorized access, use, or disclosure. This includes encryption, access controls, and regular security audits.
                    </Paragraph>

                    <Title className="privacy-policy-subtitle" level={4}>6. Your Rights</Title>
                    <Paragraph className="privacy-policy-paragraph">
                        <strong>Access and Correction:</strong> You have the right to access and correct your personal information at any time.
                    </Paragraph>
                    <Paragraph className="privacy-policy-paragraph">
                        <strong>Data Portability:</strong> You can request a copy of your data in a structured, commonly used, and machine-readable format.
                    </Paragraph>
                    <Paragraph className="privacy-policy-paragraph">
                        <strong>Deletion:</strong> You can request the deletion of your personal data, subject to certain legal exceptions.
                    </Paragraph>

                    <Title className="privacy-policy-subtitle" level={4}>7. Data Retention</Title>
                    <Paragraph className="privacy-policy-paragraph">
                        We retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
                    </Paragraph>

                    <Title className="privacy-policy-subtitle" level={4}>8. International Data Transfers</Title>
                    <Paragraph className="privacy-policy-paragraph">
                        If you are accessing our services from outside [Your Jurisdiction], your information may be transferred to, stored, and processed in a different jurisdiction. By using our services, you consent to this transfer.
                    </Paragraph>

                    <Title className="privacy-policy-subtitle" level={4}>9. Changes to This Privacy Policy</Title>
                    <Paragraph className="privacy-policy-paragraph">
                        We may update this policy to reflect changes in our practices or for other operational, legal, or regulatory reasons. The updated policy will be posted on our website with a revised effective date.
                    </Paragraph>

                    <Title className="privacy-policy-subtitle" level={4}>10. Contact Us</Title>
                    <Paragraph className="privacy-policy-paragraph">
                        If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at <b>info@sounder.com</b>.
                    </Paragraph>
                </Typography>
            </Content>
        </Layout>
        <Footer/> 
      </section>
    );
};

export default PrivacyPolicy;
