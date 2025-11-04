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

const ReturnsExchanges = () => {
  return (
    <PageContainer>
      <div className="container">
        <PageTitle>Returns & Exchanges Policy</PageTitle>
        
        <PolicyContainer>
          <PolicySection>
            <SectionTitle>Our Return & Exchange Promise</SectionTitle>
            <PolicyText>
              At Velto, your satisfaction is our priority. We want you to be completely happy with your purchase. 
              If for any reason you are not satisfied, we offer a hassle-free return and exchange process.
            </PolicyText>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Return Policy</SectionTitle>
            <PolicyText>
              You may return most new, unopened items within 30 days of delivery for a full refund. 
              We'll also pay the return shipping costs if the return is a result of our error 
              (you received an incorrect or defective item, etc.).
            </PolicyText>
            
            <List>
              <li>Items must be in original condition with all tags and packaging</li>
              <li>Proof of purchase is required</li>
              <li>Return requests must be initiated within 30 days of delivery</li>
              <li>Refunds will be processed within 7-10 business days</li>
            </List>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Non-Returnable Items</SectionTitle>
            <List>
              <li>Perishable goods (food, flowers, etc.)</li>
              <li>Personal care items (beauty products, intimate wear, etc.)</li>
              <li>Custom or personalized items</li>
              <li>Gift cards</li>
              <li>Downloadable software products</li>
              <li>Some health and hygiene products</li>
            </List>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Exchange Policy</SectionTitle>
            <PolicyText>
              If you wish to exchange an item for a different size, color, or model, you can do so within 30 days 
              of receiving your order. Exchanges are subject to product availability.
            </PolicyText>
            
            <List>
              <li>Exchanges are free of charge</li>
              <li>Same or higher value items only</li>
              <li>If exchanging for a lower value item, the difference will be refunded</li>
              <li>Original shipping charges are non-refundable</li>
            </List>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>How to Initiate a Return or Exchange</SectionTitle>
            <List>
              <li>Log into your account and go to "My Orders"</li>
              <li>Select the order and item you wish to return/exchange</li>
              <li>Fill out the return/exchange form with reason and details</li>
              <li>Print the return label and attach it to your package</li>
              <li>Drop off the package at the nearest pickup point</li>
            </List>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Refund Process</SectionTitle>
            <PolicyText>
              Once we receive your returned item, we will process your refund within 7-10 business days. 
              Refunds will be issued to the original payment method.
            </PolicyText>
            
            <List>
              <li>Credit card refunds: 7-10 business days to appear on your statement</li>
              <li>Debit card refunds: 10-15 business days</li>
              <li>Net banking refunds: 5-7 business days</li>
              <li>Digital wallet refunds: 24-48 hours</li>
            </List>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Damaged or Defective Items</SectionTitle>
            <PolicyText>
              If you receive a damaged or defective item, please contact us within 7 days of delivery. 
              We will arrange for a replacement or refund at no additional cost to you.
            </PolicyText>
            
            <List>
              <li>Provide photos of the damaged item and packaging</li>
              <li>We will arrange for a pickup at no cost</li>
              <li>Replacement will be sent immediately upon pickup</li>
              <li>Full refund if replacement is not available</li>
            </List>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Wrong Item Received</SectionTitle>
            <PolicyText>
              If you receive an item that wasn't ordered, please contact our customer service team immediately. 
              We will arrange for a pickup and send the correct item at no additional cost.
            </PolicyText>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Final Sale Items</SectionTitle>
            <PolicyText>
              Certain items marked as "Final Sale" or "Non-Returnable" cannot be returned or exchanged. 
              These items are clearly marked at the time of purchase.
            </PolicyText>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Contact Information</SectionTitle>
            <PolicyText>
              For any questions about our return and exchange policy, please contact our customer service team:
            </PolicyText>
            <List>
              <li>Email: returns@veltowebapp.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Timing: Monday to Saturday, 9:00 AM to 8:00 PM</li>
            </List>
          </PolicySection>
          
          <BackLink to="/">← Back to Home</BackLink>
        </PolicyContainer>
      </div>
    </PageContainer>
  );
};

export default ReturnsExchanges;