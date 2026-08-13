import React, { useEffect, useRef } from 'react';

export default function GalaxyBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;

    const numStars = 320;
    const speed = 2.2;
    const fov = 260;
    let maxDepth = 1200;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      cx = width / 2;
      cy = height / 2;
      maxDepth = Math.max(width, height, 1000);
    };

    class Star {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = (Math.random() - 0.5) * width * 2;
        this.y = (Math.random() - 0.5) * height * 2;
        this.z = initial ? Math.random() * maxDepth : maxDepth;
        this.pz = this.z;
        this.size = Math.random() * 1.4 + 0.6;
        this.brightness = Math.random() * 0.4 + 0.6;
      }

      update() {
        this.pz = this.z;
        this.z -= speed;

        if (this.z <= 1) {
          this.reset(false);
          this.pz = this.z;
        }
      }

      draw() {
        if (this.z <= 0) return;

        const k = fov / this.z;
        const sx = this.x * k + cx;
        const sy = this.y * k + cy;

        // Skip if outside screen bounds
        if (sx < -20 || sx > width + 20 || sy < -20 || sy > height + 20) {
          if (this.z < maxDepth * 0.4) {
            this.reset(false);
          }
          return;
        }

        const pk = fov / Math.min(this.pz, maxDepth);
        const px = this.x * pk + cx;
        const py = this.y * pk + cy;

        // Depth-based opacity: brighter as it travels closer
        const depthRatio = 1 - this.z / maxDepth;
        const alpha = Math.min(Math.max(depthRatio * this.brightness, 0.08), 0.95);
        const starSize = Math.max(this.size * (1 + depthRatio * 1.5), 0.5);

        ctx.strokeStyle = `rgba(240, 243, 255, ${alpha})`;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = starSize;
        ctx.lineCap = 'round';

        // Draw star warp trail
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();

        // Draw star head
        ctx.beginPath();
        ctx.arc(sx, sy, starSize * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    resize();
    const stars = Array.from({ length: numStars }, () => new Star());

    const render = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].draw();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
