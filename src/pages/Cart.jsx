import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../utils/CartContext';
import { formatCurrency } from '../utils/currency';

const PageContainer = styled.div`
  padding: 30px 0;
`;

const PageTitle = styled.h1`
  margin-bottom: 30px;
  font-size: 28px;
`;

const CartContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const CartItem = styled.div`
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ItemImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 20px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
    margin-right: 0;
    margin-bottom: 15px;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ItemName = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`;

const ItemPrice = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
`;

const ItemOptions = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  flex-wrap: wrap;
  
  div {
    background-color: #f8f9fa;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 14px;
  }
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: auto;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const QuantityDisplay = styled.span`
  width: 40px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  font-weight: 500;
`;

const RemoveButton = styled.button`
  color: #dc3545;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CartSummary = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: fit-content;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SummaryLabel = styled.span`
  font-weight: 500;
`;

const SummaryValue = styled.span`
  font-weight: 500;
`;

const TotalRow = styled(SummaryRow)`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
`;

const FreeShippingMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
`;

const CheckoutButton = styled(Link)`
  display: block;
  text-align: center;
  padding: 15px;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  font-weight: 600;
  margin: 20px 0;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
    color: white;
    text-decoration: none;
  }
`;

const ContinueShopping = styled(Link)`
  display: block;
  text-align: center;
  padding: 12px;
  border: 1px solid #007bff;
  color: #007bff;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #007bff;
    color: white;
    text-decoration: none;
  }
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 50px 0;
  
  h2 {
    margin-bottom: 20px;
    color: #666;
  }
`;

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  
  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    updateQuantity(item.id, item.selectedOptions, newQuantity);
  };
  
  const handleRemoveItem = (item) => {
    removeFromCart(item.id, item.selectedOptions);
  };
  
  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? (subtotal > 5000 ? 0 : 499) : 0;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;
  
  if (cart.length === 0) {
    return (
      <PageContainer>
        <div className="container">
          <PageTitle>Shopping Cart</PageTitle>
          <EmptyCartMessage>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet</p>
            <ContinueShopping to="/products">Continue Shopping</ContinueShopping>
          </EmptyCartMessage>
        </div>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <div className="container">
        <PageTitle>Shopping Cart</PageTitle>
        
        <CartContainer>
          <CartItems>
            {cart.map((item, index) => (
              <CartItem key={`${item.id}-${index}`}>
                <ItemImage>
                  <img src={item.image} alt={item.name} />
                </ItemImage>
                
                <ItemDetails>
                  <ItemHeader>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>{formatCurrency(item.price * item.quantity)}</ItemPrice>
                  </ItemHeader>
                  
                  <ItemOptions>
                    {item.selectedOptions?.color && <div>Color: {item.selectedOptions.color}</div>}
                    {item.selectedOptions?.size && <div>Size: {item.selectedOptions.size}</div>}
                  </ItemOptions>
                  
                  <ItemActions>
                    <QuantitySelector>
                      <QuantityButton onClick={() => handleQuantityChange(item, -1)}>-</QuantityButton>
                      <QuantityDisplay>{item.quantity}</QuantityDisplay>
                      <QuantityButton onClick={() => handleQuantityChange(item, 1)}>+</QuantityButton>
                    </QuantitySelector>
                    
                    <RemoveButton onClick={() => handleRemoveItem(item)}>
                      <i className="fas fa-trash"></i> Remove
                    </RemoveButton>
                  </ItemActions>
                </ItemDetails>
              </CartItem>
            ))}
          </CartItems>
          
          <CartSummary>
            <h2>Order Summary</h2>
            
            <SummaryRow>
              <SummaryLabel>Subtotal</SummaryLabel>
              <SummaryValue>{formatCurrency(subtotal)}</SummaryValue>
            </SummaryRow>
            
            <SummaryRow>
              <SummaryLabel>Shipping</SummaryLabel>
              <SummaryValue>{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</SummaryValue>
            </SummaryRow>
            
            <SummaryRow>
              <SummaryLabel>Shipping</SummaryLabel>
              <SummaryValue>${shipping === 0 ? 'FREE' : shipping.toFixed(2)}</SummaryValue>
            </SummaryRow>
            
            <SummaryRow>
              <SummaryLabel>Tax</SummaryLabel>
              <SummaryValue>${tax.toFixed(2)}</SummaryValue>
            </SummaryRow>
            
            <TotalRow>
              <SummaryLabel>Total</SummaryLabel>
              <SummaryValue>${total.toFixed(2)}</SummaryValue>
            </TotalRow>
            
            <CheckoutButton to="/checkout">Proceed to Checkout</CheckoutButton>
            <ContinueShopping to="/products">Continue Shopping</ContinueShopping>
          </CartSummary>
        </CartContainer>
      </div>
    </PageContainer>
  );
};

export default Cart;