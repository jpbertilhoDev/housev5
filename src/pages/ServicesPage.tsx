import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Services3D from '../components/Services3D';

// Styled components
const PageContainer = styled(motion.div)`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 80px;
`;

const PageHeader = styled.div`
  margin-bottom: 60px;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PageDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
  color: ${({ theme }) => theme.textSecondary};
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

const ServicesPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <PageContainer
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <ContentContainer>
        <PageHeader>
          <PageTitle>{t('services.pageTitle')}</PageTitle>
          <PageDescription>{t('services.pageDescription')}</PageDescription>
        </PageHeader>
        
        <Services3D />
      </ContentContainer>
    </PageContainer>
  );
};

export default ServicesPage; 