import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 30px 0;
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
`;

const ContentSection = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #007bff;
`;

const SectionText = styled.p`
  color: #666;
  line-height: 1.8;
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 40px 0;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: 30px 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  
  .stat-number {
    font-size: 36px;
    font-weight: bold;
    color: #007bff;
    margin-bottom: 10px;
  }
  
  .stat-label {
    font-size: 18px;
    color: #666;
  }
`;

const CreatorContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
`;

const CreatorCard = styled.div`
  text-align: center;
  max-width: 500px;
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
  
  .creator-avatar {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 25px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    color: #667eea;
    border: 5px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
  
  .creator-name {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 10px;
    color: white;
  }
  
  .creator-role {
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 500;
  }
  
  .creator-bio {
    color: rgba(255, 255, 255, 0.95);
    font-size: 16px;
    line-height: 1.8;
    margin-bottom: 25px;
  }
  
  .social-links {
    display: flex;
    gap: 15px;
    justify-content: center;
    
    a {
      width: 45px;
      height: 45px;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #667eea;
      font-size: 20px;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }
    }
  }
`;

const About = () => {
  return (
    <PageContainer>
      <div className="container">
        <PageTitle>About DailyDeals</PageTitle>
        
        <ContentSection>
          <SectionTitle>My Story</SectionTitle>
          <SectionText>
            Hi, I'm Dax Patel, and I created DailyDeals as a passion project to demonstrate modern e-commerce capabilities. 
            This platform showcases my skills in full-stack development, UI/UX design, and creating seamless user experiences.
          </SectionText>
          <SectionText>
            Built with React, Vite, and modern web technologies, DailyDeals features everything from user authentication, 
            shopping cart management, secure checkout, to order tracking - all crafted with attention to detail and 
            user experience. This project represents my commitment to building functional, beautiful, and scalable web applications.
          </SectionText>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>Project Highlights</SectionTitle>
          <StatsContainer>
            <StatCard>
              <div className="stat-number">113</div>
              <div className="stat-label">Products Listed</div>
            </StatCard>
            <StatCard>
              <div className="stat-number">15+</div>
              <div className="stat-label">Features</div>
            </StatCard>
            <StatCard>
              <div className="stat-number">100%</div>
              <div className="stat-label">Responsive Design</div>
            </StatCard>
            <StatCard>
              <div className="stat-number">React</div>
              <div className="stat-label">Built With</div>
            </StatCard>
          </StatsContainer>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>The Creator</SectionTitle>
          <CreatorContainer>
            <CreatorCard>
              <div className="creator-avatar">
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="creator-name">Dax Patel</div>
              <div className="creator-role">Full-Stack Developer & Creator</div>
              <div className="creator-bio">
                Passionate developer specializing in building modern, scalable web applications. 
                Created DailyDeals to showcase expertise in React, JavaScript, and contemporary web development practices. 
                Committed to crafting exceptional user experiences through clean code and innovative design.
              </div>
              <div className="social-links">
                <a href="#" title="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" title="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" title="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" title="Email">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </CreatorCard>
          </CreatorContainer>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>Technologies Used</SectionTitle>
          <SectionText>
            <strong>Frontend:</strong> React 19.2.0, React Router for navigation, and Styled Components for beautiful, maintainable styling.
          </SectionText>
          <SectionText>
            <strong>Build Tool:</strong> Vite 7.1.12 for lightning-fast development and optimized production builds.
          </SectionText>
          <SectionText>
            <strong>State Management:</strong> Context API for efficient cart and wishlist management across the application.
          </SectionText>
          <SectionText>
            <strong>Features:</strong> User authentication, shopping cart, checkout process, order tracking, wishlist, product reviews, and responsive design for all devices.
          </SectionText>
        </ContentSection>
      </div>
    </PageContainer>
  );
};

export default About;