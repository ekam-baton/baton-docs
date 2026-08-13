import React, { useEffect, useRef } from 'react';

export default function GalaxyBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];
    const PARTICLE_COUNT = 120;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight * 2;
      canvas.width = width;
      canvas.height = height;
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.2 + 0.3;
        this.opacity = Math.random() * 0.25 + 0.05;
        this.baseOpacity = this.opacity;
        // Very slow, random drift — each particle moves independently
        this.vx = (Math.random() - 0.5) * 0.08;
        this.vy = (Math.random() - 0.5) * 0.04 - 0.02; // slight upward bias
        // Gentle brightness pulsing at different rates
        this.pulseSpeed = Math.random() * 0.002 + 0.001;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update(time) {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
        if (this.y < -10) this.y = height + 10;
        if (this.y > height + 10) this.y = -10;

        // Gentle brightness pulse
        this.opacity = this.baseOpacity * (0.6 + 0.4 * Math.sin(time * this.pulseSpeed + this.pulseOffset));
      }

      draw() {
        ctx.fillStyle = `rgba(200, 205, 215, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      resize();
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    };

    let animationFrameId;
    let startTime = performance.now();

    const animate = () => {
      const elapsed = performance.now() - startTime;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.update(elapsed);
        p.draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
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
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.5,
      }}
      aria-hidden="true"
    />
  );
}
