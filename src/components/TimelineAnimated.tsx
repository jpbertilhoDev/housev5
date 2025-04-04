import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTranslation } from 'react-i18next';
import * as THREE from 'three';

// Componentes estilizados para a timeline
const TimelineSection = styled.section`
  padding: 5rem 0;
  background-color: ${({ theme }) => theme.background};
  position: relative;
`;

const TimelineTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
  color: ${({ theme }) => theme.text};
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

const TimelineContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 1px);
    width: 2px;
    height: 100%;
    background-color: ${({ theme }) => theme.primary};
    
    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  margin-bottom: 6rem;
  position: relative;
  width: 50%;
  
  &:nth-child(even) {
    justify-content: flex-start;
    padding-left: 30px;
    padding-right: 0;
    margin-left: auto;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 20px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.primary};
    z-index: 1;
  }
  
  &:nth-child(odd)::after {
    right: -10px;
  }
  
  &:nth-child(even)::after {
    left: -10px;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding-left: 50px;
    padding-right: 0;
    justify-content: flex-start;
    
    &:nth-child(even) {
      justify-content: flex-start;
      padding-left: 50px;
      padding-right: 0;
      margin-left: 0;
    }
    
    &::after {
      left: 10px !important;
    }
  }
`;

const TimelineContent = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    width: 0;
    height: 0;
    border-style: solid;
  }
  
  ${TimelineItem}:nth-child(odd) & {
    &::before {
      right: -15px;
      border-width: 15px 0 15px 15px;
      border-color: transparent transparent transparent ${({ theme }) => theme.cardBackground};
    }
  }
  
  ${TimelineItem}:nth-child(even) & {
    &::before {
      left: -15px;
      border-width: 15px 15px 15px 0;
      border-color: transparent ${({ theme }) => theme.cardBackground} transparent transparent;
    }
  }
  
  @media (max-width: 768px) {
    ${TimelineItem} & {
      &::before {
        left: -15px;
        border-width: 15px 15px 15px 0;
        border-color: transparent ${({ theme }) => theme.cardBackground} transparent transparent;
      }
    }
  }
`;

const Year = styled.span`
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.primary};
`;

const Title = styled.h3`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 1.5rem;
`;

const ModelContainer = styled.div`
  height: 120px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

// Componentes 3D para os marcos de tempo
const RocketModel = () => {
  return (
    <mesh rotation={[0, Math.PI / 4, 0]}>
      <coneGeometry args={[0.5, 1.5, 4]} />
      <meshStandardMaterial color="#00BCD4" metalness={0.5} roughness={0.2} />
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.5, 16]} />
        <meshStandardMaterial color="#F5F5F5" />
      </mesh>
    </mesh>
  );
};

const GlobeModel = () => {
  return (
    <mesh rotation={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#00BCD4" wireframe />
    </mesh>
  );
};

const AwardModel = () => {
  return (
    <group>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1, 16]} />
        <meshStandardMaterial color="#00BCD4" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

const ChartModel = () => {
  return (
    <group>
      <mesh position={[-0.5, 0, 0]}>
        <boxGeometry args={[0.2, 0.5, 0.2]} />
        <meshStandardMaterial color="#00BCD4" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial color="#00BCD4" />
      </mesh>
      <mesh position={[0.5, 0, 0]}>
        <boxGeometry args={[0.2, 1.5, 0.2]} />
        <meshStandardMaterial color="#00BCD4" />
      </mesh>
    </group>
  );
};

// Interface para os itens da timeline
interface TimelineItemData {
  year: string;
  title: string;
  description: string;
  model: 'rocket' | 'globe' | 'award' | 'chart';
}

// Componente de modelo 3D que roda conforme o scroll
const RotatingModel: React.FC<{ model: string }> = ({ model }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });
  
  const renderModel = () => {
    switch (model) {
      case 'rocket':
        return <RocketModel />;
      case 'globe':
        return <GlobeModel />;
      case 'award':
        return <AwardModel />;
      case 'chart':
        return <ChartModel />;
      default:
        return <RocketModel />;
    }
  };
  
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <group ref={groupRef}>
        {renderModel()}
      </group>
    </Canvas>
  );
};

// Componente principal da timeline
const TimelineAnimated: React.FC = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Timeline items data
  const timelineItems: TimelineItemData[] = [
    {
      year: '2018',
      title: t('about.story.title'),
      description: t('about.story.paragraph1'),
      model: 'rocket'
    },
    {
      year: '2020',
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description'),
      model: 'globe'
    },
    {
      year: '2022',
      title: t('about.mission.title'),
      description: t('about.mission.paragraph1'),
      model: 'chart'
    },
    {
      year: '2023',
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description'),
      model: 'award'
    }
  ];
  
  // Definir valores de input e output para as transformações
  const inputRange = [0, 0.25, 0.5, 0.75, 1];
  
  // Criar transformações únicas fora de loops ou callbacks
  const transform0 = useTransform(scrollYProgress, inputRange, [0, 0, 0, 0, 0]);
  const transform1 = useTransform(scrollYProgress, inputRange, [0, 0, 0.25, 0.25, 0.25]);
  const transform2 = useTransform(scrollYProgress, inputRange, [0, 0, 0.5, 0.5, 0.5]);
  const transform3 = useTransform(scrollYProgress, inputRange, [0, 0, 0.75, 0.75, 0.75]);
  
  // Agrupar as transformações em um array
  const progressTransforms = [transform0, transform1, transform2, transform3];
  
  return (
    <TimelineSection ref={ref}>
      <TimelineTitle
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {t('about.title')}
      </TimelineTitle>
      
      <TimelineContainer>
        {timelineItems.map((item, index) => (
          <TimelineItem
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <TimelineContent>
              <ModelContainer>
                <RotatingModel model={item.model} />
              </ModelContainer>
              
              <Year>{item.year}</Year>
              <Title>{item.title}</Title>
              <Description>{item.description}</Description>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </TimelineSection>
  );
};

export default TimelineAnimated; 