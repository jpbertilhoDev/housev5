import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import TimelineAnimated from '../components/TimelineAnimated';

// Styled components
const PageContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 120px 0 0;
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

const AboutSection = styled.section`
  margin-bottom: 80px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContentBox = styled.div``;

const AboutImage = styled(motion.div)`
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    height: 350px;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 25px;
  color: ${({ theme }) => theme.text};
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 20px;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 40px 0;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled(motion.div)`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.primary};
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const TeamContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const TeamMember = styled(motion.div)`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
`;

const MemberImage = styled.div`
  height: 300px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${TeamMember}:hover & img {
    transform: scale(1.05);
  }
`;

const MemberInfo = styled.div`
  padding: 25px;
`;

const MemberName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text};
`;

const MemberRole = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 12px;
`;

const MemberBio = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
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

// Component for the About page
const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  
  // Stats data
  const stats = [
    { number: '150+', label: t('about.stats.clients') },
    { number: '300+', label: t('about.stats.projects') },
    { number: '25+', label: t('about.stats.awards') }
  ];
  
  // Team members data
  const teamMembers = [
    {
      name: t('about.team.member1.name'),
      role: t('about.team.member1.role'),
      bio: t('about.team.member1.bio'),
      image: '/images/team/team-1.jpg'
    },
    {
      name: t('about.team.member2.name'),
      role: t('about.team.member2.role'),
      bio: t('about.team.member2.bio'),
      image: '/images/team/team-2.jpg'
    },
    {
      name: t('about.team.member3.name'),
      role: t('about.team.member3.role'),
      bio: t('about.team.member3.bio'),
      image: '/images/team/team-3.jpg'
    }
  ];

  return (
    <PageContainer
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <ContentContainer>
        <PageTitle>{t('about.pageTitle')}</PageTitle>
        
        <AboutSection>
          <GridContainer>
            <ContentBox>
              <Subtitle>{t('about.ourStory.title')}</Subtitle>
              <Paragraph>{t('about.ourStory.paragraph1')}</Paragraph>
              <Paragraph>{t('about.ourStory.paragraph2')}</Paragraph>
            </ContentBox>
            
            <AboutImage
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img src="/images/about/our-story.jpg" alt={t('about.ourStory.title')} />
            </AboutImage>
          </GridContainer>
        </AboutSection>
        
        {/* Timeline Section */}
        <TimelineAnimated />
        
        <AboutSection>
          <Subtitle>{t('about.stats.clients')}</Subtitle>
          <StatsContainer>
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatItem>
            ))}
          </StatsContainer>
        </AboutSection>
        
        <AboutSection>
          <Subtitle>{t('about.team.title')}</Subtitle>
          <TeamContainer>
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <MemberImage>
                  <img src={member.image} alt={member.name} />
                </MemberImage>
                <MemberInfo>
                  <MemberName>{member.name}</MemberName>
                  <MemberRole>{member.role}</MemberRole>
                  <MemberBio>{member.bio}</MemberBio>
                </MemberInfo>
              </TeamMember>
            ))}
          </TeamContainer>
        </AboutSection>
      </ContentContainer>
    </PageContainer>
  );
};

export default AboutPage; 