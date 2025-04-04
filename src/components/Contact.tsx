import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';

const ContactSection = styled.section`
  padding: 3rem 0;
  background-color: ${({ theme }) => theme.primary};
  color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled(motion.h2)`
  color: white;
  margin-bottom: 1rem;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto;
`;

const FormContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  max-width: 700px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.25rem;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.25rem;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const SubmitButton = styled(motion.button)`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  font-size: 1rem;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
  
  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const Message = styled(motion.div)<{ $success?: boolean }>`
  padding: 1rem;
  border-radius: 0.25rem;
  margin-top: 1rem;
  background-color: ${props => props.$success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)'};
  color: ${props => props.$success ? '#10B981' : props.theme.secondary};
  font-weight: 500;
`;

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    
    // TODO: Replace these with your actual EmailJS service, template, and user IDs
    const serviceId = 'your_service_id';
    const templateId = 'your_template_id';
    const publicKey = 'your_public_key';
    
    emailjs.sendForm(serviceId, templateId, formRef.current!, publicKey)
      .then((result) => {
        setMessage({ text: t('contact.success'), success: true });
        if (formRef.current) {
          formRef.current.reset();
        }
      })
      .catch((error) => {
        setMessage({ text: t('contact.error'), success: false });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  
  return (
    <ContactSection id="contact">
      <Container>
        <Header>
          <Title
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('contact.title')}
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('contact.subtitle')}
          </Subtitle>
        </Header>
        
        <FormContainer
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <form ref={formRef} onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">{t('contact.name')}</Label>
              <Input 
                type="text" 
                id="name" 
                name="name" 
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="email">{t('contact.email')}</Label>
              <Input 
                type="email" 
                id="email" 
                name="email" 
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="message">{t('contact.message')}</Label>
              <TextArea 
                id="message" 
                name="message" 
                required 
              />
            </FormGroup>
            
            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? '...' : t('contact.send')}
            </SubmitButton>
            
            {message && (
              <Message
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                $success={message.success}
              >
                {message.text}
              </Message>
            )}
          </form>
        </FormContainer>
      </Container>
    </ContactSection>
  );
};

export default Contact; 