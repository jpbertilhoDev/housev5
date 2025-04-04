import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as THREE from 'three';

// Componente que controla a animação do globo
const AnimatedSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  // Anima a rotação do globo
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[2, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#00BCD4"
        wireframe
        emissive="#00BCD4"
        emissiveIntensity={0.5}
      />
    </Sphere>
  );
};

// Componente para criar pontos de conexão no globo
const ConnectionPoints = () => {
  const points = [];
  const count = 100;
  
  for (let i = 0; i < count; i++) {
    // Distribui pontos aleatoriamente em uma esfera
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    
    const x = 2.2 * Math.sin(phi) * Math.cos(theta);
    const y = 2.2 * Math.sin(phi) * Math.sin(theta);
    const z = 2.2 * Math.cos(phi);
    
    points.push(
      <mesh key={i} position={[x, y, z]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    );
  }
  
  return <>{points}</>;
};

// Estilos com styled-components
const HeroContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: #121212;
`;

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const HeroContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  padding: 0 2rem;
  text-align: center;
`;

const Title = styled(motion.h1)`
  color: #ffffff;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  color: #ffffff;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CtaButton = styled(motion.button)`
  background-color: #00BCD4;
  color: #ffffff;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 188, 212, 0.3);
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #00ACC1;
  }
`;

// Componente principal Hero3D
const Hero3D: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <HeroContainer>
      <CanvasContainer>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <AnimatedSphere />
          <ConnectionPoints />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.5}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </CanvasContainer>
      
      <HeroContent>
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t('hero.title')}
        </Title>
        
        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t('hero.subtitle')}
        </Subtitle>
        
        <CtaButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {t('hero.cta')}
        </CtaButton>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero3D; 