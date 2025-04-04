import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import styled from 'styled-components';

const HeroSection = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 0;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const HeroContent = styled.div`
  max-width: 1000px;
  text-align: center;
  z-index: 2;
  padding: 0 var(--spacing-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  color: white;
  margin-bottom: var(--spacing-md);
  font-weight: 700;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: var(--spacing-lg);
  font-weight: 400;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const TypedTextContainer = styled(motion.div)`
  height: 3.5rem;
  margin-bottom: var(--spacing-xl);
  overflow: hidden;
  position: relative;
  
  @media (max-width: 768px) {
    height: 5rem;
  }
`;

const TypedText = styled(motion.p)`
  font-size: 2.5rem;
  color: var(--secondary-color);
  font-weight: 600;
  position: relative;
  display: inline-block;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
  
  &::after {
    content: '';
    position: absolute;
    right: -10px;
    top: 5%;
    height: 90%;
    width: 3px;
    background-color: var(--secondary-color);
    animation: blink 0.7s infinite;
  }
  
  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;

const CTAButton = styled(motion.button)`
  background-color: var(--secondary-color);
  color: white;
  font-size: 1.1rem;
  padding: 0.75rem 2.5rem;
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  
  &:hover {
    background-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  
  svg {
    width: 30px;
    height: 30px;
    margin-top: 0.5rem;
  }
`;

// Typing effect animation variants
const typingVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const Hero: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const [typeIndex, setTypeIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Use useMemo to prevent recreating the services array on each render
  const services = useMemo(() => [
    t('services.artDirection.title'),
    t('services.graphicDesign.title'),
    t('services.videography.title'),
    t('services.aiSolutions.title')
  ], [t]);

  // Typing effect logic
  useEffect(() => {
    const currentText = services[typeIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    
    const timer = setTimeout(() => {
      if (!isDeleting && displayText.length < currentText.length) {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      } else if (!isDeleting && displayText.length === currentText.length) {
        // Pause at the end of the word before deleting
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText.length > 0) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
      } else if (isDeleting && displayText.length === 0) {
        setIsDeleting(false);
        setTypeIndex((typeIndex + 1) % services.length);
      }
    }, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, typeIndex, services]);

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position as percentage of screen width/height
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Create motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Update motion values when mousePosition changes
  useEffect(() => {
    mouseX.set(mousePosition.x * 15);
    mouseY.set(mousePosition.y * 15);
  }, [mousePosition, mouseX, mouseY]);
  
  // Transform motion values to CSS values
  const backgroundX = useTransform(mouseX, [-300, 300], ["-15px", "15px"]);
  const backgroundY = useTransform(mouseY, [-300, 300], ["-15px", "15px"]);

  return (
    <HeroSection id="home">
      <motion.div 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          translateX: backgroundX,
          translateY: backgroundY
        }}
      >
        <HeroBackground />
      </motion.div>
      
      <HeroContent>
        <HeroTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2,
            ease: "easeOut"
          }}
        >
          House of Digital Business
        </HeroTitle>
        
        <TypedTextContainer>
          <TypedText
            variants={typingVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.1 }}
          >
            {displayText}
          </TypedText>
        </TypedTextContainer>
        
        <HeroSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.4,
            ease: "easeOut"
          }}
        >
          {t('hero.subtitle')}
        </HeroSubtitle>
        
        <CTAButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.6,
            ease: "easeOut"
          }}
        >
          {t('hero.cta')}
        </CTAButton>
      </HeroContent>
      
      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        style={{ opacity }}
      >
        <motion.p
          animate={{ y: [0, 5, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut"
          }}
        >
          Scroll
        </motion.p>
        <motion.div
          component="svg"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          animate={{ y: [0, 5, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut",
            delay: 0.2
          }}
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </motion.div>
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero; 