import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const AboutSection = styled.section`
  padding: var(--spacing-xxl) 0;
  background-color: var(--background-color);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xxl);
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }
`;

const ContentWrapper = styled.div`
  max-width: 500px;
  
  @media (max-width: 768px) {
    order: 2;
    max-width: 100%;
  }
`;

const Title = styled(motion.h2)`
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: var(--spacing-md);
  font-weight: 500;
`;

const Description = styled(motion.p)`
  color: var(--text-color);
  line-height: 1.7;
  margin-bottom: var(--spacing-xl);
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--box-shadow-lg);
  height: 100%;
  min-height: 400px;
  
  @media (max-width: 768px) {
    order: 1;
    min-height: 300px;
  }
`;

const AboutImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('/images/about-image.jpg');
  background-size: cover;
  background-position: center;
  transition: transform var(--transition-slow);
  
  &:hover {
    transform: scale(1.05);
  }
`;

const About: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <AboutSection id="about">
      <Container>
        <ContentWrapper>
          <Title
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('about.title')}
          </Title>
          
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('about.subtitle')}
          </Subtitle>
          
          <Description
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {t('about.description')}
          </Description>
        </ContentWrapper>
        
        <ImageWrapper
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <AboutImage />
        </ImageWrapper>
      </Container>
    </AboutSection>
  );
};

export default About; 