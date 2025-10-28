import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const ForgotPasswordCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 40px;
  width: 100%;
  max-width: 450px;
  animation: slideUp 0.5s ease;
  
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

const Logo = styled.div`
  text-align: center;
  margin-bottom: 30px;
  
  h1 {
    font-size: 32px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 8px;
  }
  
  p {
    color: #666;
    font-size: 16px;
  }
`;

const Form = styled.form`
  margin-top: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  padding-left: ${props => props.hasIcon ? '45px' : '16px'};
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  }
  
  &.error {
    border-color: #ef4444;
  }
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const InputIcon = styled.i`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 18px;
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 13px;
  margin-top: 6px;
  display: block;
`;

const SuccessMessage = styled.div`
  padding: 12px 16px;
  background: #10b981;
  color: white;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  
  i {
    font-size: 20px;
  }
`;

const InfoMessage = styled.div`
  padding: 12px 16px;
  background: #3b82f6;
  color: white;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  
  i {
    font-size: 20px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const BackToLogin = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

const StepsIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 12px;
    left: 0;
    right: 0;
    height: 2px;
    background: #e0e0e0;
    z-index: 1;
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  position: relative;
  
  .step-number {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${props => props.active ? '#667eea' : props.completed ? '#10b981' : '#e0e0e0'};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  .step-label {
    font-size: 12px;
    color: ${props => props.active ? '#333' : props.completed ? '#10b981' : '#999'};
    font-weight: ${props => props.active ? '600' : 'normal'};
  }
`;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Enter email, 2: Enter code, 3: Reset password
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    
    if (!email) {
      setErrors({ email: 'Email is required' });
      return;
    }
    
    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }
    
    // Check if user exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some(user => user.email === email);
    
    if (!userExists) {
      setErrors({ email: 'No account found with this email address' });
      return;
    }
    
    // Generate a 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    
    // In a real app, you would send this code to the user's email
    // For demo purposes, we'll show it in an info message
    setInfoMessage(`Verification code (for demo purposes): ${code}`);
    setStep(2);
  };
  
  const handleCodeSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    
    if (!verificationCode) {
      setErrors({ code: 'Verification code is required' });
      return;
    }
    
    if (verificationCode !== generatedCode) {
      setErrors({ code: 'Invalid verification code' });
      return;
    }
    
    setStep(3);
  };
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    
    if (!newPassword) {
      setErrors({ password: 'Password is required' });
      return;
    }
    
    if (newPassword.length < 6) {
      setErrors({ password: 'Password must be at least 6 characters long' });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }
    
    setIsLoading(true);
    
    // Update user's password in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(user => 
      user.email === email ? { ...user, password: newPassword } : user
    );
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Show success message and redirect to login
    setSuccessMessage('Password reset successfully!');
    
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };
  
  const handleResendCode = () => {
    // Generate a new 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    
    // In a real app, you would send this code to the user's email
    setInfoMessage(`New verification code (for demo purposes): ${code}`);
  };
  
  return (
    <PageContainer>
      <ForgotPasswordCard>
        <Logo>
          <h1>Reset Password</h1>
          <p>Follow the steps to reset your password</p>
        </Logo>
        
        <StepsIndicator>
          <Step active={step === 1} completed={step > 1}>
            <div className="step-number">1</div>
            <div className="step-label">Email</div>
          </Step>
          <Step active={step === 2} completed={step > 2}>
            <div className="step-number">2</div>
            <div className="step-label">Code</div>
          </Step>
          <Step active={step === 3} completed={step > 3}>
            <div className="step-number">3</div>
            <div className="step-label">Password</div>
          </Step>
        </StepsIndicator>
        
        {successMessage && (
          <SuccessMessage>
            <i className="fas fa-check-circle"></i>
            {successMessage}
          </SuccessMessage>
        )}
        
        {infoMessage && (
          <InfoMessage>
            <i className="fas fa-info-circle"></i>
            {infoMessage}
          </InfoMessage>
        )}
        
        {step === 1 && (
          <Form onSubmit={handleEmailSubmit}>
            <FormGroup>
              <Label htmlFor="email">Email Address</Label>
              <InputWrapper>
                <InputIcon className="fas fa-envelope"></InputIcon>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  hasIcon
                  className={errors.email ? 'error' : ''}
                />
              </InputWrapper>
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>
            
            <SubmitButton type="submit">
              Send Verification Code
            </SubmitButton>
          </Form>
        )}
        
        {step === 2 && (
          <Form onSubmit={handleCodeSubmit}>
            <FormGroup>
              <Label htmlFor="code">Verification Code</Label>
              <InputWrapper>
                <InputIcon className="fas fa-key"></InputIcon>
                <Input
                  type="text"
                  id="code"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  hasIcon
                  className={errors.code ? 'error' : ''}
                />
              </InputWrapper>
              {errors.code && <ErrorMessage>{errors.code}</ErrorMessage>}
            </FormGroup>
            
            <SubmitButton type="submit">
              Verify Code
            </SubmitButton>
            
            <BackToLogin to="#" onClick={(e) => {
              e.preventDefault();
              handleResendCode();
            }}>
              Resend Code
            </BackToLogin>
          </Form>
        )}
        
        {step === 3 && (
          <Form onSubmit={handlePasswordSubmit}>
            <FormGroup>
              <Label htmlFor="newPassword">New Password</Label>
              <InputWrapper>
                <InputIcon className="fas fa-lock"></InputIcon>
                <Input
                  type="password"
                  id="newPassword"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  hasIcon
                  className={errors.password ? 'error' : ''}
                />
              </InputWrapper>
              {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <InputWrapper>
                <InputIcon className="fas fa-lock"></InputIcon>
                <Input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  hasIcon
                  className={errors.confirmPassword ? 'error' : ''}
                />
              </InputWrapper>
              {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
            </FormGroup>
            
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </SubmitButton>
          </Form>
        )}
        
        <BackToLogin to="/login">
          <i className="fas fa-arrow-left"></i> Back to Login
        </BackToLogin>
      </ForgotPasswordCard>
    </PageContainer>
  );
};

export default ForgotPassword;