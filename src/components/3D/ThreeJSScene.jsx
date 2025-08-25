import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const ThreeJSScene = ({ 
  width = 400, 
  height = 300, 
  enableMouseFollow = true,
  glassEffect = true,
  className = '' 
}) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const meshRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    mountRef.current.appendChild(renderer.domElement);

    // Glass material with professional effects
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x667eea,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 0.5,
      transparent: true,
      opacity: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      ior: 1.5,
      reflectivity: 0.9,
      iridescence: 0.3,
      iridescenceIOR: 1.3,
      iridescenceThicknessRange: [100, 800],
    });

    // Create 3D geometry
    const geometry = new THREE.IcosahedronGeometry(1.2, 1);
    const mesh = new THREE.Mesh(geometry, glassMaterial);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);

    // Professional lighting setup
    const ambientLight = new THREE.AmbientLight(0x667eea, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x667eea, 0.8, 10);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x764ba2, 0.6, 10);
    pointLight2.position.set(-2, -2, 2);
    scene.add(pointLight2);

    // Environment map for reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(scene).texture;
    scene.environment = envTexture;

    camera.position.z = 4;

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;
    meshRef.current = mesh;

    // Mouse movement handler
    const handleMouseMove = (event) => {
      if (!enableMouseFollow) return;
      
      const rect = mountRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    if (enableMouseFollow) {
      mountRef.current.addEventListener('mousemove', handleMouseMove);
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (mesh) {
        // Smooth rotation
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;

        // Mouse following effect
        if (enableMouseFollow) {
          mesh.rotation.x += (mouseRef.current.y * 0.5 - mesh.rotation.x) * 0.05;
          mesh.rotation.y += (mouseRef.current.x * 0.5 - mesh.rotation.y) * 0.05;
        }

        // Floating animation
        mesh.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      }

      // Dynamic lighting
      if (pointLight1) {
        pointLight1.position.x = Math.sin(Date.now() * 0.002) * 3;
        pointLight1.position.z = Math.cos(Date.now() * 0.002) * 3;
      }

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Cleanup
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (enableMouseFollow && mountRef.current) {
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      renderer.dispose();
      geometry.dispose();
      glassMaterial.dispose();
    };
  }, [width, height, enableMouseFollow, glassEffect]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (rendererRef.current && sceneRef.current) {
        const camera = sceneRef.current.children.find(child => child.isCamera);
        if (camera) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        }
        rendererRef.current.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width, height]);

  return (
    <div 
      ref={mountRef} 
      className={`three-scene ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out'
      }}
    />
  );
};

export default ThreeJSScene;
