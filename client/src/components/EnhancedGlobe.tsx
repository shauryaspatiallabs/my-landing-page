import { useEffect, useRef } from "react";
import * as THREE from "three";

const EnhancedGlobe = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const frameRef = useRef<number>();
  const globeRef = useRef<THREE.Mesh>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create enhanced globe with multiple layers
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    
    // Main wireframe globe
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x64ffda,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const globe = new THREE.Mesh(geometry, wireframeMaterial);
    globeRef.current = globe;
    scene.add(globe);

    // Inner glow sphere
    const glowGeometry = new THREE.SphereGeometry(1.95, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x64ffda,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide
    });
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowSphere);

    // Add data connection lines
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.6
    });

    // Create connection lines between random points
    const connections = [];
    for (let i = 0; i < 20; i++) {
      const phi1 = Math.acos(-1 + (2 * Math.random()));
      const theta1 = Math.sqrt(20 * Math.PI) * phi1;
      const phi2 = Math.acos(-1 + (2 * Math.random()));
      const theta2 = Math.sqrt(20 * Math.PI) * phi2;
      
      const point1 = new THREE.Vector3(
        2.1 * Math.cos(theta1) * Math.sin(phi1),
        2.1 * Math.sin(theta1) * Math.sin(phi1),
        2.1 * Math.cos(phi1)
      );
      
      const point2 = new THREE.Vector3(
        2.1 * Math.cos(theta2) * Math.sin(phi2),
        2.1 * Math.sin(theta2) * Math.sin(phi2),
        2.1 * Math.cos(phi2)
      );

      connections.push(point1, point2);
    }

    lineGeometry.setFromPoints(connections);
    const connectionLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(connectionLines);

    // Add floating data points with animation
    const dataPoints = [];
    const pointGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    
    for (let i = 0; i < 100; i++) {
      const pointMaterial = new THREE.MeshBasicMaterial({ 
        color: Math.random() > 0.5 ? 0x64ffda : 0x3b82f6,
        transparent: true,
        opacity: 0.8
      });
      
      const point = new THREE.Mesh(pointGeometry, pointMaterial);
      const phi = Math.acos(-1 + (2 * i) / 100);
      const theta = Math.sqrt(100 * Math.PI) * phi;
      
      point.position.x = 2.2 * Math.cos(theta) * Math.sin(phi);
      point.position.y = 2.2 * Math.sin(theta) * Math.sin(phi);
      point.position.z = 2.2 * Math.cos(phi);
      
      point.userData = {
        originalPosition: point.position.clone(),
        phase: Math.random() * Math.PI * 2,
        speed: 0.01 + Math.random() * 0.02
      };
      
      dataPoints.push(point);
      scene.add(point);
    }

    // Add orbital rings
    const ringGeometry = new THREE.RingGeometry(2.5, 2.52, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x64ffda,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide
    });
    
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.x = Math.PI / 2;
    scene.add(ring1);
    
    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring2.rotation.z = Math.PI / 3;
    scene.add(ring2);

    camera.position.z = 5;

    // Enhanced mouse interaction
    let mouseX = 0, mouseY = 0;
    let targetRotationX = 0, targetRotationY = 0;
    
    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      
      targetRotationX = mouseY * 0.3;
      targetRotationY = mouseX * 0.3;
    };
    
    document.addEventListener('mousemove', onMouseMove);

    // Animation loop with enhanced effects
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
      // Auto rotation
      globe.rotation.y += 0.003;
      
      // Mouse interaction with smoother interpolation
      globe.rotation.x += (targetRotationX - globe.rotation.x) * 0.02;
      globe.rotation.y += (targetRotationY - globe.rotation.y) * 0.02;
      
      // Animate glow sphere
      glowSphere.rotation.y -= 0.002;
      glowSphere.rotation.x = Math.sin(time * 0.5) * 0.1;
      
      // Animate connection lines
      connectionLines.rotation.y += 0.001;
      connectionLines.rotation.z = Math.sin(time * 0.3) * 0.1;
      
      // Animate orbital rings
      ring1.rotation.z += 0.004;
      ring2.rotation.y += 0.003;
      
      // Animate data points with floating effect
      dataPoints.forEach((point, index) => {
        const userData = point.userData;
        userData.phase += userData.speed;
        
        const originalPos = userData.originalPosition;
        const radius = 0.1;
        
        point.position.x = originalPos.x + Math.sin(userData.phase) * radius;
        point.position.y = originalPos.y + Math.cos(userData.phase * 1.3) * radius;
        point.position.z = originalPos.z + Math.sin(userData.phase * 0.8) * radius;
        
        // Pulse effect
        const scale = 1 + Math.sin(time * 2 + index * 0.1) * 0.3;
        point.scale.setScalar(scale);
      });
      
      renderer.render(scene, camera);
    };

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', onWindowResize);
    animate();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
};

export default EnhancedGlobe;