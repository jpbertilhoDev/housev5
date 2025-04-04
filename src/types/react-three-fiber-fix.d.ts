declare namespace JSX {
  interface IntrinsicElements {
    mesh: any;
    ambientLight: any;
    pointLight: any;
    sphereGeometry: any;
    boxGeometry: any;
    cylinderGeometry: any;
    coneGeometry: any;
    torusGeometry: any;
    dodecahedronGeometry: any;
    tetrahedronGeometry: any;
    meshStandardMaterial: any;
    group: any;
  }
}

declare module '@react-three/fiber' {
  export const Canvas: any;
  export const useFrame: any;
  export const extend: any;
  export const useThree: any;
  export interface Object3DNode<T, P> {}
}

declare module '@react-three/drei' {
  export const OrbitControls: any;
  export const Sphere: any;
  export const Box: any;
  export const useGLTF: any;
  export const Environment: any;
  export const useTexture: any;
}

declare module 'framer-motion' {
  export const motion: any;
  export function useScroll(options?: any): any;
  export function useTransform(input: any, inputRange: any, outputRange: any): any;
  export function useSpring(value: any, config?: any): any;
  export function useMotionValue(initial: any): any;
  export interface AnimatePresenceProps {
    children: React.ReactNode;
    exitBeforeEnter?: boolean;
  }
  export const AnimatePresence: React.FC<AnimatePresenceProps>;
} 