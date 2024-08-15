import React, { useEffect } from 'react';
import { Typography, Layout, Divider } from 'antd';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../containers/footer/Footer';
import './RefundPolicy.css'; // Import the CSS file

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const RefundPolicy = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    return (
      <section className="refund-policy-section">
        <Navbar />
        <Layout style={{ padding: '24px', minHeight: '100vh', backgroundColor: '#fff' }}>
            <Content className="refund-policy-content">
                <Title className="refund-policy-title" level={2}>Refund Policy</Title>
                <Paragraph className="refund-policy-italic">
                    <strong>Effective Date: 2024/08/14</strong>
                </Paragraph>
                <Divider className="refund-policy-divider" />
                <Typography>
                    <Title className="refund-policy-subtitle" level={4}>1. Overview</Title>
                    <Paragraph className="refund-policy-paragraph">
                        At Showzs, we are committed to ensuring customer satisfaction. Our refund policy outlines the conditions under which you may request a refund for purchased content.
                    </Paragraph>

                    <Title className="refund-policy-subtitle" level={4}>2. Refund Eligibility</Title>
                    <Paragraph className="refund-policy-paragraph">
                        <strong>Movies:</strong> Refunds are available if you experience technical difficulties accessing a purchased movie that are attributable to our platform and cannot be resolved by our support team.
                    </Paragraph>
                    <Paragraph className="refund-policy-paragraph">
                        <strong>Live Events:</strong> If a live event is canceled, rescheduled, or significantly altered, you may request a refund within [X] days of the original event date.
                    </Paragraph>

                    <Title className="refund-policy-subtitle" level={4}>3. Non-Refundable Purchases</Title>
                    <Paragraph className="refund-policy-paragraph">
                        <strong>Viewed Content:</strong> If you have started watching or have fully viewed the content, a refund will not be issued.
                    </Paragraph>
                    <Paragraph className="refund-policy-paragraph">
                        <strong>User Errors:</strong> Refunds will not be provided for mistakes in purchasing (e.g., purchasing the wrong movie or event).
                    </Paragraph>
                    <Paragraph className="refund-policy-paragraph">
                        <strong>Subscription Fees:</strong> Any recurring subscription fees are non-refundable after the content has been accessed.
                    </Paragraph>

                    <Title className="refund-policy-subtitle" level={4}>4. Refund Process</Title>
                    <Paragraph className="refund-policy-paragraph">
                        To request a refund:
                    </Paragraph>
                    <Paragraph className="refund-policy-paragraph">
                        Contact our support team at <b>info@sounder.com</b> with your order number and details of the issue. Our team will assess your request within [X] business days and notify you of the outcome.
                    </Paragraph>

                    <Title className="refund-policy-subtitle" level={4}>5. Refund Methods</Title>
                    <Paragraph className="refund-policy-paragraph">
                        Approved refunds will be issued to the original payment method. If this is not possible, an alternative refund method may be offered, such as store credit.
                    </Paragraph>

                    <Title className="refund-policy-subtitle" level={4}>6. Partial Refunds</Title>
                    <Paragraph className="refund-policy-paragraph">
                        In certain cases, we may offer partial refunds for issues that do not warrant a full refund but still impacted your viewing experience.
                    </Paragraph>

                    <Title className="refund-policy-subtitle" level={4}>7. Dispute Resolution</Title>
                    <Paragraph className="refund-policy-paragraph">
                        If you disagree with the outcome of a refund request, you can escalate the issue to our management team by emailing <b>info@sounder.com</b>. We aim to resolve disputes amicably and efficiently.
                    </Paragraph>

                    <Title className="refund-policy-subtitle" level={4}>8. Contact Us</Title>
                    <Paragraph className="refund-policy-paragraph">
                        For questions or concerns regarding our refund policy, please contact us at <b>info@sounder.com</b>.
                    </Paragraph>
                </Typography>
            </Content>
        </Layout>
        <Footer />
      </section>
    );
};

export default RefundPolicy;
