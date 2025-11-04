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

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

const FAQSection = styled.div`
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

const FAQItem = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const Question = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
  display: flex;
  align-items: flex-start;
  
  &::before {
    content: 'Q:';
    color: #007bff;
    font-weight: bold;
    margin-right: 10px;
  }
`;

const Answer = styled.p`
  color: #666;
  line-height: 1.6;
  margin-left: 25px;
  
  &::before {
    content: 'A:';
    color: #28a745;
    font-weight: bold;
    margin-right: 10px;
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

const FAQ = () => {
  return (
    <PageContainer>
      <div className="container">
        <PageTitle>Frequently Asked Questions</PageTitle>
        
        <FAQContainer>
          <FAQSection>
            <SectionTitle>General Questions</SectionTitle>
            
            <FAQItem>
              <Question>What is Velto?</Question>
              <Answer>
                Velto is a leading e-commerce platform in India that offers a wide range of products at competitive prices. 
                We focus on providing quality products, excellent customer service, and fast delivery across the country.
              </Answer>
            </FAQItem>
            
            <FAQItem>
              <Question>How do I create an account?</Question>
              <Answer>
                You can create an account by clicking on the "Sign Up" button at the top right corner of our website. 
                Fill in your details, verify your email address, and you're ready to shop with us!
              </Answer>
            </FAQItem>
            
            <FAQItem>
              <Question>Is my personal information secure?</Question>
              <Answer>
                Yes, we take your privacy seriously. All your personal information is encrypted and stored securely. 
                We never share your information with third parties without your consent. 
                Please read our Privacy Policy for more details.
              </Answer>
            </FAQItem>
          </FAQSection>
          
          <FAQSection>
            <SectionTitle>Ordering & Payment</SectionTitle>
            
            <FAQItem>
              <Question>What payment methods do you accept?</Question>
              <Answer>
                We accept all major credit cards (Visa, MasterCard, American Express), debit cards, net banking, 
                UPI payments, and popular digital wallets like Paytm, PhonePe, and Google Pay.
              </Answer>
            </FAQItem>
            
            <FAQItem>
              <Question>How can I track my order?</Question>
              <Answer>
                Once your order is shipped, you'll receive an email with tracking information. 
                You can also log into your account and go to "My Orders" to track your shipment status.
              </Answer>
            </FAQItem>
            
            <FAQItem>
              <Question>Can I cancel or modify my order?</Question>
              <Answer>
                You can cancel your order before it's shipped by logging into your account and going to "My Orders". 
                If your order has already been shipped, please contact our customer service team for assistance.
              </Answer>
            </FAQItem>
          </FAQSection>
          
          <FAQSection>
            <SectionTitle>Shipping & Delivery</SectionTitle>
            
            <FAQItem>
              <Question>How long does delivery take?</Question>
              <Answer>
                Delivery times vary based on your location. Most metropolitan areas receive deliveries within 1-3 business days. 
                Remote areas may take 3-7 business days. Express delivery options are also available at checkout.
              </Answer>
            </FAQItem>
            
            <FAQItem>
              <Question>Do you ship internationally?</Question>
              <Answer>
                Currently, we only ship within India. We're working on expanding our services to other countries. 
                Please check back soon for international shipping options.
              </Answer>
            </FAQItem>
            
            <FAQItem>
              <Question>What are the shipping charges?</Question>
              <Answer>
                We offer free shipping on orders above ₹499. For orders below ₹499, a nominal shipping charge of ₹49 applies. 
                Express delivery options are available at an additional cost.
              </Answer>
            </FAQItem>
          </FAQSection>
          
          <BackLink to="/">← Back to Home</BackLink>
        </FAQContainer>
      </div>
    </PageContainer>
  );
};

export default FAQ;