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

const ShippingPolicy = () => {
  return (
    <PageContainer>
      <div className="container">
        <PageTitle>Shipping Policy</PageTitle>
        
        <PolicyContainer>
          <PolicySection>
            <SectionTitle>Our Shipping Commitment</SectionTitle>
            <PolicyText>
              At Velto, we are committed to delivering your orders quickly and efficiently across India. 
              This Shipping Policy outlines our shipping practices, delivery times, and charges to ensure 
              you have a transparent and satisfying shopping experience.
            </PolicyText>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Shipping Areas</SectionTitle>
            <PolicyText>
              We currently ship to all states and union territories within India. 
              Our delivery network covers over 29,000 pin codes across the country.
            </PolicyText>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Shipping Charges</SectionTitle>
            <List>
              <li>Free shipping on orders above ₹499</li>
              <li>₹49 shipping charge for orders below ₹499</li>
              <li>Express delivery: Additional ₹99 (1-2 business days)</li>
              <li>Same-day delivery in select metro cities: ₹199</li>
            </List>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Delivery Timeframes</SectionTitle>
            <List>
              <li>Metro cities: 1-3 business days</li>
              <li>Urban areas: 2-4 business days</li>
              <li>Rural/remote areas: 4-7 business days</li>
              <li>Express delivery: 1-2 business days</li>
              <li>Same-day delivery: Within 4-6 hours (select locations only)</li>
            </List>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Order Processing Time</SectionTitle>
            <PolicyText>
              All orders are processed within 1-2 business days (excluding weekends and holidays) 
              after receiving your order confirmation email. You will receive another notification 
              when your order has shipped.
            </PolicyText>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Shipping Carriers</SectionTitle>
            <PolicyText>
              We partner with leading courier companies including:
            </PolicyText>
            <List>
              <li>Blue Dart</li>
              <li>DTDC</li>
              <li>Delhivery</li>
              <li>Ecom Express</li>
              <li>India Post</li>
            </List>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Tracking Your Order</SectionTitle>
            <PolicyText>
              Once your order has been shipped, you will receive a tracking number via email and SMS. 
              You can track your order status by logging into your account or using the tracking link 
              provided in the shipment confirmation email.
            </PolicyText>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>International Shipping</SectionTitle>
            <PolicyText>
              Currently, we only ship within India. We are working on expanding our services to 
              international destinations. Please check back for updates.
            </PolicyText>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Undelivered Packages</SectionTitle>
            <PolicyText>
              If a package is undeliverable due to an incorrect address or recipient unavailability, 
              we will attempt redelivery up to two times. After that, the package will be returned 
              to our warehouse. A redelivery fee may apply for returned packages.
            </PolicyText>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Address Changes</SectionTitle>
            <PolicyText>
              If you need to change your delivery address, please contact us immediately. 
              We can update the address only if the order has not been shipped yet.
            </PolicyText>
          </PolicySection>
          
          <PolicySection>
            <SectionTitle>Lost or Damaged Packages</SectionTitle>
            <PolicyText>
              While we take great care in packaging your items, if your package is lost or damaged 
              during transit, please contact our customer service team within 7 days of the expected 
              delivery date. We will investigate the issue and provide a resolution.
            </PolicyText>
          </PolicySection>
          
          <BackLink to="/">← Back to Home</BackLink>
        </PolicyContainer>
      </div>
    </PageContainer>
  );
};

export default ShippingPolicy;