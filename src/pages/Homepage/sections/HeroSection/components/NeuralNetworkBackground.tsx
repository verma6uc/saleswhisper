
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

/**
 * Component that renders a dynamic neural network visualization in the background.
 * Uses Three.js to create an animated particle system that responds to mouse movement.
 */
export const NeuralNetworkBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    camera.position.z = 30;
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = window.innerWidth < 768 ? 500 : 1000;
    
    const positionArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      positionArray[i] = (Math.random() - 0.5) * 50;
      positionArray[i + 1] = (Math.random() - 0.5) * 50;
      positionArray[i + 2] = (Math.random() - 0.5) * 50;
      
      // Scale
      scaleArray[i / 3] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Material
    const particlesMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float scale;
        uniform float uTime;
        varying vec3 vPosition;
        
        void main() {
          vPosition = position;
          
          vec3 pos = position;
          pos.y += sin(uTime * 0.2 + position.x) * 0.5;
          pos.x += cos(uTime * 0.2 + position.z) * 0.3;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = scale * 2.0 * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vPosition;
        uniform float uTime;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          vec3 color1 = vec3(0.102, 0.137, 0.494); // #1A237E
          vec3 color2 = vec3(0.271, 0.153, 0.627); // #4527A0
          
          float colorMix = smoothstep(-25.0, 25.0, vPosition.x);
          vec3 finalColor = mix(color1, color2, colorMix);
          
          gl_FragColor = vec4(finalColor, 1.0 - dist * 2.0);
        }
      `,
      transparent: true,
      uniforms: {
        uTime: { value: 0 }
      },
      depthWrite: false
    });
    
    // Add particles to scene
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Add lines between particles
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x4527A0,
      transparent: true,
      opacity: 0.1
    });
    
    const linesMesh = new THREE.Group();
    scene.add(linesMesh);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Update uniforms
      if (particlesMaterial.uniforms) {
        particlesMaterial.uniforms.uTime.value = elapsedTime;
      }
      
      // Rotate particles
      particles.rotation.x = elapsedTime * 0.05;
      particles.rotation.y = mousePosition.current.x * 0.5;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Add intro animation
    gsap.fromTo(
      particles.rotation, 
      { y: Math.PI * 2 }, 
      { y: 0, duration: 2, ease: "power3.out" }
    );
    
    // Reduce motion if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.ticker.fps(10);
    }
    
    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Dispose of resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      lineMaterial.dispose();
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default NeuralNetworkBackground;
  