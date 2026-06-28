import React, { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars = [];
    const numStars = 800;
    
    // Mouse tracking for parallax shift
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetX = width / 2;
    let targetY = height / 2;

    const initStars = () => {
      for (let i = 0; i < numStars; i++) {
        stars[i] = {
          x: Math.random() * width * 2 - width,
          y: Math.random() * height * 2 - height,
          z: Math.random() * width,
          o: Math.random(),
          size: Math.random() * 1.5 + 0.5
        };
      }
    };

    initStars();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
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

    const draw = () => {
      // Smoothly interpolate mouse position
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      ctx.fillStyle = 'rgba(5, 5, 8, 0.4)'; // Trail effect with dark galaxy blue/black
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        star.z -= 1.5; // Speed of travel

        if (star.z <= 0) {
          star.x = Math.random() * width * 2 - width;
          star.y = Math.random() * height * 2 - height;
          star.z = width;
          star.o = Math.random();
        }

        // Project 3D coordinates to 2D screen space
        const k = 128.0 / star.z;
        const px = star.x * k + mouseX;
        const py = star.y * k + mouseY;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = (1 - star.z / width) * star.size;
          const opacity = (1 - star.z / width) * star.o;
          
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

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
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: '#050508'
      }}
    />
  );
}
