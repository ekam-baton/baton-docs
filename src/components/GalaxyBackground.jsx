import React, { useEffect, useRef } from 'react';

export default function GalaxyBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    let centerX = width / 2;
    let centerY = height / 2;
    let animationFrameId;

    const STAR_COUNT = 450;
    const SPEED = 3.2;
    const MAX_DEPTH = 1200;
    const FOV = 320;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      centerX = width / 2;
      centerY = height / 2;
      canvas.width = width;
      canvas.height = height;
    };

    class Star {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        // Spread evenly in 3D volume around center
        this.x = (Math.random() - 0.5) * width * 2.2;
        this.y = (Math.random() - 0.5) * height * 2.2;
        this.z = initial ? Math.random() * MAX_DEPTH + 1 : MAX_DEPTH;
        this.pz = this.z;
        this.baseSize = Math.random() * 1.5 + 0.8;
        // 20% subtle icy blue stars, 80% bright white
        this.isBlue = Math.random() > 0.8;
      }

      update() {
        this.pz = this.z;
        this.z -= SPEED;

        // Subtle mouse steering
        this.x += mouseX * 0.12;
        this.y += mouseY * 0.12;

        if (this.z <= 1) {
          this.reset(false);
          this.pz = this.z;
        }
      }

      draw() {
        // Perspective projection
        const k = FOV / this.z;
        const px = this.x * k + centerX;
        const py = this.y * k + centerY;

        // Previous position for velocity warp trail
        const prevK = FOV / this.pz;
        const prevPx = this.x * prevK + centerX;
        const prevPy = this.y * prevK + centerY;

        // Bounds check
        if (px < -100 || px > width + 100 || py < -100 || py > height + 100) {
          return;
        }

        // Brightness and size scale with closeness
        const depthRatio = Math.max(0, Math.min(1, 1 - this.z / MAX_DEPTH));
        const alpha = Math.min(1, depthRatio * 1.25);
        const size = Math.max(0.6, this.baseSize * k * 0.45);

        // Draw traveling warp streak line
        ctx.beginPath();
        ctx.moveTo(prevPx, prevPy);
        ctx.lineTo(px, py);

        if (this.isBlue) {
          ctx.strokeStyle = `rgba(147, 197, 253, ${alpha * 0.85})`;
        } else {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
        }

        ctx.lineWidth = Math.min(size, 2.5);
        ctx.lineCap = 'round';
        ctx.stroke();

        // Draw bright star head
        ctx.beginPath();
        ctx.arc(px, py, size * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = this.isBlue ? `rgba(191, 219, 254, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }
    }

    // Set canvas dimensions first
    resize();

    // Now instantiate stars with valid width & height
    const stars = Array.from({ length: STAR_COUNT }, () => new Star());

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX - centerX) / centerX;
      targetMouseY = (e.clientY - centerY) / centerY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse damping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      for (let i = 0; i < stars.length; i++) {
        stars[i].update();
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
        opacity: 0.85,
      }}
      aria-hidden="true"
    />
  );
}
