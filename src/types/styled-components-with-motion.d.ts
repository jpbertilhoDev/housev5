import 'styled-components';
import { FC, ComponentClass, ComponentPropsWithRef } from 'react';
import { motion, MotionProps } from 'framer-motion';

// Extendendo as definições de tipos do styled-components para trabalhar com motion
declare module 'styled-components' {
  export interface StyledComponentBase<C extends React.ComponentType<any>, T extends object, O extends object = {}, A extends keyof any = never> {
    // Permitindo que styled-components aceite componentes motion
    (props: C extends keyof JSX.IntrinsicElements ? React.ComponentPropsWithRef<C> & T & O : C extends React.ComponentType<infer P> ? P & T & O : never): React.ReactElement;
  }
}

// Solução para styled(motion.*) funcionar corretamente com TypeScript
declare module 'framer-motion' {
  export interface MotionProps {
    [key: string]: any;
  }

  export interface AnimatePresenceProps {
    children: React.ReactNode;
    exitBeforeEnter?: boolean;
    initial?: boolean;
    mode?: 'sync' | 'wait' | 'popLayout';
    onExitComplete?: () => void;
    custom?: any;
    presenceAffectsLayout?: boolean;
  }

  // Adicionar todos os elementos HTML possíveis como propriedades de motion
  export const motion: {
    div: FC<MotionProps & ComponentPropsWithRef<'div'>>;
    span: FC<MotionProps & ComponentPropsWithRef<'span'>>;
    h1: FC<MotionProps & ComponentPropsWithRef<'h1'>>;
    h2: FC<MotionProps & ComponentPropsWithRef<'h2'>>;
    h3: FC<MotionProps & ComponentPropsWithRef<'h3'>>;
    h4: FC<MotionProps & ComponentPropsWithRef<'h4'>>;
    h5: FC<MotionProps & ComponentPropsWithRef<'h5'>>;
    h6: FC<MotionProps & ComponentPropsWithRef<'h6'>>;
    p: FC<MotionProps & ComponentPropsWithRef<'p'>>;
    a: FC<MotionProps & ComponentPropsWithRef<'a'>>;
    button: FC<MotionProps & ComponentPropsWithRef<'button'>>;
    form: FC<MotionProps & ComponentPropsWithRef<'form'>>;
    input: FC<MotionProps & ComponentPropsWithRef<'input'>>;
    textarea: FC<MotionProps & ComponentPropsWithRef<'textarea'>>;
    select: FC<MotionProps & ComponentPropsWithRef<'select'>>;
    ul: FC<MotionProps & ComponentPropsWithRef<'ul'>>;
    ol: FC<MotionProps & ComponentPropsWithRef<'ol'>>;
    li: FC<MotionProps & ComponentPropsWithRef<'li'>>;
    nav: FC<MotionProps & ComponentPropsWithRef<'nav'>>;
    header: FC<MotionProps & ComponentPropsWithRef<'header'>>;
    footer: FC<MotionProps & ComponentPropsWithRef<'footer'>>;
    section: FC<MotionProps & ComponentPropsWithRef<'section'>>;
    article: FC<MotionProps & ComponentPropsWithRef<'article'>>;
    aside: FC<MotionProps & ComponentPropsWithRef<'aside'>>;
    svg: FC<MotionProps & ComponentPropsWithRef<'svg'>>;
    path: FC<MotionProps & ComponentPropsWithRef<'path'>>;
    circle: FC<MotionProps & ComponentPropsWithRef<'circle'>>;
    rect: FC<MotionProps & ComponentPropsWithRef<'rect'>>;
    line: FC<MotionProps & ComponentPropsWithRef<'line'>>;
    [key: string]: FC<MotionProps & any>;
  };
}

// Allow styled-components to use motion elements
declare module 'styled-components' {
  interface StyledComponentBase<C, T, O, A> {
    (props: any): JSX.Element;
  }

  export function styled<C extends keyof JSX.IntrinsicElements | React.ComponentType<any>>(
    component: C
  ): any;
  
  // Enable styled(motion.element)
  export interface ThemedStyledFunction<C, T, O, A> {
    (first: TemplateStringsArray, ...rest: any[]): any;
    <U>(first: TemplateStringsArray, ...rest: any[]): any;
  }
} 