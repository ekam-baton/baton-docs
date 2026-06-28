import React, { useRef, useState, useEffect } from 'react';

export default function ImmersivePhone() {
  const containerRef = useRef(null);
  const [transform, setTransform] = useState('perspective(1500px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to center of container
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    
    // Map to rotation degrees for severe parallax
    const rotateX = -(y / height) * 25;
    const rotateY = (x / width) * 25;
    
    // Translate Z to pull it forward
    const translateZ = 50;

    setTransform(`perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale3d(1.05, 1.05, 1.05)`);

    // Glare effect positioning (percentage)
    const glareX = ((e.clientX - left) / width) * 100;
    const glareY = ((e.clientY - top) / height) * 100;
    setGlarePosition({ x: glareX, y: glareY, opacity: 0.6 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1500px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)');
    setGlarePosition(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '100%',
        maxWidth: '850px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        perspective: '1500px', // establish 3D space
        transformStyle: 'preserve-3d',
        zIndex: 10
      }}
    >
      <div 
        style={{
          transform,
          transition: 'transform 0.1s ease-out',
          width: '100%',
          position: 'relative',
          borderRadius: '40px',
          boxShadow: '0 50px 100px -20px rgba(0,0,0,1), 0 0 60px rgba(59,130,246,0.4), 0 0 100px rgba(139,92,246,0.2)',
          transformStyle: 'preserve-3d',
        }}
      >
        <img 
          src="/baton-docs/premium_final_mockup.png" 
          alt="Premium BATON Interface" 
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '40px',
            display: 'block',
            WebkitMaskImage: '-webkit-radial-gradient(white, black)',
          }} 
        />
        
        {/* Dynamic Glare Overlay */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          borderRadius: '40px',
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, ${glarePosition.opacity}) 0%, rgba(255,255,255,0) 60%)`,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
          transition: 'background 0.1s ease-out',
          zIndex: 2,
        }}></div>

        {/* Inner Glass Bevel */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          borderRadius: '40px',
          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), inset 0 0 0 1px rgba(255,255,255,0.1)',
          pointerEvents: 'none',
          zIndex: 3,
        }}></div>
      </div>
    </div>
  );
}
