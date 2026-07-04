import React, { useRef, useState, useEffect } from 'react';

const LOG_MESSAGES = [
  "[SYS] Initializing local MCP tunnel...",
  "[AUTH] Handshake started with Client-ID: 0x8F9A2",
  "[AUTH] Verifying Zero-Trust signatures... OK",
  "[ROUTER] Secure connection to local Llama-3 established.",
  "[AGENT] Task received: Analyze local database schema",
  "[ROUTER] Delegating sub-task to Code Agent...",
  "[SECURE] Sandbox environment NemoClaw engaged.",
  "[SYS] Telemetry ping... 12ms latency",
  "[AGENT] Execution complete. Returning structured JSON.",
  "[ROUTER] Terminating tunnel gracefully. Keys flushed."
];

export default function RoutingNexus() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [transform, setTransform] = useState('perspective(1500px) rotateX(20deg) rotateY(-15deg)');
  const [logs, setLogs] = useState([]);
  
  // Terminal typing effect
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setLogs(prev => {
        const newLogs = [...prev, LOG_MESSAGES[currentIndex]];
        if (newLogs.length > 6) newLogs.shift();
        return newLogs;
      });
      currentIndex = (currentIndex + 1) % LOG_MESSAGES.length;
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // 3D Tilt Effect
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    const rotateX = -(y / height) * 30 + 10;
    const rotateY = (x / width) * 30 - 10;
    setTransform(`perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1500px) rotateX(20deg) rotateY(-15deg) scale3d(1, 1, 1)');
  };

  // Orbital Canvas Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const width = 500;
    const height = 500;
    canvas.width = width;
    canvas.height = height;

    const orbits = [
      { rx: 200, ry: 80, angle: 0, speed: 0.005, color: 'rgba(59, 130, 246, 0.4)' },
      { rx: 140, ry: 160, angle: Math.PI / 4, speed: -0.007, color: 'rgba(139, 92, 246, 0.4)' },
      { rx: 180, ry: 120, angle: -Math.PI / 6, speed: 0.004, color: 'rgba(99, 102, 241, 0.4)' }
    ];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height / 2;

      orbits.forEach(orbit => {
        // Draw the ring
        ctx.beginPath();
        ctx.ellipse(cx, cy, orbit.rx, orbit.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = orbit.color;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Update angle for particles
        orbit.angle += orbit.speed;

        // Draw data packet on the ring
        const px = cx + orbit.rx * Math.cos(orbit.angle);
        const py = cy + orbit.ry * Math.sin(orbit.angle);
        
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = orbit.color.replace('0.4', '1');
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '100%',
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: '1500px',
        transformStyle: 'preserve-3d',
        zIndex: 10
      }}
    >
      <div 
        style={{
          transform,
          transition: 'transform 0.15s ease-out',
          position: 'relative',
          width: '500px',
          height: '500px',
          transformStyle: 'preserve-3d',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* The Orbital Mesh (Background of Nexus) */}
        <canvas 
          ref={canvasRef} 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: 'translateZ(-50px)', // Pushed back slightly
            pointerEvents: 'none'
          }} 
        />

        {/* The Holographic Terminal */}
        <div style={{
          width: '400px',
          height: '260px',
          background: 'rgba(2, 6, 23, 0.65)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05), 0 0 40px rgba(59, 130, 246, 0.2)',
          padding: '1.5rem',
          transform: 'translateZ(50px)', // Pulled forward for 3D depth
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {/* Terminal Header */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
            <span style={{ marginLeft: '1rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontFamily: 'monospace' }}>BATON_ROUTER_NODE_v2.4</span>
          </div>

          {/* Terminal Logs */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '0.5rem' }}>
            {logs.map((log, index) => (
              <div 
                key={index} 
                style={{ 
                  fontFamily: '"JetBrains Mono", monospace', 
                  fontSize: '0.85rem', 
                  color: log.includes('[SYS]') ? '#3b82f6' : log.includes('[AUTH]') ? '#10b981' : log.includes('[SECURE]') ? '#ef4444' : '#94a3b8',
                  animation: 'fadeInUp 0.3s ease forwards',
                  textShadow: '0 0 10px rgba(255,255,255,0.1)'
                }}
              >
                {log}
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <span style={{ color: '#fff', fontFamily: 'monospace' }}>&gt;</span>
              <span style={{ width: '8px', height: '14px', background: '#3b82f6', animation: 'terminalPulse 1s infinite' }}></span>
            </div>
          </div>
        </div>

      </div>
      <style>{`
        @keyframes terminalPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
