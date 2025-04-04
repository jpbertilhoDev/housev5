import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useTranslation } from 'react-i18next';
import * as THREE from 'three';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: 'artDirection' | 'graphicDesign' | 'videography' | 'aiSolutions' | 'branding' | 'digitalMarketing';
  onClick?: () => void;
}

// Componentes estilizados para o card
const CardContainer = styled(motion.div)`
  background: #1a1a1a;
  border-radius: 15px;
  overflow: hidden;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  height: 380px;
  width: 100%;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  @media (max-width: 768px) {
    height: 340px;
    padding: 1.2rem;
  }
`;

const CardTop = styled.div`
  margin-bottom: 1rem;
`;

const CanvasContainer = styled.div`
  height: 120px;
  margin-bottom: 1rem;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #ffffff;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const Button = styled(motion.button)`
  background: transparent;
  color: #00BCD4;
  border: 1px solid #00BCD4;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
  
  &:hover {
    background: #00BCD4;
    color: #ffffff;
  }
`;

// Componentes 3D para cada tipo de serviço
const ArtDirectionModel = () => (
  <mesh rotation={[0, 0, 0]}>
    <boxGeometry args={[1.5, 1.5, 1.5]} />
    <meshStandardMaterial color="#00BCD4" />
  </mesh>
);

const GraphicDesignModel = () => (
  <mesh rotation={[0, 0, 0]}>
    <torusGeometry args={[1, 0.4, 16, 32]} />
    <meshStandardMaterial color="#00BCD4" metalness={0.5} roughness={0.2} />
  </mesh>
);

const VideographyModel = () => (
  <mesh rotation={[0, 0, 0]}>
    <cylinderGeometry args={[1, 1, 2, 32]} />
    <meshStandardMaterial color="#00BCD4" wireframe />
  </mesh>
);

const AiSolutionsModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#00BCD4" />
      </mesh>
      <mesh position={[1, 0, 0]} scale={0.5}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#00BCD4" />
      </mesh>
      <mesh position={[-1, 0, 0]} scale={0.5}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#00BCD4" />
      </mesh>
    </group>
  );
};

const BrandingModel = () => (
  <mesh rotation={[0, 0, 0]}>
    <dodecahedronGeometry args={[1, 0]} />
    <meshStandardMaterial color="#00BCD4" metalness={0.2} roughness={0.3} />
  </mesh>
);

const DigitalMarketingModel = () => (
  <mesh rotation={[0, 0, 0]}>
    <tetrahedronGeometry args={[1.2, 0]} />
    <meshStandardMaterial color="#00BCD4" metalness={0.5} roughness={0.2} />
  </mesh>
);

// Componente principal do Card de Serviço
const ServiceCard3D: React.FC<ServiceCardProps> = ({ title, description, icon, onClick }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  
  // Função para renderizar o modelo 3D com base no ícone
  const renderModel = () => {
    switch (icon) {
      case 'artDirection':
        return <ArtDirectionModel />;
      case 'graphicDesign':
        return <GraphicDesignModel />;
      case 'videography':
        return <VideographyModel />;
      case 'aiSolutions':
        return <AiSolutionsModel />;
      case 'branding':
        return <BrandingModel />;
      case 'digitalMarketing':
        return <DigitalMarketingModel />;
      default:
        return <ArtDirectionModel />;
    }
  };
  
  return (
    <CardContainer
      whileHover={{ 
        scale: 1.05,
        translateY: -10,
        boxShadow: '0 20px 40px rgba(0, 188, 212, 0.2)'
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <CardTop>
        <CanvasContainer>
          <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            
            <group 
              ref={groupRef}
              scale={isHovered ? 1.2 : 1}
            >
              {renderModel()}
            </group>
            
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              autoRotate={!isHovered}
              autoRotateSpeed={2}
            />
          </Canvas>
        </CanvasContainer>
        
        <Title>{title}</Title>
      </CardTop>
      
      <Description>{description}</Description>
      
      <Button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {t('services.learnMore')}
      </Button>
    </CardContainer>
  );
};

export default ServiceCard3D; 