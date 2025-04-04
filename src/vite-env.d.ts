/// <reference types="vite/client" />

// Tipos para React Three Fiber
interface Window {
  __THREE__: any;
}

// Resolver problemas com Three.js no JSX
declare namespace JSX {
  interface IntrinsicElements {
    group: any;
    geometry: any;
    lineBasicMaterial: any;
    mesh: any;
    ambientLight: any;
    pointLight: any;
    directionalLight: any;
    spotLight: any;
    line: any;
    lineSegments: any;
    points: any;
    sphereGeometry: any;
    boxGeometry: any;
    planeGeometry: any;
    cylinderGeometry: any;
    coneGeometry: any;
    torusGeometry: any;
    dodecahedronGeometry: any;
    tetrahedronGeometry: any;
    meshStandardMaterial: any;
    meshBasicMaterial: any;
    meshPhongMaterial: any;
    meshLambertMaterial: any;
    pointsMaterial: any;
    shaderMaterial: any;
    primitive: any;
  }
} 