import React, { useRef, useState } from 'react';

export default function TiltMockup() {
  const containerRef = useRef(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to center of container
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    
    // Map to rotation degrees (max 10 degrees)
    const rotateX = -(y / height) * 20;
    const rotateY = (x / width) * 20;

    setTransform(`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div 
        style={{
          transform,
          transition: 'transform 0.1s ease-out',
          width: '100%',
          position: 'relative',
          borderRadius: '32px',
          boxShadow: '0 50px 100px -20px rgba(0,0,0,0.8), 0 0 40px rgba(59,130,246,0.3)',
        }}
      >
        <img 
          src="/baton-docs/premium_final_mockup.png" 
          alt="Premium BATON Interface" 
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '32px',
            display: 'block',
            WebkitMaskImage: '-webkit-radial-gradient(white, black)', // Fix for Safari border-radius clipping
          }} 
        />
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          borderRadius: '32px',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
          pointerEvents: 'none'
        }}></div>
      </div>
    </div>
  );
}
