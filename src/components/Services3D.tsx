import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ServiceCard3D from './ServiceCard3D';

// Estilos para a seção de serviços
const ServicesSection = styled.section`
  padding: 5rem 0;
  background-color: #121212;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 1rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ServiceItem = styled(motion.div)`
  border-radius: 15px;
  overflow: hidden;
`;

// Variantes de animação
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

// Componente principal
const Services3D: React.FC = () => {
  const { t } = useTranslation();
  
  // Array de serviços
  const services = [
    {
      icon: 'artDirection',
      title: t('services.artDirection.title'),
      description: t('services.artDirection.description')
    },
    {
      icon: 'graphicDesign',
      title: t('services.graphicDesign.title'),
      description: t('services.graphicDesign.description')
    },
    {
      icon: 'videography',
      title: t('services.videography.title'),
      description: t('services.videography.description')
    },
    {
      icon: 'aiSolutions',
      title: t('services.aiSolutions.title'),
      description: t('services.aiSolutions.description')
    },
    {
      icon: 'branding',
      title: t('services.branding.title'),
      description: t('services.branding.description')
    },
    {
      icon: 'digitalMarketing',
      title: t('services.digitalMarketing.title'),
      description: t('services.digitalMarketing.description')
    }
  ];
  
  return (
    <ServicesSection id="services">
      <Container>
        <SectionHeader>
          <Title
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t('services.title')}
          </Title>
          
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('services.subtitle')}
          </Subtitle>
        </SectionHeader>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Grid>
            {services.map((service, index) => (
              <ServiceItem
                key={index}
                variants={itemVariants}
              >
                <ServiceCard3D
                  title={service.title}
                  description={service.description}
                  icon={service.icon as any}
                  onClick={() => {
                    // Implementar lógica de navegação ou modal se necessário
                    console.log(`Clicked on ${service.title}`);
                  }}
                />
              </ServiceItem>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </ServicesSection>
  );
};

export default Services3D; 