import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// ─── Procedural Canvas Texture Helpers (100% self-contained, no network latency) ───
function createCockpitHudTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, 512, 256);
  bg.addColorStop(0, 'rgba(8, 20, 36, 0.95)');
  bg.addColorStop(1, 'rgba(3, 10, 20, 0.95)');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 512, 256);

  // High-tech borders & corners
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.strokeRect(10, 10, 492, 236);

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
  ctx.lineWidth = 1;
  ctx.strokeRect(16, 16, 480, 224);

  // Corner brackets
  ctx.strokeStyle = '#60a5fa';
  ctx.lineWidth = 4;
  // top-left
  ctx.beginPath(); ctx.moveTo(6, 30); ctx.lineTo(6, 6); ctx.lineTo(30, 6); ctx.stroke();
  // top-right
  ctx.beginPath(); ctx.moveTo(482, 6); ctx.lineTo(506, 6); ctx.lineTo(506, 30); ctx.stroke();
  // bottom-left
  ctx.beginPath(); ctx.moveTo(6, 226); ctx.lineTo(6, 250); ctx.lineTo(30, 250); ctx.stroke();
  // bottom-right
  ctx.beginPath(); ctx.moveTo(482, 250); ctx.lineTo(506, 250); ctx.lineTo(506, 226); ctx.stroke();

  // Header
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 15px "Courier New", monospace';
  ctx.fillText('● BATON SECURE TRANSMISSION LINK', 28, 42);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px "Courier New", monospace';
  ctx.fillText('ORBIT: 3.84 AU // E2EE: X25519 + AES-256-GCM', 28, 64);

  // Horizontal divider
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
  ctx.beginPath(); ctx.moveTo(28, 76); ctx.lineTo(484, 76); ctx.stroke();

  // Outgoing Message Body
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 14px "Courier New", monospace';
  ctx.fillText('OUTGOING PROMPT TO HOME DAEMON:', 28, 104);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '13px "Courier New", monospace';
  ctx.fillText('"Preheat oven 375°, roast veggies,', 28, 130);
  ctx.fillText(' set dining table for 4 before family returns."', 28, 150);

  // Status & Telemetry
  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 12px "Courier New", monospace';
  ctx.fillText('STATUS: DIRECT LOCAL RELAY // 0 CLOUD BYTES', 28, 186);

  ctx.fillStyle = '#64748b';
  ctx.font = '11px "Courier New", monospace';
  ctx.fillText('LATENCY: 14.2s (SOLAR TRANSIT) // MCP READY', 28, 208);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createEarthTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Oceans
  const ocean = ctx.createLinearGradient(0, 0, 0, 512);
  ocean.addColorStop(0, '#0f2744');
  ocean.addColorStop(0.5, '#163860');
  ocean.addColorStop(1, '#0f2744');
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, 1024, 512);

  // Continents (artistic stylised world map)
  ctx.fillStyle = '#1e4b38';
  // North America
  ctx.beginPath();
  ctx.ellipse(280, 170, 120, 80, -0.2, 0, Math.PI * 2);
  ctx.fill();
  // South America
  ctx.beginPath();
  ctx.ellipse(360, 330, 75, 110, 0.3, 0, Math.PI * 2);
  ctx.fill();
  // Eurasia
  ctx.beginPath();
  ctx.ellipse(650, 160, 170, 95, 0.1, 0, Math.PI * 2);
  ctx.fill();
  // Africa
  ctx.beginPath();
  ctx.ellipse(550, 280, 90, 110, 0.1, 0, Math.PI * 2);
  ctx.fill();
  // Australia
  ctx.beginPath();
  ctx.ellipse(820, 360, 60, 45, -0.2, 0, Math.PI * 2);
  ctx.fill();

  // Terrain highlights (golden amber accents)
  ctx.fillStyle = '#336647';
  ctx.beginPath();
  ctx.ellipse(260, 160, 70, 45, 0, 0, Math.PI * 2);
  ctx.ellipse(660, 160, 110, 55, 0, 0, Math.PI * 2);
  ctx.fill();

  // Polar ice caps
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(0, 0, 1024, 38);
  ctx.fillRect(0, 474, 1024, 38);

  // Sparkling city night lights (golden dots on continents)
  ctx.fillStyle = '#fde047';
  const points = [
    [240, 150], [270, 170], [300, 160], [320, 180],
    [540, 140], [580, 150], [620, 160], [700, 170],
    [750, 190], [800, 220], [370, 310], [560, 320]
  ];
  points.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 2.5, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createAgentHudTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Warm domestic home sanctuary panel
  const bg = ctx.createLinearGradient(0, 0, 512, 256);
  bg.addColorStop(0, 'rgba(28, 20, 14, 0.95)');
  bg.addColorStop(1, 'rgba(16, 10, 8, 0.95)');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 512, 256);

  // Warm golden border
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  ctx.strokeRect(10, 10, 492, 236);

  ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
  ctx.lineWidth = 1;
  ctx.strokeRect(16, 16, 480, 224);

  // Header
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 15px "Courier New", monospace';
  ctx.fillText('✦ HOME SANCTUARY // DOMESTIC AGENT', 28, 42);

  ctx.fillStyle = '#d97706';
  ctx.font = '12px "Courier New", monospace';
  ctx.fillText('RTX 4090 LOCAL DAEMON // TASK VERIFIED', 28, 64);

  ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)';
  ctx.beginPath(); ctx.moveTo(28, 76); ctx.lineTo(484, 76); ctx.stroke();

  // Executed tasks
  ctx.fillStyle = '#fef3c7';
  ctx.font = 'bold 13px "Courier New", monospace';
  ctx.fillText('CURRENT ACTIONS:', 28, 104);

  ctx.fillStyle = '#34d399';
  ctx.font = '13px "Courier New", monospace';
  ctx.fillText('✓ Oven preheated to 375°F (Baking Mode)', 28, 128);
  ctx.fillText('✓ Fresh vegetables roasted in oven', 28, 150);
  ctx.fillText('✓ Dining table set for 4 (Family of Four)', 28, 172);

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 13px "Courier New", monospace';
  ctx.fillText('ETA SARAH & KIDS: 25 MINUTES', 28, 204);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
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

    // ─── Test WebGL Capability ───
    let testRenderer;
    try {
      testRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      console.warn('WebGL not supported, using fallback:', e);
      setHasWebGL(false);
      return;
    }

    const renderer = testRenderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // ─── Scene & Camera ───
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1500
    );
    camera.position.set(0, 0, 30);

    // ─── Lighting Setup ───
    const ambientLight = new THREE.AmbientLight(0x222d3d, 2.2);
    scene.add(ambientLight);

    const mainSun = new THREE.DirectionalLight(0xffffff, 3.2);
    mainSun.position.set(30, 40, 50);
    scene.add(mainSun);

    const blueRimLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    blueRimLight.position.set(-30, -20, -50);
    scene.add(blueRimLight);

    // ═════════════════════════════════════════════════════════════════
    // ACT 1: SPACESHIP COCKPIT & ASTRONAUT VIEW (Scroll: 0.0 - 0.25)
    // ═════════════════════════════════════════════════════════════════
    const cockpitGroup = new THREE.Group();
    scene.add(cockpitGroup);

    // Canopy Frame Material
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.7,
      roughness: 0.25,
      emissive: 0x0f172a,
    });

    const neonCyanMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: false,
    });

    // Angled Window Struts (centered & fitted for desktop + mobile)
    const strutLeft = new THREE.Mesh(new THREE.BoxGeometry(0.35, 18, 0.45), frameMat);
    strutLeft.position.set(-6.5, 0, 18);
    strutLeft.rotation.z = -0.35;
    cockpitGroup.add(strutLeft);

    const strutRight = new THREE.Mesh(new THREE.BoxGeometry(0.35, 18, 0.45), frameMat);
    strutRight.position.set(6.5, 0, 18);
    strutRight.rotation.z = 0.35;
    cockpitGroup.add(strutRight);

    // Canopy Overhead Arch
    const canopyTop = new THREE.Mesh(new THREE.BoxGeometry(16, 0.4, 0.5), frameMat);
    canopyTop.position.set(0, 6.5, 18);
    cockpitGroup.add(canopyTop);

    // Cockpit Flight Deck Console
    const consoleMesh = new THREE.Mesh(
      new THREE.BoxGeometry(14, 2.2, 3.5),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4, metalness: 0.8 })
    );
    consoleMesh.position.set(0, -5.2, 19);
    consoleMesh.rotation.x = -0.32;
    cockpitGroup.add(consoleMesh);

    // Holographic Communicator Terminal Display
    const hudTex = createCockpitHudTexture();
    const hudPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(6.4, 3.2),
      new THREE.MeshBasicMaterial({
        map: hudTex,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
      })
    );
    hudPlane.position.set(0, -3.2, 20.5);
    hudPlane.rotation.x = -0.22;
    cockpitGroup.add(hudPlane);

    // Pilot Silhouette (Astronaut Seat and Helmet)
    const pilotGroup = new THREE.Group();
    pilotGroup.position.set(0, -4.5, 24);

    const seatBack = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 4.0, 0.8),
      new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.8 })
    );
    pilotGroup.add(seatBack);

    const helmet = new THREE.Mesh(
      new THREE.SphereGeometry(0.75, 24, 24),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.2, metalness: 0.3 })
    );
    helmet.position.set(0, 2.2, -0.2);
    pilotGroup.add(helmet);

    const helmetVisor = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x0284c7,
        emissiveIntensity: 0.4,
      })
    );
    helmetVisor.position.set(0, 2.2, -0.45);
    helmetVisor.rotation.x = -Math.PI / 2;
    pilotGroup.add(helmetVisor);

    cockpitGroup.add(pilotGroup);

    // Vivid Deep Space Starfield
    const starCount = 3000;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 600;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 600;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 800 - 100;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.5,
      transparent: true,
      opacity: 0.92,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Glowing Nebula Dust Clouds
    const nebulaGeo = new THREE.SphereGeometry(80, 16, 16);
    const nebulaMat = new THREE.MeshBasicMaterial({
      color: 0x1e3a8a,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
    nebula.position.set(0, 0, -200);
    scene.add(nebula);

    // ═════════════════════════════════════════════════════════════════
    // ACT 2: ENCRYPTED CONDUIT & RELAY BEAM (Scroll: 0.25 - 0.55)
    // ═════════════════════════════════════════════════════════════════
    const conduitGroup = new THREE.Group();
    scene.add(conduitGroup);

    // Concentric Cryptographic Warp Rings
    const ringCount = 14;
    const ringMeshes = [];
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    for (let i = 0; i < ringCount; i++) {
      const ring = new THREE.Mesh(new THREE.RingGeometry(3.2, 3.38, 32), ringMat);
      ring.position.set(0, -0.5, 10 - i * 14);
      ringMeshes.push(ring);
      conduitGroup.add(ring);
    }

    // Streaming Photon Packets
    const packetCount = 450;
    const packetGeo = new THREE.BufferGeometry();
    const packetPos = new Float32Array(packetCount * 3);
    for (let i = 0; i < packetCount; i++) {
      const radius = 0.8 + Math.random() * 2.6;
      const angle = Math.random() * Math.PI * 2;
      packetPos[i * 3] = Math.cos(angle) * radius;
      packetPos[i * 3 + 1] = Math.sin(angle) * radius - 0.5;
      packetPos[i * 3 + 2] = 15 - Math.random() * 140;
    }
    packetGeo.setAttribute('position', new THREE.BufferAttribute(packetPos, 3));
    const packetMat = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 2.8,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const packetStream = new THREE.Points(packetGeo, packetMat);
    conduitGroup.add(packetStream);

    // ═════════════════════════════════════════════════════════════════
    // ACT 3: PLANET EARTH & HOME RETICLE (Scroll: 0.55 - 0.80)
    // ═════════════════════════════════════════════════════════════════
    const earthGroup = new THREE.Group();
    earthGroup.position.set(0, 0, -110);
    scene.add(earthGroup);

    // Planet Earth Mesh with custom procedural continent map
    const earthTex = createEarthTexture();
    const earthGeo = new THREE.SphereGeometry(14, 48, 48);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTex,
      roughness: 0.45,
      metalness: 0.1,
      emissive: 0x051a36,
      emissiveIntensity: 0.35,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthMesh.rotation.y = -1.2;
    earthGroup.add(earthMesh);

    // Atmosphere Rim Glow
    const atmosGeo = new THREE.SphereGeometry(15.2, 36, 36);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
    earthGroup.add(atmosphere);

    // Pulsing Home Target Reticle on Earth
    const reticleGroup = new THREE.Group();
    reticleGroup.position.set(3.8, 3.8, 13.5);

    const reticleRing = new THREE.Mesh(
      new THREE.RingGeometry(1.2, 1.45, 32),
      new THREE.MeshBasicMaterial({ color: 0x34d399, side: THREE.DoubleSide })
    );
    reticleGroup.add(reticleRing);

    const reticleCrossH = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 0.12, 0.05),
      new THREE.MeshBasicMaterial({ color: 0x34d399 })
    );
    reticleGroup.add(reticleCrossH);

    const reticleCrossV = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 3.6, 0.05),
      new THREE.MeshBasicMaterial({ color: 0x34d399 })
    );
    reticleGroup.add(reticleCrossV);

    earthGroup.add(reticleGroup);

    // ═════════════════════════════════════════════════════════════════
    // ACT 4: WARM DOMESTIC HOME & ROBOT AGENT (Scroll: 0.80 - 1.0)
    // ═════════════════════════════════════════════════════════════════
    const homeGroup = new THREE.Group();
    homeGroup.position.set(0, -1.5, -200);
    scene.add(homeGroup);

    // Warm Ambient Light in Kitchen
    const homeWarmLight = new THREE.PointLight(0xf59e0b, 6.0, 45);
    homeWarmLight.position.set(0, 5, 0);
    homeGroup.add(homeWarmLight);

    const ovenGlow = new THREE.PointLight(0xea580c, 4.0, 25);
    ovenGlow.position.set(-5, 0, -4);
    homeGroup.add(ovenGlow);

    // Cozy Hardwood Floor
    const floorGeo = new THREE.PlaneGeometry(32, 28);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x271911,
      roughness: 0.35,
      metalness: 0.05,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -4.0;
    homeGroup.add(floor);

    // Modern Dining Table
    const tableTopGeo = new THREE.BoxGeometry(11, 0.45, 6);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0x3f2817,
      roughness: 0.3,
    });
    const table = new THREE.Mesh(tableTopGeo, tableMat);
    table.position.set(0, -1.8, 0);
    homeGroup.add(table);

    // Table legs
    const legGeo = new THREE.CylinderGeometry(0.18, 0.18, 2.2, 16);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.8 });
    [[-4.8, -2.9, -2.4], [4.8, -2.9, -2.4], [-4.8, -2.9, 2.4], [4.8, -2.9, 2.4]].forEach(([lx, ly, lz]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(lx, ly, lz);
      homeGroup.add(leg);
    });

    // 4 Place Settings (Plates for Sarah, Dad, and the two kids)
    const plateGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.08, 24);
    const plateMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.2 });
    [[-3.2, -1.5, -1.4], [-1.0, -1.5, -1.4], [1.0, -1.5, -1.4], [3.2, -1.5, -1.4]].forEach(([px, py, pz]) => {
      const plate = new THREE.Mesh(plateGeo, plateMat);
      plate.position.set(px, py, pz);
      homeGroup.add(plate);
    });

    // Modern Domestic Robot Agent (Standing at the table)
    const agentGroup = new THREE.Group();
    agentGroup.position.set(0, 1.2, -2.2);
    homeGroup.add(agentGroup);

    // Robot Torso
    const agentTorso = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 1.1, 3.4, 32),
      new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        metalness: 0.6,
        roughness: 0.2,
      })
    );
    agentGroup.add(agentTorso);

    // Robot Head
    const agentHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.8, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        metalness: 0.5,
        roughness: 0.2,
      })
    );
    agentHead.position.y = 2.45;
    agentGroup.add(agentHead);

    // Glowing Expressive Visor (Friendly cyan gaze)
    const agentVisor = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 0.24, 0.3),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    agentVisor.position.set(0, 2.45, 0.72);
    agentGroup.add(agentVisor);

    // Robot Arms holding culinary platter
    const platter = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.6, 0.12, 32),
      new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.8, roughness: 0.2 })
    );
    platter.position.set(0, 0.2, 1.5);
    agentGroup.add(platter);

    // Floating Domestic Agent HUD Status Terminal
    const agentHudTex = createAgentHudTexture();
    const agentHud = new THREE.Mesh(
      new THREE.PlaneGeometry(6.4, 3.2),
      new THREE.MeshBasicMaterial({
        map: agentHudTex,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
      })
    );
    agentHud.position.set(0, 3.2, 2.8);
    homeGroup.add(agentHud);

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

    // ─── Animation Loop (Camera Flight Path with zero NaNs) ───
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const p = Math.max(0, Math.min(1, scrollRef.current));

      // Pointer smoothing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Ambient rotations
      starField.rotation.y = time * 0.005;
      earthMesh.rotation.y = time * 0.03 - 1.2;
      reticleGroup.rotation.z = time * 0.6;
      agentGroup.position.y = 1.2 + Math.sin(time * 2.2) * 0.06;

      // Photon packet stream motion
      const pArr = packetGeo.attributes.position.array;
      for (let i = 0; i < packetCount; i++) {
        pArr[i * 3 + 2] -= 1.1;
        if (pArr[i * 3 + 2] < -120) {
          pArr[i * 3 + 2] = 15;
        }
      }
      packetGeo.attributes.position.needsUpdate = true;

      ringMeshes.forEach((rm, idx) => {
        rm.rotation.z = time * (0.2 + idx * 0.035);
      });

      // ─── 4-Act Camera Trajectory ───
      // Responsive offset for mobile vs desktop
      const isNarrow = window.innerWidth < 768;
      const camZOffset = isNarrow ? 6 : 0;

      let targetCamZ, targetCamY, targetLookZ, targetLookY;

      if (p < 0.25) {
        // Act 1: Inside Spaceship Cockpit (p: 0 -> 0.25)
        const t = p / 0.25;
        targetCamZ = (30 + camZOffset) - t * 14;
        targetCamY = 0;
        targetLookZ = -80;
        targetLookY = 0;
      } else if (p < 0.55) {
        // Act 2: Flying down the Encrypted Conduit (p: 0.25 -> 0.55)
        const t = (p - 0.25) / 0.3;
        targetCamZ = (16 + camZOffset) - t * 65;
        targetCamY = -0.5;
        targetLookZ = -100;
        targetLookY = 0;
      } else if (p < 0.80) {
        // Act 3: Orbiting and Descending into Earth (p: 0.55 -> 0.80)
        const t = (p - 0.55) / 0.25;
        targetCamZ = (-49 + camZOffset) - t * 75;
        targetCamY = -0.8;
        targetLookZ = -140;
        targetLookY = 0;
      } else {
        // Act 4: Inside Home Sanctuary Kitchen (p: 0.80 -> 1.0)
        const t = (p - 0.80) / 0.2;
        targetCamZ = (-124 + camZOffset) - t * 62;
        targetCamY = 0.5;
        targetLookZ = -200;
        targetLookY = 0;
      }

      // Smooth camera position lerp
      camera.position.z += (targetCamZ - camera.position.z) * 0.08;
      camera.position.y += (targetCamY + mouseRef.current.y * 1.5 - camera.position.y) * 0.08;
      camera.position.x += (mouseRef.current.x * 2.5 - camera.position.x) * 0.08;

      // LookAt with guaranteed minimum distance to avoid NaN vectors
      const lookZ = Math.min(camera.position.z - 5, targetLookZ);
      camera.lookAt(0, targetLookY, lookZ);

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
          background: 'radial-gradient(ellipse at 50% 30%, #0f172a 0%, #020617 80%)',
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
        background: 'radial-gradient(ellipse at 50% 30%, #061126 0%, #000000 75%)',
      }}
    />
  );
}
