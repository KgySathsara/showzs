import React from 'react';
import { Typography, Layout, Divider } from 'antd';
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../containers/footer/Footer'

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
                <Typography>
                    <Paragraph>
                        Welcome to Showz Movie! These terms and conditions outline the rules and regulations for the use of Showz Movie's Website.
                    </Paragraph>

                    <Title level={4}>1. Acceptance of Terms</Title>
                    <Paragraph>
                        By accessing this website, we assume you accept these terms and conditions. Do not continue to use Showz Movie if you do not agree 
                        to take all of the terms and conditions stated on this page.
                    </Paragraph>

                    <Title level={4}>2. Cookies</Title>
                    <Paragraph>
                        We employ the use of cookies. By accessing Showz Movie, you agreed to use cookies in agreement with the Showz Movie's Privacy Policy.
                    </Paragraph>

                    <Title level={4}>3. License</Title>
                    <Paragraph>
                        Unless otherwise stated, Showz Movie and/or its licensors own the intellectual property rights for all material on Showz Movie. 
                        All intellectual property rights are reserved. You may access this from Showz Movie for your own personal use subjected to 
                        restrictions set in these terms and conditions.
                    </Paragraph>

                    <Title level={4}>4. User Comments</Title>
                    <Paragraph>
                        Certain parts of this website offer the opportunity for users to post and exchange opinions and information in certain areas of the website. 
                        Showz Movie does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Showz Movie, its agents, and/or affiliates.
                    </Paragraph>

                    <Title level={4}>5. Content Liability</Title>
                    <Paragraph>
                        We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that are rising on your Website.
                    </Paragraph>

                    <Title level={4}>6. Termination</Title>
                    <Paragraph>
                        We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </Paragraph>

                    <Title level={4}>7. Governing Law</Title>
                    <Paragraph>
                        These terms and conditions are governed by and construed in accordance with the laws of [Your Country] and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                    </Paragraph>
                </Typography>
            </Content>
        </Layout>
                <Footer/> 
        </section>
    );
};

export default TermsAndConditions;
