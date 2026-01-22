import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

type DataLayer = "network" | "heatmap" | "satellite";

const EnhancedGlobe = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const frameRef = useRef<number>();
  const globeRef = useRef<THREE.Mesh>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const layersRef = useRef<{
    network: THREE.Group;
    heatmap: THREE.Group;
    satellite: THREE.Group;
  }>();

  const [activeLayer, setActiveLayer] = useState<DataLayer>("network");
  const [isLoaded, setIsLoaded] = useState(false);

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
    cameraRef.current = camera;

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
      opacity: 0.3,
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
      side: THREE.BackSide,
    });
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowSphere);

    // Create layer groups
    const networkLayer = new THREE.Group();
    const heatmapLayer = new THREE.Group();
    const satelliteLayer = new THREE.Group();

    layersRef.current = {
      network: networkLayer,
      heatmap: heatmapLayer,
      satellite: satelliteLayer,
    };

    // === NETWORK LAYER ===
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.6,
    });

    const connections: THREE.Vector3[] = [];
    for (let i = 0; i < 20; i++) {
      const phi1 = Math.acos(-1 + 2 * Math.random());
      const theta1 = Math.sqrt(20 * Math.PI) * phi1;
      const phi2 = Math.acos(-1 + 2 * Math.random());
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
    networkLayer.add(connectionLines);

    // Network data points
    const pointGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    const networkDataPoints: THREE.Mesh[] = [];

    for (let i = 0; i < 100; i++) {
      const pointMaterial = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x64ffda : 0x3b82f6,
        transparent: true,
        opacity: 0.8,
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
        speed: 0.01 + Math.random() * 0.02,
      };

      networkDataPoints.push(point);
      networkLayer.add(point);
    }

    scene.add(networkLayer);

    // === HEATMAP LAYER ===
    for (let i = 0; i < 30; i++) {
      const heatGeometry = new THREE.SphereGeometry(
        0.1 + Math.random() * 0.2,
        16,
        16
      );
      const intensity = Math.random();
      const heatMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.0 + intensity * 0.15, 1, 0.5),
        transparent: true,
        opacity: 0.4 + intensity * 0.3,
      });

      const heatPoint = new THREE.Mesh(heatGeometry, heatMaterial);
      const phi = Math.acos(-1 + 2 * Math.random());
      const theta = 2 * Math.PI * Math.random();

      heatPoint.position.x = 2.05 * Math.cos(theta) * Math.sin(phi);
      heatPoint.position.y = 2.05 * Math.sin(theta) * Math.sin(phi);
      heatPoint.position.z = 2.05 * Math.cos(phi);

      heatPoint.userData = { pulsePhase: Math.random() * Math.PI * 2 };
      heatmapLayer.add(heatPoint);
    }

    heatmapLayer.visible = false;
    scene.add(heatmapLayer);

    // === SATELLITE LAYER ===
    const orbitRadii = [2.8, 3.2, 3.6];
    orbitRadii.forEach((radius, orbitIndex) => {
      // Orbit ring
      const orbitGeometry = new THREE.RingGeometry(radius - 0.01, radius + 0.01, 64);
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0x64ffda,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
      });
      const orbitRing = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbitRing.rotation.x = Math.PI / 2 + (orbitIndex * Math.PI) / 6;
      orbitRing.rotation.z = (orbitIndex * Math.PI) / 4;
      satelliteLayer.add(orbitRing);

      // Satellites on orbit
      for (let i = 0; i < 3; i++) {
        const satGeometry = new THREE.BoxGeometry(0.08, 0.04, 0.12);
        const satMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.9,
        });
        const satellite = new THREE.Mesh(satGeometry, satMaterial);

        // Solar panels
        const panelGeometry = new THREE.BoxGeometry(0.2, 0.01, 0.06);
        const panelMaterial = new THREE.MeshBasicMaterial({
          color: 0x3b82f6,
          transparent: true,
          opacity: 0.8,
        });
        const leftPanel = new THREE.Mesh(panelGeometry, panelMaterial);
        leftPanel.position.x = -0.14;
        satellite.add(leftPanel);

        const rightPanel = new THREE.Mesh(panelGeometry, panelMaterial);
        rightPanel.position.x = 0.14;
        satellite.add(rightPanel);

        satellite.userData = {
          orbitRadius: radius,
          orbitSpeed: 0.002 + Math.random() * 0.002,
          orbitPhase: (i / 3) * Math.PI * 2,
          orbitTiltX: Math.PI / 2 + (orbitIndex * Math.PI) / 6,
          orbitTiltZ: (orbitIndex * Math.PI) / 4,
        };

        satelliteLayer.add(satellite);
      }
    });

    satelliteLayer.visible = false;
    scene.add(satelliteLayer);

    // Add orbital rings (always visible)
    const ringGeometry = new THREE.RingGeometry(2.5, 2.52, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x64ffda,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    });

    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.x = Math.PI / 2;
    scene.add(ring1);

    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring2.rotation.z = Math.PI / 3;
    scene.add(ring2);

    // === FLY-TO ANIMATION ===
    camera.position.z = 20; // Start far away
    camera.position.y = 5;
    const targetCameraZ = 5;
    const targetCameraY = 0;
    let flyInProgress = true;
    let flyStartTime = Date.now();
    const flyDuration = 2500; // 2.5 seconds

    // Easing function
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    // Enhanced mouse interaction
    let mouseX = 0,
      mouseY = 0;
    let targetRotationX = 0,
      targetRotationY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

      targetRotationX = mouseY * 0.3;
      targetRotationY = mouseX * 0.3;
    };

    document.addEventListener("mousemove", onMouseMove);

    // Animation loop with enhanced effects
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Fly-to animation
      if (flyInProgress) {
        const elapsed = Date.now() - flyStartTime;
        const progress = Math.min(elapsed / flyDuration, 1);
        const easedProgress = easeOutCubic(progress);

        camera.position.z = 20 + (targetCameraZ - 20) * easedProgress;
        camera.position.y = 5 + (targetCameraY - 5) * easedProgress;

        if (progress >= 1) {
          flyInProgress = false;
          setIsLoaded(true);
        }
      }

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

      // Animate network data points
      networkDataPoints.forEach((point, index) => {
        const userData = point.userData;
        userData.phase += userData.speed;

        const originalPos = userData.originalPosition;
        const radius = 0.1;

        point.position.x = originalPos.x + Math.sin(userData.phase) * radius;
        point.position.y = originalPos.y + Math.cos(userData.phase * 1.3) * radius;
        point.position.z = originalPos.z + Math.sin(userData.phase * 0.8) * radius;

        const scale = 1 + Math.sin(time * 2 + index * 0.1) * 0.3;
        point.scale.setScalar(scale);
      });

      // Animate heatmap
      heatmapLayer.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.userData.pulsePhase !== undefined) {
          child.userData.pulsePhase += 0.02;
          const scale = 1 + Math.sin(child.userData.pulsePhase) * 0.3;
          child.scale.setScalar(scale);
        }
      });

      // Animate satellites
      satelliteLayer.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.userData.orbitRadius) {
          const ud = child.userData;
          ud.orbitPhase += ud.orbitSpeed;

          const x = ud.orbitRadius * Math.cos(ud.orbitPhase);
          const z = ud.orbitRadius * Math.sin(ud.orbitPhase);

          // Apply orbit tilt
          child.position.x = x * Math.cos(ud.orbitTiltZ) - z * Math.sin(ud.orbitTiltZ);
          child.position.z = x * Math.sin(ud.orbitTiltZ) + z * Math.cos(ud.orbitTiltZ);
          child.position.y = z * Math.sin(ud.orbitTiltX - Math.PI / 2);

          child.lookAt(0, 0, 0);
        }
      });

      renderer.render(scene, camera);
    };

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize);
    animate();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onWindowResize);

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();
    };
  }, []);

  // Handle layer switching
  useEffect(() => {
    if (!layersRef.current) return;

    const { network, heatmap, satellite } = layersRef.current;

    // Smooth transition
    network.visible = activeLayer === "network";
    heatmap.visible = activeLayer === "heatmap";
    satellite.visible = activeLayer === "satellite";
  }, [activeLayer]);

  const layers: { id: DataLayer; label: string; icon: string }[] = [
    { id: "network", label: "Network", icon: "◉" },
    { id: "heatmap", label: "Heatmap", icon: "◈" },
    { id: "satellite", label: "Satellite", icon: "◎" },
  ];

  return (
    <>
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Layer Toggle Controls */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2"
          >
            {layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 backdrop-blur-md ${
                  activeLayer === layer.id
                    ? "bg-[var(--cyber-cyan)] text-[var(--deep-navy)]"
                    : "bg-white/10 text-[var(--cyber-cyan)] hover:bg-white/20 border border-[var(--cyber-cyan)]/30"
                }`}
              >
                <span className="text-lg">{layer.icon}</span>
                {layer.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedGlobe;
