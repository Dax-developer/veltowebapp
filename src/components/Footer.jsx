import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLanguage } from '../utils/LanguageContext';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
  color: white;
  padding: 60px 0 20px;
  margin-top: 80px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 30px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    gap: 25px;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FooterColumn = styled.div`
  h3 {
    margin-bottom: 20px;
    font-size: 18px;
    position: relative;
    padding-bottom: 10px;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 2px;
      background-color: #007bff;
    }
  }
  
  ul {
    li {
      margin-bottom: 10px;
      
      a {
        color: #ccc;
        transition: color 0.3s ease;
        
        &:hover {
          color: #007bff;
        }
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    color: white;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    &:hover {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      transform: translateY(-4px) scale(1.1);
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
      border-color: transparent;
    }
  }
  
  @media (max-width: 576px) {
    justify-content: center;
    
    a {
      width: 40px;
      height: 40px;
    }
  }
`;

const Newsletter = styled.div`
  input {
    width: 100%;
    padding: 12px 16px;
    margin-bottom: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
    
    &:focus {
      outline: none;
      border-color: #667eea;
      background: rgba(255, 255, 255, 0.15);
    }
  }
  
  button {
    width: 100%;
    padding: 12px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
    }
    
    @media (max-width: 576px) {
      padding: 14px;
    }
  }
  
  @media (max-width: 576px) {
    input {
      padding: 14px;
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #444;
  color: #ccc;
  font-size: 14px;
  
  @media (max-width: 576px) {
    font-size: 13px;
    padding-top: 15px;
  }
`;

const Footer = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError(t('pleaseEnterEmail'));
      return;
    }
    
    if (!validateEmail(email)) {
      setError(t('pleaseEnterValidEmail'));
      return;
    }
    
    // In a real application, you would send this to your backend
    // For now, we'll just store it in localStorage and show success
    const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
    
    // Check if email is already subscribed
    if (subscribers.includes(email)) {
      setError(t('emailAlreadySubscribed'));
      return;
    }
    
    // Add new subscriber
    subscribers.push(email);
    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
    
    // Show success message
    setIsSubscribed(true);
    setError('');
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 3000);
  };
  
  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <FooterColumn>
            <h3>Velto</h3>
            <p>
              {t('brandDesc')}
            </p>
            <SocialLinks>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
              </a>
            </SocialLinks>
          </FooterColumn>
          
          <FooterColumn>
            <h3>{t('quickLinks')}</h3>
            <ul>
              <li><Link to="/">{t('home')}</Link></li>
              <li><Link to="/products">{t('products')}</Link></li>
              <li><Link to="/contact">{t('contact')}</Link></li>
              <li><Link to="/profile">{t('myAccount')}</Link></li>
            </ul>
          </FooterColumn>
          
          <FooterColumn>
            <h3>{t('customerService')}</h3>
            <ul>
              <li><Link to="/contact">{t('contactUs')}</Link></li>
              <li><Link to="#">{t('faqs')}</Link></li>
              <li><Link to="#">{t('shippingPolicy')}</Link></li>
              <li><Link to="#">{t('returnsExchanges')}</Link></li>
              <li><Link to="#">{t('privacyPolicy')}</Link></li>
            </ul>
          </FooterColumn>
          
          <FooterColumn>
            <h3>{t('newsletter')}</h3>
            <p>{t('newsletterDesc')}</p>
            <Newsletter>
              {isSubscribed ? (
                <div style={{ color: '#4ade80', fontWeight: '600', textAlign: 'center', padding: '12px' }}>
                  {t('subscriptionSuccess')}
                </div>
              ) : (
                <form onSubmit={handleSubscribe}>
                  <input 
                    type="email" 
                    placeholder={t('yourEmail')} 
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                  />
                  {error && (
                    <div style={{ color: '#ef4444', fontSize: '13px', margin: '5px 0' }}>
                      {error}
                    </div>
                  )}
                  <button type="submit">{t('subscribe')}</button>
                </form>
              )}
            </Newsletter>
          </FooterColumn>
        </FooterContent>
        
        <FooterBottom>
          <p>&copy; 2025 Velto. {t('allRightsReserved')}.</p>
        </FooterBottom>
      </div>
    </FooterContainer>
  );
};

export default Footer;