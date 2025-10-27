import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 30px 0;
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
`;

const OrderSummaryContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background-color: #28a745;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-size: 40px;
`;

const OrderNumber = styled.div`
  font-size: 20px;
  margin-bottom: 30px;
  
  span {
    font-weight: bold;
    color: #007bff;
  }
`;

const OrderDetails = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: left;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  font-weight: 500;
`;

const DetailValue = styled.span`
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContinueShopping = styled(Link)`
  padding: 15px 30px;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
    color: white;
    text-decoration: none;
  }
  
  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const ViewOrder = styled(Link)`
  padding: 15px 30px;
  border: 1px solid #007bff;
  color: #007bff;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #007bff;
    color: white;
    text-decoration: none;
  }
  
  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const OrderSummary = () => {
  // Sample order data
  const orderData = {
    orderNumber: 'ORD-2025-001234',
    date: 'October 27, 2025',
    total: '$309.97',
    paymentMethod: 'Credit Card (**** **** **** 1234)',
    shippingAddress: 'John Doe, 123 Main St, New York, NY 10001'
  };
  
  return (
    <PageContainer>
      <div className="container">
        <PageTitle>Order Confirmation</PageTitle>
        
        <OrderSummaryContainer>
          <SuccessIcon>
            <i className="fas fa-check"></i>
          </SuccessIcon>
          
          <h2>Thank You for Your Order!</h2>
          <p>Your order has been received and is being processed.</p>
          
          <OrderNumber>
            Order Number: <span>{orderData.orderNumber}</span>
          </OrderNumber>
          
          <OrderDetails>
            <DetailRow>
              <DetailLabel>Order Date</DetailLabel>
              <DetailValue>{orderData.date}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Total</DetailLabel>
              <DetailValue>{orderData.total}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Payment Method</DetailLabel>
              <DetailValue>{orderData.paymentMethod}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Shipping Address</DetailLabel>
              <DetailValue>{orderData.shippingAddress}</DetailValue>
            </DetailRow>
          </OrderDetails>
          
          <p>A confirmation email has been sent to your email address.</p>
          
          <ActionButtons>
            <ContinueShopping to="/products">Continue Shopping</ContinueShopping>
            <ViewOrder to="/profile">View Order Details</ViewOrder>
          </ActionButtons>
        </OrderSummaryContainer>
      </div>
    </PageContainer>
  );
};

export default OrderSummary;