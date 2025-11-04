import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  padding: 30px 0;
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
`;

const PolicyContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

const PolicySection = styled.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #007bff;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
`;

const PolicyText = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const List = styled.ul`
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
  padding-left: 20px;
  
  li {
    margin-bottom: 10px;
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  color: #007bff;
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

const PrivacyPolicy = () => {
  return (
    <PageContainer>
      <div className="container">
        <PageTitle>Privacy Policy</PageTitle>
        
        <PolicyContainer>
          <PolicySection>
            <SectionTitle>Introduction</SectionTitle>
            <PolicyText>
              Velto E-commerce Private Limited ("we," "us," or "our") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website and use our services. Please read this privacy policy carefully. 
              If you do not agree with the terms of this privacy policy, please do not access the site.
            </PolicyText>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Information We Collect</SectionTitle>
            <PolicyText>
              We collect information about you in a variety of ways when you use our website and services:
            </PolicyText>
            
            <List>
              <li><strong>Personal Information:</strong> Name, email address, phone number, postal address, payment information</li>
              <li><strong>Transaction Information:</strong> Purchase history, payment method, billing and shipping address</li>
              <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
              <li><strong>Usage Information:</strong> Pages visited, time spent on pages, links clicked, search queries</li>
              <li><strong>Location Information:</strong> General location based on IP address</li>
            </List>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>How We Use Your Information</SectionTitle>
            <PolicyText>
              We use the information we collect for various business purposes:
            </PolicyText>
            
            <List>
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations, shipping notifications, and updates</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Improve our website, products, and services</li>
              <li>Personalize your shopping experience</li>
              <li>Send promotional emails and marketing communications (with your consent)</li>
              <li>Prevent fraud and ensure security</li>
              <li>Comply with legal obligations</li>
            </List>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Information Sharing and Disclosure</SectionTitle>
            <PolicyText>
              We may share your information in the following circumstances:
            </PolicyText>
            
            <List>
              <li><strong>Service Providers:</strong> With third-party vendors who help us operate our business</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>With Your Consent:</strong> When you explicitly consent to sharing</li>
            </List>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Data Security</SectionTitle>
            <PolicyText>
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </PolicyText>
            
            <List>
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Regular security assessments and audits</li>
              <li>Secure access controls and authentication</li>
              <li>Employee training on data protection</li>
              <li>Regular monitoring of our systems</li>
            </List>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Your Data Protection Rights</SectionTitle>
            <PolicyText>
              Depending on your location, you may have the following rights regarding your personal information:
            </PolicyText>
            
            <List>
              <li><strong>Right to Access:</strong> Request copies of your personal data</li>
              <li><strong>Right to Rectification:</strong> Correct inaccurate personal data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Right to Restrict Processing:</strong> Limit how we process your data</li>
              <li><strong>Right to Data Portability:</strong> Obtain and reuse your data across services</li>
              <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
            </List>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Cookies and Tracking Technologies</SectionTitle>
            <PolicyText>
              We use cookies and similar tracking technologies to enhance your browsing experience:
            </PolicyText>
            
            <List>
              <li><strong>Essential Cookies:</strong> Necessary for website functionality</li>
              <li><strong>Performance Cookies:</strong> Analyze website performance and user behavior</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Targeting Cookies:</strong> Deliver personalized advertisements</li>
            </List>
            
            <PolicyText>
              You can control cookies through your browser settings. However, disabling cookies may affect 
              your ability to use certain features of our website.
            </PolicyText>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Third-Party Links</SectionTitle>
            <PolicyText>
              Our website may contain links to third-party websites. We are not responsible for the privacy 
              practices or content of these external sites. We encourage you to review the privacy policies 
              of any third-party websites you visit.
            </PolicyText>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Children's Privacy</SectionTitle>
            <PolicyText>
              Our website is not intended for children under 13 years of age. We do not knowingly collect 
              personal information from children under 13. If we become aware that we have collected 
              personal information from a child under 13, we will take steps to delete such information.
            </PolicyText>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Data Retention</SectionTitle>
            <PolicyText>
              We retain your personal information for as long as necessary to fulfill the purposes outlined 
              in this policy, unless a longer retention period is required or permitted by law. 
              Typically, we retain:
            </PolicyText>
            
            <List>
              <li>Account information: As long as your account is active</li>
              <li>Order records: 7 years for tax and legal purposes</li>
              <li>Marketing preferences: Until you unsubscribe</li>
              <li>Website usage data: 2 years for analytics</li>
            </List>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>International Data Transfers</SectionTitle>
            <PolicyText>
              Your information may be transferred to and maintained on computers located outside of 
              your state, province, country or other governmental jurisdiction where the data protection 
              laws may differ from those in your jurisdiction. We will take appropriate steps to ensure 
              your data is treated securely and in accordance with this privacy policy.
            </PolicyText>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Changes to This Privacy Policy</SectionTitle>
            <PolicyText>
              We may update our Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last Updated" date. 
              You are advised to review this Privacy Policy periodically for any changes.
            </PolicyText>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Contact Us</SectionTitle>
            <PolicyText>
              If you have questions or comments about this policy, please contact us at:
            </PolicyText>
            <List>
              <li>Email: privacy@veltowebapp.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: Velto E-commerce Private Limited, 123 Business Avenue, Sector 42, Gurgaon, Haryana 122002, India</li>
            </List>
          </PolicySection>
          
          <PolicyText><strong>Last Updated:</strong> November 4, 2025</PolicyText>
          
          <BackLink to="/">← Back to Home</BackLink>
        </PolicyContainer>
      </div>
    </PageContainer>
  );
};

export default PrivacyPolicy;