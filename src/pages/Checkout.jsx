import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../utils/CartContext';
import { formatCurrency } from '../utils/currency';

const PageContainer = styled.div`
  padding: 30px 0;
`;

const PageTitle = styled.h1`
  margin-bottom: 30px;
  font-size: 28px;
  text-align: center;
`;

const CheckoutContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const CheckoutForm = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

const FormSection = styled.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const PaymentMethods = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const PaymentMethod = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover, &.selected {
    border-color: #007bff;
    background-color: #f8f9fa;
  }
`;

const OrderSummary = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: fit-content;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.span`
  font-weight: 500;
`;

const ItemPrice = styled.span`
  font-weight: 500;
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

const PlaceOrderButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
  
  &:hover {
    background-color: #1e7e34;
  }
`;

const LoginPrompt = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 20px;
  
  p {
    margin-bottom: 15px;
  }
`;

const LoginRequired = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 50px auto;
  
  i {
    font-size: 80px;
    color: #667eea;
    margin-bottom: 20px;
  }
  
  h2 {
    font-size: 28px;
    margin-bottom: 15px;
    color: #333;
  }
  
  p {
    font-size: 16px;
    color: #666;
    margin-bottom: 30px;
    line-height: 1.6;
  }
  
  .buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const LoginButton = styled(Link)`
  padding: 14px 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }
`;

const SignupButton = styled(Link)`
  padding: 14px 32px;
  background: white;
  color: #667eea;
  text-decoration: none;
  border: 2px solid #667eea;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: #f8f9ff;
    transform: translateY(-2px);
  }
`;

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit');
  
  // Check if user is logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (user && user.loggedIn) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      // Pre-fill form with user data
      setFormData(prev => ({
        ...prev,
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ')[1] || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate order ID
    const orderNumber = `ORD-${Date.now()}`;
    const orderDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
    
    // Create order object
    const newOrder = {
      id: orderNumber,
      date: orderDate,
      status: 'Processing',
      total: total,
      items: cartItems.length,
      products: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image
      })),
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country
      },
      paymentMethod: selectedPaymentMethod
    };
    
    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    existingOrders.unshift(newOrder); // Add new order at the beginning
    localStorage.setItem('userOrders', JSON.stringify(existingOrders));
    
    // Clear cart and navigate to thank you page
    clearCart();
    navigate('/thank-you', { 
      state: { 
        orderNumber,
        total,
        date: orderDate,
        customer: `${formData.firstName} ${formData.lastName}`
      } 
    });
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  // Use cart data
  const cartItems = cart;
  
  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? (subtotal > 5000 ? 0 : 499) : 0;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;
  
  return (
    <PageContainer>
      <div className="container">
        {!isLoggedIn ? (
          // Show login required message if not logged in
          <LoginRequired>
            <i className="fas fa-lock"></i>
            <h2>Login Required</h2>
            <p>
              You need to be logged in to place an order.<br />
              Please login or create an account to continue with checkout.
            </p>
            <div className="buttons">
              <LoginButton to="/login">
                <i className="fas fa-sign-in-alt"></i>
                Login to Continue
              </LoginButton>
              <SignupButton to="/signup">
                <i className="fas fa-user-plus"></i>
                Create Account
              </SignupButton>
            </div>
          </LoginRequired>
        ) : (
          // Show checkout form if logged in
          <>
            <PageTitle>Checkout</PageTitle>
            
            <CheckoutContainer>
          <CheckoutForm>
            <form onSubmit={handleSubmit}>
            <LoginPrompt>
              <p>Returning customer? <Link to="/login">Click here to login</Link></p>
            </LoginPrompt>
            
            <FormSection>
              <SectionTitle>Billing Information</SectionTitle>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </FormRow>
              
              <FormGroup>
                <Label htmlFor="address">Address</Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormRow>
                <FormGroup>
                  <Label htmlFor="city">City</Label>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="state">State</Label>
                  <Input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="country">Country</Label>
                  <Select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  >
                    <option value="India">India</option>
                    <option value="USA">United States</option>
                    <option value="CAN">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AUS">Australia</option>
                  </Select>
                </FormGroup>
              </FormRow>
            </FormSection>
            
            <FormSection>
              <SectionTitle>Payment Method</SectionTitle>
              <PaymentMethods>
                <PaymentMethod 
                  className={selectedPaymentMethod === 'credit' ? 'selected' : ''}
                  onClick={() => setSelectedPaymentMethod('credit')}
                >
                  <i className="fas fa-credit-card"></i>
                  <span>Credit Card</span>
                </PaymentMethod>
                
                <PaymentMethod 
                  className={selectedPaymentMethod === 'paypal' ? 'selected' : ''}
                  onClick={() => setSelectedPaymentMethod('paypal')}
                >
                  <i className="fab fa-paypal"></i>
                  <span>PayPal</span>
                </PaymentMethod>
                
                <PaymentMethod 
                  className={selectedPaymentMethod === 'cod' ? 'selected' : ''}
                  onClick={() => setSelectedPaymentMethod('cod')}
                >
                  <i className="fas fa-money-bill-wave"></i>
                  <span>Cash on Delivery</span>
                </PaymentMethod>
              </PaymentMethods>
              
              {selectedPaymentMethod === 'credit' && (
                <>
                  <FormRow>
                    <FormGroup>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </FormRow>
                  
                  <FormRow>
                    <FormGroup>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        type="text"
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </FormRow>
                  
                  <FormGroup>
                    <Label htmlFor="nameOnCard">Name on Card</Label>
                    <Input
                      type="text"
                      id="nameOnCard"
                      name="nameOnCard"
                      value={formData.nameOnCard}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </>
              )}
            </FormSection>
            
            <PlaceOrderButton type="submit">Place Order</PlaceOrderButton>
            </form>
          </CheckoutForm>
          
          <OrderSummary>
            <h2>Order Summary</h2>
            
            {cartItems.map(item => (
              <SummaryItem key={item.id}>
                <ItemName>{item.name} × {item.quantity}</ItemName>
                <ItemPrice>{formatCurrency(item.price * item.quantity)}</ItemPrice>
              </SummaryItem>
            ))}
            
            <SummaryRow>
              <SummaryLabel>Subtotal</SummaryLabel>
              <SummaryValue>{formatCurrency(subtotal)}</SummaryValue>
            </SummaryRow>
            
            <SummaryRow>
              <SummaryLabel>Shipping</SummaryLabel>
              <SummaryValue>{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</SummaryValue>
            </SummaryRow>
            
            <SummaryRow>
              <SummaryLabel>Tax (18%)</SummaryLabel>
              <SummaryValue>{formatCurrency(tax)}</SummaryValue>
            </SummaryRow>
            
            <TotalRow>
              <SummaryLabel>Total</SummaryLabel>
              <SummaryValue>{formatCurrency(total)}</SummaryValue>
            </TotalRow>
          </OrderSummary>
        </CheckoutContainer>
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default Checkout;