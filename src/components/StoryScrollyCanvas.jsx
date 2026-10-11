import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// ─── Soft Circular Particle Sprite (Canvas-generated, additive bloom) ───
function createParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(224, 242, 254, 0.85)');
  gradient.addColorStop(0.55, 'rgba(56, 189, 248, 0.25)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// ─── Act 1: Holographic HUD Communicator Texture ───
function createCockpitHudTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const bg = ctx.createLinearGradient(0, 0, 512, 256);
  bg.addColorStop(0, 'rgba(6, 14, 26, 0.92)');
  bg.addColorStop(1, 'rgba(3, 8, 16, 0.92)');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 512, 256);

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.strokeRect(12, 12, 488, 232);

  // Micro bracket accents
  ctx.strokeStyle = '#60a5fa';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(8, 28); ctx.lineTo(8, 8); ctx.lineTo(28, 8); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(484, 8); ctx.lineTo(504, 8); ctx.lineTo(504, 28); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(8, 228); ctx.lineTo(8, 248); ctx.lineTo(28, 248); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(484, 248); ctx.lineTo(504, 248); ctx.lineTo(504, 228); ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 14px "JetBrains Mono", monospace';
  ctx.fillText('● BATON INTERSTELLAR COMM // RELAY-01', 28, 42);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText('RANGE: 3.84 AU // CIPHER: X25519 + AES-256-GCM', 28, 64);

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
  ctx.beginPath(); ctx.moveTo(28, 76); ctx.lineTo(484, 76); ctx.stroke();

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText('OUTGOING PROMPT TO HOME DAEMON:', 28, 106);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '13px "JetBrains Mono", monospace';
  ctx.fillText('"Preheat oven 375°, roast veggies,', 28, 132);
  ctx.fillText(' set dining table for 4 before family returns."', 28, 154);

  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText('STATUS: ENCRYPTED // 0 INTERMEDIATE CLOUD BYTES', 28, 192);

  ctx.fillStyle = '#64748b';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText('TARGET: HOME WORKSTATION [ONLINE]', 28, 214);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// ─── Act 4: Domestic Sanctuary HUD Texture ───
function createDomesticHudTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const bg = ctx.createLinearGradient(0, 0, 512, 256);
  bg.addColorStop(0, 'rgba(24, 16, 10, 0.94)');
  bg.addColorStop(1, 'rgba(14, 8, 6, 0.94)');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 512, 256);

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.strokeRect(12, 12, 488, 232);

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 14px "JetBrains Mono", monospace';
  ctx.fillText('✦ HOME SANCTUARY // DOMESTIC AGENT', 28, 42);

  ctx.fillStyle = '#d97706';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText('RTX 4090 LOCAL DAEMON // TASK VERIFIED', 28, 64);

  ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
  ctx.beginPath(); ctx.moveTo(28, 76); ctx.lineTo(484, 76); ctx.stroke();

  ctx.fillStyle = '#fef3c7';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText('CURRENT ACTIONS EXECUTING:', 28, 106);

  ctx.fillStyle = '#34d399';
  ctx.font = '13px "JetBrains Mono", monospace';
  ctx.fillText('✓ Oven preheated to 375°F (Roasting)', 28, 130);
  ctx.fillText('✓ Seasoned vegetables placed in oven', 28, 152);
  ctx.fillText('✓ Dining table set for 4 (Family of Four)', 28, 174);

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText('ETA SARAH & KIDS: 25 MINUTES', 28, 208);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export default function StoryScrollyCanvas({ scrollProgress = 0 }) {
  const containerRef = useRef(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (e) {
      console.warn('WebGL initialization failed, falling back:', e);
      setHasWebGL(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1200
    );
    camera.position.set(0, 0, 32);

    // ─── Lighting ───
    const ambientLight = new THREE.AmbientLight(0x1e293b, 2.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.8);
    dirLight1.position.set(20, 30, 40);
    scene.add(dirLight1);

    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 2.2);
    cyanRim.position.set(-25, -15, -30);
    scene.add(cyanRim);

    const warmHearthLight = new THREE.PointLight(0xf59e0b, 0, 50);
    warmHearthLight.position.set(0, 3, -12);
    scene.add(warmHearthLight);

    // ═════════════════════════════════════════════════════════════════
    // 8,500 LUMINESCENT PARTICLES (MORPHING SCULPTURE ACROSS 4 ACTS)
    // ═════════════════════════════════════════════════════════════════
    const N = 8500;
    const pos1 = new Float32Array(N * 3); // Act 1: Celestial Astronaut in Orbit
    const pos2 = new Float32Array(N * 3); // Act 2: Relativistic Quantum Conduit
    const pos3 = new Float32Array(N * 3); // Act 3: Planet Earth Sanctuary
    const pos4 = new Float32Array(N * 3); // Act 4: Domestic Sanctuary & Robot Agent

    const col1 = new Float32Array(N * 3);
    const col2 = new Float32Array(N * 3);
    const col3 = new Float32Array(N * 3);
    const col4 = new Float32Array(N * 3);

    // ── Precalculate Stage 1: Celestial Astronaut & Cosmic Nexus ──
    for (let i = 0; i < N; i++) {
      const i3 = i * 3;
      if (i < 2400) {
        // Astronaut Helmet & Visor Arc
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2 * Math.PI;
        const phi = Math.acos(2 * v - 1);
        const r = 2.4 * Math.cbrt(Math.random());
        pos1[i3] = r * Math.sin(phi) * Math.cos(theta);
        pos1[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) + 0.8;
        pos1[i3 + 2] = r * Math.cos(phi) - 2.0;

        col1[i3] = 0.55 + Math.random() * 0.45; // Cyan / Diamond white
        col1[i3 + 1] = 0.85 + Math.random() * 0.15;
        col1[i3 + 2] = 1.0;
      } else if (i < 4800) {
        // Orbital Spacecraft Viewport Arc
        const angle = (i / 2400) * Math.PI * 2;
        const r = 7.2 + (Math.random() - 0.5) * 1.6;
        pos1[i3] = Math.cos(angle) * r;
        pos1[i3 + 1] = Math.sin(angle) * r - 0.6;
        pos1[i3 + 2] = (Math.random() - 0.5) * 6.0;

        col1[i3] = 0.22;
        col1[i3 + 1] = 0.74;
        col1[i3 + 2] = 0.97;
      } else {
        // Distant Cosmic Stardust
        pos1[i3] = (Math.random() - 0.5) * 90;
        pos1[i3 + 1] = (Math.random() - 0.5) * 90;
        pos1[i3 + 2] = (Math.random() - 0.5) * 120 - 30;

        col1[i3] = 0.8;
        col1[i3 + 1] = 0.9;
        col1[i3 + 2] = 1.0;
      }
    }

    // ── Precalculate Stage 2: Quantum Conduit & Relativistic Beam ──
    for (let i = 0; i < N; i++) {
      const i3 = i * 3;
      const z = (i / N) * 160 - 80;
      const helix = i * 0.07;
      const strand = i % 2 === 0 ? 1 : -1;
      const r = 2.6 + Math.sin(z * 0.12) * 0.5 + Math.random() * 0.8;
      pos2[i3] = Math.cos(helix + strand * Math.PI) * r;
      pos2[i3 + 1] = Math.sin(helix + strand * Math.PI) * r;
      pos2[i3 + 2] = z;

      if (i % 3 === 0) {
        col2[i3] = 0.0; col2[i3 + 1] = 0.96; col2[i3 + 2] = 1.0; // Cyan
      } else if (i % 3 === 1) {
        col2[i3] = 0.23; col2[i3 + 1] = 0.51; col2[i3 + 2] = 0.96; // Electric Blue
      } else {
        col2[i3] = 0.66; col2[i3 + 1] = 0.35; col2[i3 + 2] = 0.96; // Relativistic Violet
      }
    }

    // ── Precalculate Stage 3: Earth Planetary Sphere & Reticle ──
    for (let i = 0; i < N; i++) {
      const i3 = i * 3;
      if (i < 6500) {
        // Fibonacci Sphere (Planet Earth)
        const y = 1 - (i / 6499) * 2;
        const radius = Math.sqrt(Math.max(0, 1 - y * y));
        const goldenAngle = Math.PI * (3 - Math.sqrt(5));
        const theta = goldenAngle * i;
        const sphereR = 9.2 + (Math.random() - 0.5) * 0.4;
        pos3[i3] = Math.cos(theta) * radius * sphereR;
        pos3[i3 + 1] = y * sphereR;
        pos3[i3 + 2] = Math.sin(theta) * radius * sphereR;

        // Continental colors vs ocean sapphire
        if (Math.sin(theta * 3.5) * y > 0.15) {
          col3[i3] = 0.1; col3[i3 + 1] = 0.85; col3[i3 + 2] = 0.45; // Emerald Continents
        } else {
          col3[i3] = 0.14; col3[i3 + 1] = 0.45; col3[i3 + 2] = 0.95; // Deep Sapphire Oceans
        }
      } else if (i < 7800) {
        // Atmospheric Orbit Halo
        const angle = (i / 1300) * Math.PI * 2;
        const ringR = 12.8 + (Math.random() - 0.5) * 0.8;
        pos3[i3] = Math.cos(angle) * ringR;
        pos3[i3 + 1] = Math.sin(angle) * ringR * 0.28;
        pos3[i3 + 2] = Math.sin(angle) * ringR;

        col3[i3] = 0.38; col3[i3 + 1] = 0.74; col3[i3 + 2] = 0.98;
      } else {
        // Home Target Reticle
        const angle = (i / 700) * Math.PI * 2;
        pos3[i3] = 3.6 + Math.cos(angle) * 1.4;
        pos3[i3 + 1] = 2.4 + Math.sin(angle) * 1.4;
        pos3[i3 + 2] = 8.2;

        col3[i3] = 0.2; col3[i3 + 1] = 0.95; col3[i3 + 2] = 0.6; // Emerald target
      }
    }

    // ── Precalculate Stage 4: Domestic Sanctuary & Robot Agent ──
    for (let i = 0; i < N; i++) {
      const i3 = i * 3;
      if (i < 2800) {
        // Sleek Robot Agent Form & Visor
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2 * Math.PI;
        const phi = Math.acos(2 * v - 1);
        const r = 1.7 * Math.cbrt(Math.random());
        pos4[i3] = r * Math.sin(phi) * Math.cos(theta) * 0.85;
        pos4[i3 + 1] = r * Math.cos(phi) * 1.4 + 1.2;
        pos4[i3 + 2] = r * Math.sin(phi) * Math.sin(theta) * 0.85 - 2.5;

        col4[i3] = 0.98; col4[i3 + 1] = 0.98; col4[i3 + 2] = 1.0; // Ceramic white with golden edge
      } else if (i < 5800) {
        // Modern Dining Table Plane & 4 Place Settings
        const tx = (Math.random() - 0.5) * 10;
        const tz = (Math.random() - 0.5) * 6;
        pos4[i3] = tx;
        pos4[i3 + 1] = -1.8 + (Math.random() - 0.5) * 0.12;
        pos4[i3 + 2] = tz;

        col4[i3] = 0.96; col4[i3 + 1] = 0.75; col4[i3 + 2] = 0.2; // Warm honey timber
      } else {
        // Rising Warm Hearth Embers
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 8.5;
        pos4[i3] = Math.cos(angle) * dist;
        pos4[i3 + 1] = -2.5 + Math.random() * 9.5;
        pos4[i3 + 2] = Math.sin(angle) * dist - 2;

        col4[i3] = 0.98; col4[i3 + 1] = 0.55 + Math.random() * 0.35; col4[i3 + 2] = 0.15; // Golden Ember
      }
    }

    // Geometry & Material for the Morphing Particles
    const particleGeo = new THREE.BufferGeometry();
    const currPos = new Float32Array(pos1);
    const currCol = new Float32Array(col1);

    particleGeo.setAttribute('position', new THREE.BufferAttribute(currPos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(currCol, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 2.2,
      map: createParticleTexture(),
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // ─── Hero Sculptural Meshes ───
    // Act 1: Floating Holographic Glass HUD Terminal
    const hudTex = createCockpitHudTexture();
    const hudMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(6.6, 3.3),
      new THREE.MeshBasicMaterial({
        map: hudTex,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
      })
    );
    hudMesh.position.set(0, -1.8, 14);
    hudMesh.rotation.x = -0.18;
    scene.add(hudMesh);

    // Act 2: Relativistic Warp Rings
    const ringGroup = new THREE.Group();
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const rings = [];
    for (let i = 0; i < 8; i++) {
      const ring = new THREE.Mesh(new THREE.RingGeometry(3.2, 3.35, 36), ringMat);
      ring.position.set(0, 0, 5 - i * 12);
      rings.push(ring);
      ringGroup.add(ring);
    }
    scene.add(ringGroup);

    // Act 4: Domestic Sanctuary HUD Terminal
    const domesticTex = createDomesticHudTexture();
    const domesticMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(6.6, 3.3),
      new THREE.MeshBasicMaterial({
        map: domesticTex,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      })
    );
    domesticMesh.position.set(0, 2.5, 4);
    scene.add(domesticMesh);

    // ─── Event Handlers ───
    const onPointerMove = (e) => {
      const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
      if (typeof clientX !== 'number' || typeof clientY !== 'number') return;
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
      const p = Math.max(0, Math.min(1, scrollRef.current));

      // Pointer smoothing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // ── Particle Morphing Interpolation ──
      const posAttr = particleGeo.attributes.position.array;
      const colAttr = particleGeo.attributes.color.array;

      let sourcePos, targetPos, sourceCol, targetCol, tStage;

      if (p < 0.33) {
        // Morph Stage 1 -> Stage 2
        sourcePos = pos1; targetPos = pos2;
        sourceCol = col1; targetCol = col2;
        tStage = p / 0.33;
      } else if (p < 0.66) {
        // Morph Stage 2 -> Stage 3
        sourcePos = pos2; targetPos = pos3;
        sourceCol = col2; targetCol = col3;
        tStage = (p - 0.33) / 0.33;
      } else {
        // Morph Stage 3 -> Stage 4
        sourcePos = pos3; targetPos = pos4;
        sourceCol = col3; targetCol = col4;
        tStage = (p - 0.66) / 0.34;
      }

      // Smooth hermite cubic interpolation
      const smoothT = tStage * tStage * (3 - 2 * tStage);

      for (let i = 0; i < N * 3; i += 3) {
        posAttr[i] = sourcePos[i] + (targetPos[i] - sourcePos[i]) * smoothT;
        posAttr[i + 1] = sourcePos[i + 1] + (targetPos[i + 1] - sourcePos[i + 1]) * smoothT;
        posAttr[i + 2] = sourcePos[i + 2] + (targetPos[i + 2] - sourcePos[i + 2]) * smoothT;

        colAttr[i] = sourceCol[i] + (targetCol[i] - sourceCol[i]) * smoothT;
        colAttr[i + 1] = sourceCol[i + 1] + (targetCol[i + 1] - sourceCol[i + 1]) * smoothT;
        colAttr[i + 2] = sourceCol[i + 2] + (targetCol[i + 2] - sourceCol[i + 2]) * smoothT;
      }

      particleGeo.attributes.position.needsUpdate = true;
      particleGeo.attributes.color.needsUpdate = true;

      // Dynamic Rotation & Particle Drift
      particleSystem.rotation.y = time * 0.04;
      particleSystem.rotation.x = Math.sin(time * 0.02) * 0.05;

      // Holographic Terminal Opacities
      hudMesh.material.opacity = Math.max(0, 1 - p * 3.5);
      ringGroup.position.z = -p * 40;
      rings.forEach((r, idx) => {
        r.rotation.z = time * (0.3 + idx * 0.05);
      });

      // Domestic HUD in Act 4
      if (p > 0.7) {
        domesticMesh.material.opacity = Math.min(0.95, (p - 0.7) / 0.25);
        warmHearthLight.intensity = (p - 0.7) * 8.0;
      } else {
        domesticMesh.material.opacity = 0;
        warmHearthLight.intensity = 0;
      }

      // ── Smooth Camera Movement & Parallax ──
      // Dynamic camera path responsive to viewport aspect
      const isNarrow = window.innerWidth < 768;
      const baseDist = isNarrow ? 38 : 30;

      let targetCamZ, targetCamY, targetLookZ;

      if (p < 0.25) {
        targetCamZ = baseDist - p * 15;
        targetCamY = 0;
        targetLookZ = -10;
      } else if (p < 0.55) {
        targetCamZ = baseDist - 12 - (p - 0.25) * 20;
        targetCamY = -0.5;
        targetLookZ = -30;
      } else if (p < 0.80) {
        targetCamZ = baseDist - 8 - (p - 0.55) * 15;
        targetCamY = 0;
        targetLookZ = 0;
      } else {
        targetCamZ = baseDist - 10;
        targetCamY = 1.0;
        targetLookZ = -5;
      }

      camera.position.z += (targetCamZ - camera.position.z) * 0.08;
      camera.position.y += (targetCamY + mouseRef.current.y * 1.8 - camera.position.y) * 0.08;
      camera.position.x += (mouseRef.current.x * 2.8 - camera.position.x) * 0.08;

      const safeLookZ = Math.min(camera.position.z - 5, targetLookZ);
      camera.lookAt(0, targetCamY * 0.5, safeLookZ);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          background: 'radial-gradient(ellipse at 50% 30%, #0c1a30 0%, #000000 85%)',
          pointerEvents: 'none',
        }}
      />
    );
  }

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
        background: 'radial-gradient(ellipse at 50% 35%, #07152d 0%, #000000 78%)',
      }}
    />
  );
}
