import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

// Styled components
const PageContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 120px 0 80px;
  background-color: ${({ theme }) => theme.background};
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.text};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 80px;
    height: 4px;
    background-color: ${({ theme }) => theme.primary};
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ContactSection = styled.section`
  margin-bottom: 80px;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContactInfo = styled.div``;

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 50%;
  margin-right: 15px;
  
  svg {
    width: 24px;
    height: 24px;
    color: white;
  }
`;

const InfoContent = styled.div``;

const InfoLabel = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.text};
`;

const InfoText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.5;
`;

const SocialLinks = styled.div`
  display: flex;
  margin-top: 30px;
  gap: 15px;
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 50%;
  color: ${({ theme }) => theme.primary};
  transition: all 0.3s ease;
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-3px);
  }
`;

const ContactForm = styled.form`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.text};
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px rgba(0, 188, 212, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px rgba(0, 188, 212, 0.2);
  }
`;

const SubmitButton = styled(motion.button)`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 14px 30px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  margin-top: 10px;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const FormMessage = styled.div<{ isError?: boolean }>`
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  font-size: 0.9rem;
  background-color: ${({ isError, theme }) => 
    isError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'};
  color: ${({ isError, theme }) => 
    isError ? '#EF4444' : '#10B981'};
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }
`;

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.9]
    }
  }
};

const itemVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const staggerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const buttonVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0
  },
  hover: {
    scale: 1.05,
    boxShadow: '0 10px 20px rgba(0, 188, 212, 0.3)'
  },
  tap: {
    scale: 0.98
  }
};

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    setIsSubmitting(true);
    setMessage({ text: '', isError: false });
    
    try {
      // TODO: Replace with your actual EmailJS credentials before deployment
      await emailjs.sendForm(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        formRef.current,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );
      
      setMessage({ 
        text: t('contact.form.successMessage'), 
        isError: false 
      });
      formRef.current.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      setMessage({ 
        text: t('contact.form.errorMessage'), 
        isError: true 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <ContentContainer>
        <PageTitle>{t('contact.pageTitle')}</PageTitle>
        
        <ContactSection>
          <ContactGrid>
            <ContactInfo
              as={motion.div}
              variants={staggerVariants}
            >
              <InfoItem variants={itemVariants}>
                <IconWrapper>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>{t('contact.address.label')}</InfoLabel>
                  <InfoText>{t('contact.address.value')}</InfoText>
                </InfoContent>
              </InfoItem>
              
              <InfoItem variants={itemVariants}>
                <IconWrapper>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>{t('contact.email.label')}</InfoLabel>
                  <InfoText>info@houseofdigitalbusiness.de</InfoText>
                </InfoContent>
              </InfoItem>
              
              <InfoItem variants={itemVariants}>
                <IconWrapper>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>{t('contact.phone.label')}</InfoLabel>
                  <InfoText>+49 123 456 7890</InfoText>
                </InfoContent>
              </InfoItem>
              
              <SocialLinks>
                <SocialLink 
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </SocialLink>
                
                <SocialLink 
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </SocialLink>
                
                <SocialLink 
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </SocialLink>
                
                <SocialLink 
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </SocialLink>
              </SocialLinks>
            </ContactInfo>
            
            <ContactForm 
              ref={formRef}
              onSubmit={handleSubmit}
              as={motion.div}
              component="form"
              variants={itemVariants}
            >
              <FormTitle>{t('contact.form.title')}</FormTitle>
              
              <FormGroup>
                <Label htmlFor="name">{t('contact.form.name')}</Label>
                <Input 
                  type="text" 
                  id="name" 
                  name="user_name" 
                  required 
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">{t('contact.form.email')}</Label>
                <Input 
                  type="email" 
                  id="email" 
                  name="user_email" 
                  required 
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="subject">{t('contact.form.subject')}</Label>
                <Input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  required 
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="message">{t('contact.form.message')}</Label>
                <TextArea 
                  id="message" 
                  name="message" 
                  required 
                />
              </FormGroup>
              
              <SubmitButton 
                type="submit"
                disabled={isSubmitting}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
              </SubmitButton>
              
              {message.text && (
                <FormMessage isError={message.isError}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {message.isError ? (
                      <>
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </>
                    ) : (
                      <>
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </>
                    )}
                  </svg>
                  {message.text}
                </FormMessage>
              )}
            </ContactForm>
          </ContactGrid>
        </ContactSection>
      </ContentContainer>
    </PageContainer>
  );
};

export default ContactPage; 