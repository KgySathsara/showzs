import React from 'react';
import { Typography, Layout, Divider } from 'antd';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../containers/footer/Footer';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const RefundPolicy = () => {
    return (
      <section>
        <Navbar />
        <Layout style={{ padding: '24px', minHeight: '100vh', backgroundColor: '#fff' }}>
            <Content style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Title level={2} style={{ textAlign: 'center' }}>Refund Policy</Title>
                <Paragraph style={{ textAlign: 'center', fontStyle: 'italic', marginTop: '10px' }}>
                    <strong>Effective Date : 2024/08/14</strong>
                </Paragraph>
                <Divider />
                <Typography>
                    <Title level={4}>1. Overview</Title>
                    <Paragraph>
                        At Showzs, we are committed to ensuring customer satisfaction. Our refund policy outlines the conditions under which you may request a refund for purchased content.
                    </Paragraph>

                    <Title level={4}>2. Refund Eligibility</Title>
                    <Paragraph>
                        <strong>Movies:</strong> Refunds are available if you experience technical difficulties accessing a purchased movie that are attributable to our platform and cannot be resolved by our support team.
                    </Paragraph>
                    <Paragraph>
                        <strong>Live Events:</strong> If a live event is canceled, rescheduled, or significantly altered, you may request a refund within [X] days of the original event date.
                    </Paragraph>

                    <Title level={4}>3. Non-Refundable Purchases</Title>
                    <Paragraph>
                        <strong>Viewed Content:</strong> If you have started watching or have fully viewed the content, a refund will not be issued.
                    </Paragraph>
                    <Paragraph>
                        <strong>User Errors:</strong> Refunds will not be provided for mistakes in purchasing (e.g., purchasing the wrong movie or event).
                    </Paragraph>
                    <Paragraph>
                        <strong>Subscription Fees:</strong> Any recurring subscription fees are non-refundable after the content has been accessed.
                    </Paragraph>

                    <Title level={4}>4. Refund Process</Title>
                    <Paragraph>
                        To request a refund:
                    </Paragraph>
                    <Paragraph>
                        Contact our support team at <b>info@sounder.com </b> with your order number and details of the issue. Our team will assess your request within [X] business days and notify you of the outcome.
                    </Paragraph>

                    <Title level={4}>5. Refund Methods</Title>
                    <Paragraph>
                        Approved refunds will be issued to the original payment method. If this is not possible, an alternative refund method may be offered, such as store credit.
                    </Paragraph>

                    <Title level={4}>6. Partial Refunds</Title>
                    <Paragraph>
                        In certain cases, we may offer partial refunds for issues that do not warrant a full refund but still impacted your viewing experience.
                    </Paragraph>

                    <Title level={4}>7. Dispute Resolution</Title>
                    <Paragraph>
                        If you disagree with the outcome of a refund request, you can escalate the issue to our management team by emailing <b>info@sounder.com </b>. We aim to resolve disputes amicably and efficiently.
                    </Paragraph>

                    <Title level={4}>8. Contact Us</Title>
                    <Paragraph>
                        For questions or concerns regarding our refund policy, please contact us at <b>info@sounder.com </b>.
                    </Paragraph>
                </Typography>
            </Content>
        </Layout>
        <Footer />
      </section>
    );
};

export default RefundPolicy;
