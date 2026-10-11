import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Baton3DCanvas({ variation = 1 }) {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ─── Scene, Camera, Renderer ───
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
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // ─── 1. The White Baton (Core 3D Property) ───
    const batonGroup = new THREE.Group();
    rootGroup.add(batonGroup);

    const batonMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0x181818,
      roughness: 0.12,
      metalness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
    });

    const shaftHeight = variation === 2 ? 4.8 : 4.2;
    const shaftGeo = new THREE.CylinderGeometry(0.24, 0.28, shaftHeight, 48);
    const shaft = new THREE.Mesh(shaftGeo, batonMaterial);
    batonGroup.add(shaft);

    const topCapGeo = new THREE.SphereGeometry(0.24, 32, 16);
    const topCap = new THREE.Mesh(topCapGeo, batonMaterial);
    topCap.position.y = shaftHeight / 2;
    batonGroup.add(topCap);

    const bottomCapGeo = new THREE.SphereGeometry(0.28, 32, 16);
    const bottomCap = new THREE.Mesh(bottomCapGeo, batonMaterial);
    bottomCap.position.y = -shaftHeight / 2;
    batonGroup.add(bottomCap);

    const gripMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf0f0f5,
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

    // ─── VARIATION 1: Orbital Liquid Chrome Rings ───
    let ring1, ring2, chromeMaterial;
    if (variation === 1) {
      batonGroup.rotation.z = 0.28;
      batonGroup.rotation.x = 0.15;

      const chromeGroup = new THREE.Group();
      rootGroup.add(chromeGroup);

      chromeMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x222225,
        emissive: 0x050508,
        roughness: 0.05,
        metalness: 0.98,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
        reflectivity: 1.0,
      });

      const ring1Geo = new THREE.TorusGeometry(3.2, 0.08, 32, 128);
      ring1 = new THREE.Mesh(ring1Geo, chromeMaterial);
      ring1.rotation.x = Math.PI / 3;
      ring1.rotation.y = 0.4;
      chromeGroup.add(ring1);

      const ring2Geo = new THREE.TorusGeometry(2.3, 0.055, 32, 128);
      ring2 = new THREE.Mesh(ring2Geo, chromeMaterial);
      ring2.rotation.x = -Math.PI / 4;
      ring2.rotation.y = -0.6;
      chromeGroup.add(ring2);
    }

    // ─── VARIATION 2: Undulating Liquid Mercury Wave Pool ───
    let waterPlane, waterGeo, originalPositions;
    if (variation === 2) {
      batonGroup.position.set(0, 0.6, 0);
      batonGroup.rotation.set(0.08, 0, 0); // Upright monolith

      waterGeo = new THREE.PlaneGeometry(26, 26, 120, 120);
      originalPositions = waterGeo.attributes.position.clone();

      const waterMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x08080c,
        emissive: 0x020204,
        roughness: 0.08,
        metalness: 0.96,
        clearcoat: 1.0,
        clearcoatRoughness: 0.04,
        reflectivity: 1.0,
      });

      waterPlane = new THREE.Mesh(waterGeo, waterMaterial);
      waterPlane.rotation.x = -Math.PI / 2;
      waterPlane.position.y = -1.8;
      rootGroup.add(waterPlane);
    }

    // ─── Cosmic Dust & Constellation Particles ───
    const particleCount = 550;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 2.0 + Math.random() * 5.5;
      const spreadY = (Math.random() - 0.5) * (variation === 2 ? 5.5 : 4.0);
      
      particlePos[i * 3] = Math.cos(theta) * radius;
      particlePos[i * 3 + 1] = spreadY + (variation === 2 ? 0.8 : 0);
      particlePos[i * 3 + 2] = Math.sin(theta) * radius;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.038,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMaterial);
    rootGroup.add(particles);

    // ─── Lighting ───
    const ambientLight = new THREE.AmbientLight(0x22222a, 3.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.5);
    keyLight.position.set(6, 9, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xddeeff, 5.0);
    rimLight.position.set(-8, -4, -6);
    scene.add(rimLight);

    const batonGlowLight = new THREE.PointLight(0xffffff, 5.5, 12);
    batonGlowLight.position.set(0, 0.5, 4);
    scene.add(batonGlowLight);

    if (variation === 2) {
      // Top down pool caustic spotlight
      const poolSpot = new THREE.PointLight(0xddeeff, 4.0, 16);
      poolSpot.position.set(0, 4, 1);
      scene.add(poolSpot);
    }

    // ─── Interaction Listeners ───
    const onPointerMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      mouseRef.current.targetX = (clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // ─── Animation Loop ───
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth mouse lerping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (!prefersReducedMotion) {
        if (variation === 1) {
          // Orbital motion
          batonGroup.rotation.y = time * 0.45;
          batonGroup.position.y = Math.sin(time * 1.2) * 0.22;

          if (ring1) {
            ring1.rotation.z = time * 0.25;
            ring1.rotation.y = Math.sin(time * 0.5) * 0.5 + 0.4;
          }
          if (ring2) {
            ring2.rotation.z = -time * 0.35;
            ring2.rotation.x = Math.cos(time * 0.4) * 0.4 - Math.PI / 4;
          }
        } else if (variation === 2 && waterPlane) {
          // Monolith subtle breathing & fluid mercury wave displacement
          batonGroup.rotation.y = time * 0.2;
          batonGroup.position.y = 0.6 + Math.sin(time * 1.5) * 0.08;

          const posAttr = waterGeo.attributes.position;
          const origPos = originalPositions.array;
          const count = posAttr.count;

          const mouseDisturbX = mouseRef.current.x * 3.0;
          const mouseDisturbY = mouseRef.current.y * 3.0;

          for (let i = 0; i < count; i++) {
            const u = origPos[i * 3];
            const v = origPos[i * 3 + 1];
            const distFromCenter = Math.sqrt(u * u + v * v);
            const distFromMouse = Math.sqrt((u - mouseDisturbX) ** 2 + (v - mouseDisturbY) ** 2);

            // Concentric ripple from baton + perturbation from mouse
            const ripple = Math.sin(distFromCenter * 2.8 - time * 3.0) * Math.exp(-distFromCenter * 0.28) * 0.24;
            const mouseWave = Math.sin(distFromMouse * 3.2 - time * 4.0) * Math.exp(-distFromMouse * 0.5) * 0.16;

            posAttr.setZ(i, ripple + mouseWave);
          }
          posAttr.needsUpdate = true;
          waterGeo.computeVertexNormals();
        }

        particles.rotation.y = time * 0.06;

        // Interactive tilt based on pointer
        rootGroup.rotation.y = mouseRef.current.x * 0.45;
        rootGroup.rotation.x = -mouseRef.current.y * 0.35;
        rootGroup.position.x = mouseRef.current.x * 0.4;
        rootGroup.position.y = mouseRef.current.y * 0.3;
      }

      renderer.render(scene, camera);
    };

    animate();

    // ─── Cleanup ───
    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);

      shaftGeo.dispose();
      topCapGeo.dispose();
      bottomCapGeo.dispose();
      if (waterGeo) waterGeo.dispose();
      particleGeo.dispose();
      batonMaterial.dispose();
      gripMaterial.dispose();
      if (chromeMaterial) chromeMaterial.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [variation]);

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
