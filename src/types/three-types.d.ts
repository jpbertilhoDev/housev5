import { Object3DNode } from '@react-three/fiber';
import { Mesh, Group } from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: Object3DNode<Mesh, typeof Mesh>;
      group: Object3DNode<Group, typeof Group>;
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
    }
  }
}

// Estender as definições do Framer Motion para incluir 'group'
declare module 'framer-motion' {
  export interface HTMLMotionComponents {
    group: any;
  }
} 