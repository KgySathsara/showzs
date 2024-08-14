import React from 'react';
import { Typography, Layout, Divider } from 'antd';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../containers/footer/Footer';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const TermsAndConditions = () => {
    return (
      <section>
        <Navbar />
        <Layout style={{ padding: '24px', minHeight: '100vh', backgroundColor: '#fff' }}>
            <Content style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Title level={2} style={{ textAlign: 'center' }}>Terms and Conditions</Title>
                <Divider />
                <Paragraph style={{ textAlign: 'center' }}>
                    <strong>Effective Date : 2024/08/14</strong>
                </Paragraph>
                <Typography>
                    <Paragraph>
                        Welcome to Showzs! These terms and conditions outline the rules and regulations for the use of Showzs' services.
                    </Paragraph>

                    <Title level={4}>1. Introduction</Title>
                    <Paragraph>
                        These Terms and Conditions govern your use of Showzs, an OTT platform owned and operated by <b>GLOBAL Mesh</b>. By accessing or using our platform, you agree to be bound by these terms.
                    </Paragraph>

                    <Title level={4}>2. User Accounts</Title>
                    <Paragraph>
                        Account Creation: To access content, you must create an account with accurate and complete information. You are responsible for maintaining the security of your account and password.
                        <br />
                        Account Termination: We reserve the right to terminate or suspend your account at our discretion, including for any breach of these terms.
                    </Paragraph>

                    <Title level={4}>3. Content Access and Restrictions</Title>
                    <Paragraph>
                        Purchases: You must purchase a ticket to access movies or live events. Tickets are non-transferable and may only be used by the account holder.
                        <br />
                        Content Restrictions: You may not redistribute, modify, or publicly display any content from Showzs without explicit permission from <b>GLOBAL Mesh</b>.
                        <br />
                        Age Restrictions: Certain content may be restricted to users over a specific age. It is your responsibility to ensure compliance with these age restrictions.
                    </Paragraph>

                    <Title level={4}>4. Payment and Pricing</Title>
                    <Paragraph>
                        Accepted Payment Methods: We accept payments via [List Payment Methods, including One-Pay]. You agree to provide accurate payment information and authorize us to charge your payment method for any purchases made.
                        <br />
                        Pricing and Taxes: All prices are listed in [Currency] and include applicable taxes unless stated otherwise. Prices are subject to change without notice.
                        <br />
                        Billing Errors: If you believe there is an error in billing, please contact us within [X] days of the charge for investigation.
                    </Paragraph>

                    <Title level={4}>5. Intellectual Property</Title>
                    <Paragraph>
                        Ownership: All content on Showzs, including movies, images, logos, and trademarks, is the intellectual property of <b>GLOBAL Mesh</b> or its licensors. Unauthorized use is prohibited.
                        <br />
                        User-Generated Content: If you submit content to our platform, such as reviews or comments, you grant us a non-exclusive, worldwide, royalty-free license to use, modify, and distribute your content in connection with our services.
                    </Paragraph>

                    <Title level={4}>6. User Conduct</Title>
                    <Paragraph>
                        Prohibited Activities: You agree not to engage in activities that could harm Showzs, such as hacking, distributing viruses, or engaging in fraudulent behavior.
                        <br />
                        Reporting Violations: If you encounter another user violating these terms, please report the behavior to <b>info@sounder.com </b>.
                    </Paragraph>

                    <Title level={4}>7. Disclaimers and Limitation of Liability</Title>
                    <Paragraph>
                        No Warranties: Showzs is provided "as is" without warranties of any kind. We do not guarantee that the content will be error-free or uninterrupted.
                        <br />
                        Limitation of Liability: To the maximum extent permitted by law, <b>GLOBAL Mesh</b> is not liable for any direct, indirect, incidental, or consequential damages arising from your use of Showzs.
                    </Paragraph>

                    <Title level={4}>8. Indemnification</Title>
                    <Paragraph>
                        You agree to indemnify and hold <b>GLOBAL Mesh</b> harmless from any claims, losses, damages, liabilities, and expenses (including legal fees) arising out of your use of the platform or breach of these terms.
                    </Paragraph>

                    <Title level={4}>9. Governing Law and Dispute Resolution</Title>
                    <Paragraph>
                        Governing Law: These Terms and Conditions are governed by the laws of [Your Jurisdiction].
                        <br />
                        Dispute Resolution: Any disputes arising out of or related to these terms will be resolved through [Arbitration/Mediation], conducted in [Location]. You agree to submit to the jurisdiction of the courts in [Location] for any legal proceedings.
                    </Paragraph>

                    <Title level={4}>10. Changes to These Terms</Title>
                    <Paragraph>
                        We may update these Terms and Conditions at any time. The updated terms will be posted on our website, and your continued use of Showzs constitutes acceptance of the new terms.
                    </Paragraph>

                    <Title level={4}>11. Termination</Title>
                    <Paragraph>
                        We reserve the right to terminate or suspend your access to Showzs without prior notice if you violate these terms or engage in any illegal or harmful activities.
                    </Paragraph>

                    <Title level={4}>12. Contact Us</Title>
                    <Paragraph>
                        If you have any questions or concerns about these Terms and Conditions, please contact us at <b>info@sounder.com </b>.
                    </Paragraph>
                </Typography>
            </Content>
        </Layout>
        <Footer />
      </section>
    );
};

export default TermsAndConditions;
