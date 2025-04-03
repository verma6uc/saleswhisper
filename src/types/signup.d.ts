
declare module 'react-confetti' {
  interface ConfettiExplosionProps {
    width?: number;
    height?: number;
    particleCount?: number;
    duration?: number;
    force?: number;
    colors?: string[];
    particleSize?: number;
    particleSizeVariation?: number;
  }
  
  export default function ConfettiExplosion(props: ConfettiExplosionProps): JSX.Element;
}
  