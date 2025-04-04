import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Hero from '../components/Hero';
import Hero3D from '../components/Hero3D';
import Services from '../components/Services';
import Testimonial from '../components/Testimonial';

// 3D Animation Wrapper
const Page = styled(motion.div)`
  perspective: 1000px;
  transform-style: preserve-3d;
  width: 100%;
`;

const pageVariants = {
  initial: {
    opacity: 0,
    rotateX: 5,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9]
    }
  },
  exit: {
    opacity: 0,
    rotateX: -5,
    transition: {
      duration: 0.5
    }
  }
};

const HomePage: React.FC = () => {
  return (
    <Page
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Hero3D />
      <Services />
      <Testimonial />
    </Page>
  );
};

export default HomePage; 