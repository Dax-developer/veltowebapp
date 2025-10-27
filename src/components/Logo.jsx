import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  
  &::before {
    content: '🛒';
    font-size: 20px;
  }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  
  .brand-name {
    font-size: 24px;
    font-weight: 800;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.5px;
  }
  
  .tagline {
    font-size: 9px;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: -2px;
  }
`;

const Logo = ({ showTagline = false }) => {
  return (
    <LogoContainer>
      <LogoIcon />
      <LogoText>
        <span className="brand-name">Velto</span>
        {showTagline && <span className="tagline">Shop Smarter</span>}
      </LogoText>
    </LogoContainer>
  );
};

export default Logo;
