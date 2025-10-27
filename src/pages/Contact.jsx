import React, { useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 30px 0;
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
`;

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

const InfoSection = styled.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 15px;
  color: #007bff;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #007bff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  h3 {
    margin-bottom: 5px;
    font-size: 18px;
  }
  
  p {
    color: #666;
    margin-bottom: 5px;
  }
`;

const ContactForm = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const MapContainer = styled.div`
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle contact form submission logic here
    console.log('Contact form submitted:', formData);
  };
  
  return (
    <PageContainer>
      <div className="container">
        <PageTitle>Contact Us</PageTitle>
        
        <ContactContainer>
          <ContactInfo>
            <InfoSection>
              <SectionTitle>Get In Touch</SectionTitle>
              <p>We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p>
            </InfoSection>
            
            <InfoSection>
              <SectionTitle>Contact Information</SectionTitle>
              
              <InfoItem>
                <InfoIcon>
                  <i className="fas fa-map-marker-alt"></i>
                </InfoIcon>
                <InfoContent>
                  <h3>Our Location</h3>
                  <p>123 Commerce Street</p>
                  <p>New York, NY 10001</p>
                </InfoContent>
              </InfoItem>
              
              <InfoItem>
                <InfoIcon>
                  <i className="fas fa-phone-alt"></i>
                </InfoIcon>
                <InfoContent>
                  <h3>Phone Number</h3>
                  <p>+1 (555) 123-4567</p>
                  <p>Mon-Fri 9:00 AM - 5:00 PM</p>
                </InfoContent>
              </InfoItem>
              
              <InfoItem>
                <InfoIcon>
                  <i className="fas fa-envelope"></i>
                </InfoIcon>
                <InfoContent>
                  <h3>Email Address</h3>
                  <p>support@shopease.com</p>
                  <p>info@shopease.com</p>
                </InfoContent>
              </InfoItem>
            </InfoSection>
            
            <InfoSection>
              <SectionTitle>Follow Us</SectionTitle>
              <InfoItem>
                <InfoIcon>
                  <i className="fab fa-facebook-f"></i>
                </InfoIcon>
                <InfoContent>
                  <h3>Social Media</h3>
                  <p>Follow us on social media for updates and promotions</p>
                </InfoContent>
              </InfoItem>
            </InfoSection>
            
            <MapContainer>
              <p>Map placeholder - Your location would appear here</p>
            </MapContainer>
          </ContactInfo>
          
          <ContactForm>
            <form onSubmit={handleSubmit}>
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
                <Label htmlFor="subject">Subject</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="message">Message</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></TextArea>
              </FormGroup>
              
              <SubmitButton type="submit">Send Message</SubmitButton>
            </form>
          </ContactForm>
        </ContactContainer>
      </div>
    </PageContainer>
  );
};

export default Contact;