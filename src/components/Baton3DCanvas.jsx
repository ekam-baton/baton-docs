import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Baton3DCanvas({ scrollYProgress = 0 }) {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for the Baton & Chrome System
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // ─── 1. The White Baton (3D Property) ───
    const batonGroup = new THREE.Group();
    rootGroup.add(batonGroup);

    // Baton Material (Pristine gloss white ceramic/lacquer with subtle rim illumination)
    const batonMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0x111111,
      roughness: 0.12,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    // Shaft
    const shaftGeo = new THREE.CylinderGeometry(0.24, 0.28, 4.2, 48);
    const shaft = new THREE.Mesh(shaftGeo, batonMaterial);
    batonGroup.add(shaft);

    // Top Tip (Spherical Cap)
    const topCapGeo = new THREE.SphereGeometry(0.24, 32, 16);
    const topCap = new THREE.Mesh(topCapGeo, batonMaterial);
    topCap.position.y = 2.1;
    batonGroup.add(topCap);

    // Bottom Base & Ergonomic Grip (matching BATON logo contours)
    const bottomCapGeo = new THREE.SphereGeometry(0.28, 32, 16);
    const bottomCap = new THREE.Mesh(bottomCapGeo, batonMaterial);
    bottomCap.position.y = -2.1;
    batonGroup.add(bottomCap);

    // Grip Contour Rings
    const gripMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xeeeeee,
      roughness: 0.35,
      metalness: 0.2,
      clearcoat: 0.8,
    });

    [-1.2, -1.5, -1.8].forEach((yPos) => {
      const ringGeo = new THREE.TorusGeometry(0.275, 0.025, 16, 48);
      const ring = new THREE.Mesh(ringGeo, gripMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = yPos;
      batonGroup.add(ring);
    });

    // Tilt baton slightly for sculptural angle
    batonGroup.rotation.z = 0.28;
    batonGroup.rotation.x = 0.15;

    // ─── 2. Liquid Chrome Fluid Rings (Lusion aesthetic) ───
    const chromeGroup = new THREE.Group();
    rootGroup.add(chromeGroup);

    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x222225,
      emissive: 0x050508,
      roughness: 0.05,
      metalness: 0.98,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 1.0,
    });

    // Outer fluid ring
    const ring1Geo = new THREE.TorusGeometry(3.2, 0.08, 32, 128);
    const ring1 = new THREE.Mesh(ring1Geo, chromeMaterial);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = 0.4;
    chromeGroup.add(ring1);

    // Inner orbiting liquid ring
    const ring2Geo = new THREE.TorusGeometry(2.3, 0.055, 32, 128);
    const ring2 = new THREE.Mesh(ring2Geo, chromeMaterial);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = -0.6;
    chromeGroup.add(ring2);

    // Morphing fluid particle constellation
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 2.0 + Math.random() * 5.0;
      const spreadY = (Math.random() - 0.5) * 3.5;
      
      particlePos[i * 3] = Math.cos(theta) * radius;
      particlePos[i * 3 + 1] = spreadY;
      particlePos[i * 3 + 2] = Math.sin(theta) * radius;
      particleScales[i] = Math.random() * 0.8 + 0.2;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.04,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMaterial);
    rootGroup.add(particles);

    // ─── 3. Lighting (Dramatic High-Key / Rim Speculars) ───
    const ambientLight = new THREE.AmbientLight(0x22222a, 3.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.5);
    keyLight.position.set(6, 8, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xddeeff, 5.0);
    rimLight.position.set(-8, -4, -6);
    scene.add(rimLight);

    const batonGlowLight = new THREE.PointLight(0xffffff, 5.0, 12);
    batonGlowLight.position.set(0, 0, 4);
    scene.add(batonGlowLight);

    // ─── 4. Mouse & Touch Interaction ───
    const onPointerMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      mouseRef.current.targetX = (clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    // ─── 5. Resize Handling ───
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // ─── 6. Animation Loop ───
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse lerping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (!prefersReducedMotion) {
        // Continuous organic rotation
        batonGroup.rotation.y = time * 0.45;
        batonGroup.position.y = Math.sin(time * 1.2) * 0.22;

        ring1.rotation.z = time * 0.25;
        ring1.rotation.y = Math.sin(time * 0.5) * 0.5 + 0.4;

        ring2.rotation.z = -time * 0.35;
        ring2.rotation.x = Math.cos(time * 0.4) * 0.4 - Math.PI / 4;

        particles.rotation.y = time * 0.08;

        // Interactive tilt based on pointer
        rootGroup.rotation.y = mouseRef.current.x * 0.6;
        rootGroup.rotation.x = -mouseRef.current.y * 0.45;
        rootGroup.position.x = mouseRef.current.x * 0.5;
        rootGroup.position.y = mouseRef.current.y * 0.4;
      }

      renderer.render(scene, camera);
    };

    animate();

    // ─── 7. Cleanup ───
    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);

      // Dispose Three.js objects
      shaftGeo.dispose();
      topCapGeo.dispose();
      bottomCapGeo.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      particleGeo.dispose();
      batonMaterial.dispose();
      gripMaterial.dispose();
      chromeMaterial.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
