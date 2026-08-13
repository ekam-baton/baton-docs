import React, { useEffect, useRef } from 'react';

export default function GalaxyBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    let centerX, centerY;
    let animationFrameId;

    // Star configuration
    const STAR_COUNT = 360;
    const BASE_SPEED = 2.4;
    const MAX_DEPTH = 1500;
    const FOV = 280;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      centerX = width / 2;
      centerY = height / 2;
    };

    class Star {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        // Distribute in a spherical cylinder around center
        const radius = Math.random() * (width * 0.9) + 40;
        const angle = Math.random() * Math.PI * 2;
        this.x = Math.cos(angle) * radius;
        this.y = Math.sin(angle) * radius;
        this.z = initial ? Math.random() * MAX_DEPTH : MAX_DEPTH;
        this.pz = this.z;
        this.baseSize = Math.random() * 1.4 + 0.6;
        this.hue = Math.random() > 0.85 ? 210 : 0; // Subtle cool silver/cyan stars mixed with pure white
      }

      update(speed) {
        this.pz = this.z;
        this.z -= speed;

        // Interactive mouse parallax steering
        this.x += mouseX * 0.08;
        this.y += mouseY * 0.08;

        if (this.z <= 2) {
          this.reset(false);
          this.pz = this.z;
        }
      }

      draw() {
        // Project current position
        const k = FOV / this.z;
        const px = this.x * k + centerX;
        const py = this.y * k + centerY;

        // If outside viewport, don't draw
        if (px < -50 || px > width + 50 || py < -50 || py > height + 50) {
          return;
        }

        // Project previous position for warp streaks
        const prevK = FOV / this.pz;
        const prevPx = this.x * prevK + centerX;
        const prevPy = this.y * prevK + centerY;

        // Depth brightness factor (closer = brighter & larger)
        const depthRatio = 1 - this.z / MAX_DEPTH;
        const alpha = Math.min(1, Math.max(0, depthRatio * 1.1));
        const size = Math.max(0.5, this.baseSize * k * 0.6);

        // Draw light streak line
        ctx.beginPath();
        ctx.moveTo(prevPx, prevPy);
        ctx.lineTo(px, py);

        if (this.hue === 210) {
          ctx.strokeStyle = `rgba(180, 215, 255, ${alpha * 0.75})`;
        } else {
          ctx.strokeStyle = `rgba(235, 240, 255, ${alpha * 0.7})`;
        }

        ctx.lineWidth = Math.min(size, 2.2);
        ctx.lineCap = 'round';
        ctx.stroke();

        // Draw glowing head of star
        ctx.beginPath();
        ctx.arc(px, py, size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
        ctx.fill();
      }
    }

    const stars = Array.from({ length: STAR_COUNT }, () => new Star());

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX - centerX) / centerX;
      targetMouseY = (e.clientY - centerY) / centerY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();

    const animate = () => {
      // Clear with slight motion persistence or full clear
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      for (let i = 0; i < stars.length; i++) {
        stars[i].update(BASE_SPEED);
        stars[i].draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
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
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.65,
      }}
      aria-hidden="true"
    />
  );
}
