import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled components
const TestimonialSection = styled.section`
  padding: 120px 0;
  background-color: ${({ theme }) => theme.backgroundAlt};
  overflow: hidden;
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const BackgroundShape = styled(motion.div)`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.primary}22, 
    ${({ theme }) => theme.secondary}33);
  filter: blur(80px);
  z-index: 1;
  
  &.shape1 {
    top: -200px;
    right: -100px;
  }
  
  &.shape2 {
    bottom: -200px;
    left: -100px;
  }
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  text-align: center;
  margin-bottom: 20px;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  max-width: 600px;
  margin: 0 auto 60px;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const TestimonialCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 16px;
  padding: 40px 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const QuoteIcon = styled.div`
  font-size: 4rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 20px;
  line-height: 1;
  opacity: 0.4;
`;

const TestimonialText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.text};
  margin-bottom: 30px;
`;

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ClientAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary};
  margin-right: 15px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
`;

const ClientDetails = styled.div``;

const ClientName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 0 0 5px;
`;

const ClientPosition = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
`;

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.5,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  }),
};

// Helper function to get initials from a name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

const Testimonial: React.FC = () => {
  const { t } = useTranslation();
  
  const testimonials = [
    {
      id: 1,
      text: t('testimonial.client1.text'),
      name: t('testimonial.client1.name'),
      position: t('testimonial.client1.position'),
      avatar: '/assets/client1.jpg',
    },
    {
      id: 2,
      text: t('testimonial.client2.text'),
      name: t('testimonial.client2.name'),
      position: t('testimonial.client2.position'),
      avatar: '/assets/client2.jpg',
    },
    {
      id: 3,
      text: t('testimonial.client3.text'),
      name: t('testimonial.client3.name'),
      position: t('testimonial.client3.position'),
      avatar: '/assets/client3.jpg',
    },
  ];

  return (
    <TestimonialSection id="testimonials">
      <BackgroundShape 
        className="shape1"
        animate={{ 
          x: [0, 30, 0],
          y: [0, 20, 0],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 15,
          ease: "easeInOut" 
        }}
      />
      <BackgroundShape 
        className="shape2"
        animate={{ 
          x: [0, -30, 0],
          y: [0, -20, 0],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 18,
          ease: "easeInOut" 
        }}
      />

      <Container>
        <Title
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {t('testimonial.title')}
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {t('testimonial.subtitle')}
        </Subtitle>

        <TestimonialGrid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
            >
              <QuoteIcon>"</QuoteIcon>
              <TestimonialText>{testimonial.text}</TestimonialText>
              <ClientInfo>
                <ClientAvatar>
                  {getInitials(testimonial.name)}
                </ClientAvatar>
                <ClientDetails>
                  <ClientName>{testimonial.name}</ClientName>
                  <ClientPosition>{testimonial.position}</ClientPosition>
                </ClientDetails>
              </ClientInfo>
            </TestimonialCard>
          ))}
        </TestimonialGrid>
      </Container>
    </TestimonialSection>
  );
};

export default Testimonial; 