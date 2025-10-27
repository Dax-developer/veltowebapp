import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../utils/CartContext';
import { useLanguage } from '../utils/LanguageContext';
import Logo from './Logo';

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 30px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-weight: 600;
  font-size: 15px;
  position: relative;
  transition: color 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #667eea;
    
    &::after {
      width: 100%;
    }
  }
`;

const Icons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const IconLink = styled(Link)`
  position: relative;
  font-size: 22px;
  color: #2d3748;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  
  &:hover {
    color: #667eea;
    background-color: rgba(102, 126, 234, 0.1);
    transform: translateY(-2px);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const UserMenu = styled.div`
  position: relative;
  
  button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
    
    i {
      font-size: 16px;
    }
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  min-width: 200px;
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 1000;
  
  a, button {
    display: block;
    padding: 12px 20px;
    color: #333;
    text-decoration: none;
    transition: all 0.2s ease;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    font-size: 14px;
    
    &:hover {
      background: #f8f9ff;
      color: #667eea;
    }
    
    i {
      margin-right: 10px;
      width: 16px;
    }
    
    &.logout {
      color: #ef4444;
      border-top: 1px solid #eee;
      
      &:hover {
        background: #fef2f2;
      }
    }
  }
`;

const MobileMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  
  ul {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { getCartItemCount } = useCart();
  const { t } = useLanguage();
  
  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    setCurrentUser(user);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setUserMenuOpen(false);
    window.location.href = '/';
  };
  
  return (
    <HeaderContainer>
      <div className="container">
        <Nav>
          <LogoLink to="/">
            <Logo />
          </LogoLink>
          
          <NavLinks>
            <li><NavLink to="/">{t('home')}</NavLink></li>
            <li><NavLink to="/products">{t('products')}</NavLink></li>
            <li><NavLink to="/profile">{t('myAccount')}</NavLink></li>
            <li><NavLink to="/contact">{t('contact')}</NavLink></li>
          </NavLinks>
          
          <Icons>
            {currentUser ? (
              <UserMenu>
                <button onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  <i className="fas fa-user-circle"></i>
                  {currentUser.name}
                  <i className="fas fa-chevron-down" style={{fontSize: '12px'}}></i>
                </button>
                <Dropdown isOpen={userMenuOpen}>
                  <Link to="/profile" onClick={() => setUserMenuOpen(false)}>
                    <i className="fas fa-user"></i>{t('profile')}
                  </Link>
                  <Link to="/profile" onClick={() => setUserMenuOpen(false)}>
                    <i className="fas fa-shopping-bag"></i>{t('myOrders')}
                  </Link>
                  <Link to="/profile" onClick={() => setUserMenuOpen(false)}>
                    <i className="fas fa-heart"></i>{t('wishlist')}
                  </Link>
                  <button className="logout" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i>Logout
                  </button>
                </Dropdown>
              </UserMenu>
            ) : (
              <IconLink to="/login" title="Login">
                <i className="fas fa-user"></i>
              </IconLink>
            )}
            <IconLink to="/cart" title="Shopping Cart">
              <i className="fas fa-shopping-cart"></i>
              {getCartItemCount() > 0 && <Badge>{getCartItemCount()}</Badge>}
            </IconLink>
            <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <i className="fas fa-bars"></i>
            </MobileMenuButton>
          </Icons>
        </Nav>
        
        <MobileMenu isOpen={isMobileMenuOpen}>
          <ul>
            <li><NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>{t('home')}</NavLink></li>
            <li><NavLink to="/products" onClick={() => setIsMobileMenuOpen(false)}>{t('products')}</NavLink></li>
            <li><NavLink to="/profile" onClick={() => setIsMobileMenuOpen(false)}>{t('myAccount')}</NavLink></li>
            <li><NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>{t('contact')}</NavLink></li>
          </ul>
        </MobileMenu>
      </div>
    </HeaderContainer>
  );
};

export default Header;