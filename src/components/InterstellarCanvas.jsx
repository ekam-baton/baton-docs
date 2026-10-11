import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function InterstellarCanvas() {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ─── Scene, Camera, Renderer ───
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0008);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // ─── 1. Deep Space Starfields (Multiple Depth Layers) ───
    const starCount = 1800;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 1600;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 1200;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 1400;
      starSizes[i] = Math.random() * 2.0 + 0.6;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));

    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.4,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // ─── 2. Interstellar Nebula Dust / Cosmic Horizon ───
    const dustCount = 450;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 80 + Math.random() * 400;
      dustPos[i * 3] = Math.cos(angle) * r;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 250;
      dustPos[i * 3 + 2] = Math.sin(angle) * r - 200;
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));

    const dustMat = new THREE.PointsMaterial({
      color: 0x99bbff,
      size: 3.2,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const dustField = new THREE.Points(dustGeo, dustMat);
    scene.add(dustField);

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

      // Smooth camera lerping with mouse parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.035;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.035;

      if (!prefersReducedMotion) {
        // Slow celestial orbital drift
        starField.rotation.y = time * 0.012;
        starField.rotation.x = time * 0.006;

        dustField.rotation.y = -time * 0.016;

        // Subtle camera navigation through the cosmos
        camera.position.x = mouseRef.current.x * 25;
        camera.position.y = mouseRef.current.y * 18;
        camera.lookAt(0, 0, -200);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);

      starGeo.dispose();
      starMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
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
        background: 'radial-gradient(ellipse at 50% 20%, #050811 0%, #000000 70%)',
      }}
    />
  );
}
