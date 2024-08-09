import React from 'react';
import { Card, Typography, Divider } from 'antd';
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../containers/footer/Footer'

const { Title, Paragraph } = Typography;

const TermsAndConditions = () => {
  return (
    <section>
    <Navbar />
    <Card title="Terms and Conditions" bordered={false}>
      <Typography>
        <Title level={2}>1. Acceptance of Terms</Title>
        <Paragraph>
          By accessing or using our website, you confirm that you have read, understood, and agree to be bound by these Terms. If you are using the Website on behalf of a company or organization, you confirm that you have the authority to bind that entity to these Terms.
        </Paragraph>

        <Divider />

        <Title level={2}>2. Description of Services</Title>
        <Paragraph>
          Showz provides users with access to a wide range of movies and live events through an online streaming platform.
        </Paragraph>

        <Divider />

        <Title level={2}>3. Account Registration</Title>
        <Paragraph>
          To access certain features of our website, you may need to create an account. You agree to provide accurate, complete, and up-to-date information during the registration process. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
        </Paragraph>

        <Divider />

        <Title level={2}>4. Use of the Website</Title>
        <Paragraph>
          You agree to use the Website only for lawful purposes and in accordance with these Terms. You agree not to:
        </Paragraph>
        <Paragraph>
          • Use the Website in any way that violates any applicable local, state, national, or international law or regulation.<br/>
          • Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Website.<br/>
          • Use the Website to exploit, harm, or attempt to exploit or harm minors in any way.<br/>
          • Use the Website to send, knowingly receive, upload, download, use, or re-use any material that does not comply with these Terms.<br/>
          • Introduce any viruses, trojans, worms, logic bombs, or other material that is malicious or technologically harmful.
        </Paragraph>

        <Divider />

        <Title level={2}>5. Content</Title>
        <Paragraph>
          The content on our Website, including but not limited to text, graphics, logos, images, and software (collectively, "Content"), is the property of Showz or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the Content, except as expressly permitted in these Terms.
        </Paragraph>

        <Divider />

        <Title level={2}>6. Subscription and Payment</Title>
        <Paragraph>
          Some features of our Website may require a paid subscription. By subscribing to our services, you agree to pay the charges. All payments are non-refundable unless otherwise specified in these Terms. We reserve the right to change our subscription plans or fees at any time.
        </Paragraph>

        <Divider />

        <Title level={2}>7. User-Generated Content</Title>
        <Paragraph>
          You may have the opportunity to post, submit, or otherwise make available content on our Website ("User-Generated Content"). You retain ownership of your User-Generated Content, but you grant us a worldwide, non-exclusive, royalty-free, perpetual, irrevocable license to use, reproduce, modify, distribute, display, and perform your User-Generated Content in connection with our Website.
        </Paragraph>
        <Paragraph>
          You represent and warrant that you own or have the necessary rights to post your User-Generated Content and that your User-Generated Content does not violate these Terms or any applicable law.
        </Paragraph>

        <Divider />

        <Title level={2}>8. Third-Party Links</Title>
        <Paragraph>
          Our Website may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You access any third-party websites or services at your own risk.
        </Paragraph>

        <Divider />

        <Title level={2}>9. Termination</Title>
        <Paragraph>
          We reserve the right to terminate or suspend your account and access to our Website at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users of the Website, us, or third parties, or for any other reason.
        </Paragraph>

        <Divider />

        <Title level={2}>11. Limitation of Liability</Title>
        <Paragraph>
          In no event shall Showz, its affiliates, or their respective officers, directors, employees, agents, or licensors be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Website, even if we have been advised of the possibility of such damages.
        </Paragraph>

        <Divider />

        <Title level={2}>13. Governing Law</Title>
        <Paragraph>
          These Terms shall be governed by and construed in accordance with the laws of [Insert Country/State], without regard to its conflict of law principles. Any legal action or proceeding arising under these Terms shall be brought exclusively in the courts located in [Insert Jurisdiction], and you consent to the jurisdiction of such courts.
        </Paragraph>

        <Divider />

        <Title level={2}>14. Changes to These Terms</Title>
        <Paragraph>
          We may update these Terms from time to time in our sole discretion. If we make material changes to these Terms, we will notify you by posting the updated Terms on our Website or through other communications. Your continued use of the Website following the posting of changes constitutes your acceptance of such changes.
        </Paragraph>

        <Divider />

        <Title level={2}>15. Contact Us</Title>
        <Paragraph>
          If you have any questions about these Terms, please contact us at: [Showz Website Name, email].
        </Paragraph>
      </Typography>
    </Card>
    <Footer/> 
    </section>
  );
};

export default TermsAndConditions;
