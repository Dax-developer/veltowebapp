import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { formatCurrency } from '../utils/currency';

const PageContainer = styled.div`
  padding: 60px 0;
  min-height: calc(100vh - 200px);
`;

const ThankYouContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.15);
  padding: 60px 40px;
  text-align: center;
  animation: slideUp 0.6s ease;
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SuccessIcon = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  color: white;
  font-size: 60px;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
  animation: scaleIn 0.5s ease 0.2s both;
  
  @keyframes scaleIn {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
`;

const OrderDetails = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 20%);
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 40px;
  text-align: left;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  font-weight: 500;
  color: #2d3748;
`;

const DetailValue = styled.span`
  font-weight: 600;
  color: #667eea;
`;

const OrderNumber = styled.div`
  font-size: 24px;
  margin: 30px 0;
  font-weight: 700;
  
  span {
    color: #667eea;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContinueShopping = styled(Link)`
  padding: 16px 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
    color: white;
    text-decoration: none;
  }
`;

const ViewOrder = styled(Link)`
  padding: 16px 32px;
  border: 2px solid #667eea;
  color: #667eea;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  background: white;
  
  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-decoration: none;
  }
`;

const EmailNotice = styled.p`
  color: #666;
  font-size: 14px;
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const Confetti = styled.div`
  font-size: 40px;
  position: absolute;
  animation: fall 3s linear infinite;
  
  @keyframes fall {
    to {
      transform: translateY(100vh) rotate(360deg);
    }
  }
`;

const ThankYou = () => {
  const location = useLocation();
  const { orderNumber, total, date } = location.state || {
    orderNumber: `ORD-${Date.now()}`,
    total: 0,
    date: new Date().toLocaleDateString('en-IN')
  };
  
  return (
    <PageContainer>
      <div className="container">
        <ThankYouContainer>
          <SuccessIcon>
            <i className="fas fa-check"></i>
          </SuccessIcon>
          
          <Title>Order Placed Successfully!</Title>
          <Subtitle>Thank you for shopping with ShopEase</Subtitle>
          
          <OrderNumber>
            Order Number: <span>{orderNumber}</span>
          </OrderNumber>
          
          <OrderDetails>
            <DetailRow>
              <DetailLabel>📅 Order Date</DetailLabel>
              <DetailValue>{date}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>💰 Total Amount</DetailLabel>
              <DetailValue>{formatCurrency(total)}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>📦 Delivery Status</DetailLabel>
              <DetailValue>Processing</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>🚚 Expected Delivery</DetailLabel>
              <DetailValue>3-5 Business Days</DetailValue>
            </DetailRow>
          </OrderDetails>
          
          <p style={{ color: '#666', fontSize: '16px', marginBottom: '30px' }}>
            🎉 Your order has been confirmed! We'll send you tracking details shortly.
          </p>
          
          <ActionButtons>
            <ContinueShopping to="/products">
              <i className="fas fa-shopping-bag"></i> Continue Shopping
            </ContinueShopping>
            <ViewOrder to="/profile">
              <i className="fas fa-receipt"></i> View Order Details
            </ViewOrder>
          </ActionButtons>
          
          <EmailNotice>
            📧 A confirmation email has been sent to your registered email address.
          </EmailNotice>
        </ThankYouContainer>
      </div>
    </PageContainer>
  );
};

export default ThankYou;
