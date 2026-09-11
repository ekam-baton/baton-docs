import React, { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (window.innerWidth <= 768) return; // Disable on mobile for performance

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const stars = [];
    const numStars = 800;
    const maxDepth = width * 2; // Much deeper field to extend cycle time
    
    // Mouse tracking for parallax shift
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetX = width / 2;
    let targetY = height / 2;

    const makeStar = (randomZ) => ({
      x: Math.random() * width * 3 - width * 1.5,
      y: Math.random() * height * 3 - height * 1.5,
      z: randomZ ? Math.random() * maxDepth : maxDepth * (0.75 + Math.random() * 0.5),
      o: 0.3 + Math.random() * 0.7,
      size: Math.random() * 1.5 + 0.5,
      speed: 0.6 + Math.random() * 1.8 // Per-star speed: 0.6 to 2.4
    });

    const initStars = () => {
      for (let i = 0; i < numStars; i++) {
        stars[i] = makeStar(true); // Scatter across full depth on init
      }
    };

    initStars();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      targetX = width / 2;
      targetY = height / 2;
    };

    const handleMouseMove = (e) => {
      // Create a subtle shift based on mouse position
      targetX = width / 2 + (e.clientX - width / 2) * 0.05;
      targetY = height / 2 + (e.clientY - height / 2) * 0.05;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    let lastTime = performance.now();

    const draw = () => {
      const now = performance.now();
      const dt = (now - lastTime) / 16.67;
      lastTime = now;

      // Smoothly interpolate mouse position
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'; // Trail effect with pure black
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        star.z -= star.speed * dt; // Each star has its own speed

        if (star.z <= 0) {
          const fresh = makeStar(false); // Reset far back with new random properties
          star.x = fresh.x;
          star.y = fresh.y;
          star.z = fresh.z;
          star.o = fresh.o;
          star.size = fresh.size;
          star.speed = fresh.speed;
        }

        // Project 3D coordinates to 2D screen space
        const k = 128.0 / star.z;
        const px = star.x * k + mouseX;
        const py = star.y * k + mouseY;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = (1 - star.z / maxDepth) * star.size;
          const opacity = (1 - star.z / maxDepth) * star.o;
          
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        background: '#000000'
      }}
    />
  );
}
