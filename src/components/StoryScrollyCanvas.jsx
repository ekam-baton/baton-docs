import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// ─── Procedural Canvas Texture: Deep Space Cockpit HUD ───
function createCockpitHudTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const bg = ctx.createLinearGradient(0, 0, 512, 256);
  bg.addColorStop(0, 'rgba(6, 14, 28, 0.94)');
  bg.addColorStop(1, 'rgba(2, 6, 14, 0.94)');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 512, 256);

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, 492, 236);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 14px "JetBrains Mono", monospace';
  ctx.fillText('● BATON INTERSTELLAR RELAY // ORBITER-VII', 26, 42);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText('ALT: 384,000 KM // E2EE: X25519 + AES-256-GCM', 26, 64);

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
  ctx.beginPath(); ctx.moveTo(26, 76); ctx.lineTo(486, 76); ctx.stroke();

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText('OUTGOING PROMPT TO HOME WORKSTATION:', 26, 106);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '13px "JetBrains Mono", monospace';
  ctx.fillText('"Preheat oven 375°, roast veggies,', 26, 132);
  ctx.fillText(' set dining table for 4 before family returns."', 26, 154);

  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText('STATUS: DIRECT LOCAL TUNNEL // 0 CLOUD BYTES', 26, 192);

  ctx.fillStyle = '#64748b';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText('DESCENT VECTOR: SPACE -> EXOSPHERE -> STRATO -> HOME', 26, 214);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// ─── Procedural Canvas Texture: Home Domestic HUD ───
function createDomesticHudTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const bg = ctx.createLinearGradient(0, 0, 512, 256);
  bg.addColorStop(0, 'rgba(28, 18, 10, 0.95)');
  bg.addColorStop(1, 'rgba(14, 8, 4, 0.95)');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 512, 256);

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, 492, 236);

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 14px "JetBrains Mono", monospace';
  ctx.fillText('✦ HOME SANCTUARY // DOMESTIC AGENT', 26, 42);

  ctx.fillStyle = '#d97706';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText('ALT: 0 M // RTX 4090 LOCAL DAEMON VERIFIED', 26, 64);

  ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
  ctx.beginPath(); ctx.moveTo(26, 76); ctx.lineTo(486, 76); ctx.stroke();

  ctx.fillStyle = '#fef3c7';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText('STATUS: MEAL PREPARATION COMPLETE', 26, 106);

  ctx.fillStyle = '#34d399';
  ctx.font = '13px "JetBrains Mono", monospace';
  ctx.fillText('✓ Oven preheated to 375°F (Roasting)', 26, 130);
  ctx.fillText('✓ Fresh seasoned vegetables in oven', 26, 152);
  ctx.fillText('✓ Dining table set for 4 (Family of Four)', 26, 174);

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText('ETA SARAH & KIDS: 20 MINUTES', 26, 208);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// ─── Procedural Soft Dot Sprite ───
function createGlowDotTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
  grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 32, 32);

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
      console.warn('WebGL init failed:', e);
      setHasWebGL(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 95, 30);

    // ─── Global Lighting ───
    const ambientLight = new THREE.AmbientLight(0x223048, 2.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.8);
    sunLight.position.set(30, 80, 50);
    scene.add(sunLight);

    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 2.0);
    cyanRim.position.set(-30, 20, -20);
    scene.add(cyanRim);

    const hearthPointLight = new THREE.PointLight(0xf59e0b, 5.5, 45);
    hearthPointLight.position.set(0, -50, 0);
    scene.add(hearthPointLight);

    const glowDotTex = createGlowDotTexture();

    // ═════════════════════════════════════════════════════════════════
    // LAYER 1: DEEP SPACE & INTERSTELLAR VOID (Y: 110 to 75)
    // ═════════════════════════════════════════════════════════════════
    const spaceGroup = new THREE.Group();
    spaceGroup.position.set(0, 95, 0);
    scene.add(spaceGroup);

    // Deep Space Multi-Depth Starfield
    const starCount = 3000;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 200;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 160 + 20; // Spread through space & orbit
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 160 - 20;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.6,
      map: glowDotTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // 3D Flying / Tumbling Asteroids
    const asteroids = [];
    const asteroidMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.9,
      metalness: 0.1,
    });
    for (let i = 0; i < 7; i++) {
      const astGeo = new THREE.DodecahedronGeometry(1.2 + Math.random() * 1.5, 1);
      // Displace vertices randomly for rocky shape
      const posArr = astGeo.attributes.position.array;
      for (let j = 0; j < posArr.length; j += 3) {
        posArr[j] += (Math.random() - 0.5) * 0.4;
        posArr[j + 1] += (Math.random() - 0.5) * 0.4;
        posArr[j + 2] += (Math.random() - 0.5) * 0.4;
      }
      astGeo.computeVertexNormals();

      const asteroid = new THREE.Mesh(astGeo, asteroidMat);
      asteroid.position.set(
        (Math.random() - 0.5) * 36,
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 20 - 5
      );
      asteroid.userData = {
        rotX: (Math.random() - 0.5) * 0.02,
        rotY: (Math.random() - 0.5) * 0.025,
        speedX: (Math.random() - 0.5) * 0.04,
      };
      asteroids.push(asteroid);
      spaceGroup.add(asteroid);
    }

    // Spacecraft Canopy Frame & Astronaut Silhouette
    const cockpitFrameMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x0f172a,
    });
    const canopyLeft = new THREE.Mesh(new THREE.BoxGeometry(0.3, 16, 0.4), cockpitFrameMat);
    canopyLeft.position.set(-7.5, 0, 16);
    canopyLeft.rotation.z = -0.32;
    spaceGroup.add(canopyLeft);

    const canopyRight = new THREE.Mesh(new THREE.BoxGeometry(0.3, 16, 0.4), cockpitFrameMat);
    canopyRight.position.set(7.5, 0, 16);
    canopyRight.rotation.z = 0.32;
    spaceGroup.add(canopyRight);

    // Astronaut Helmet Silhouette
    const helmet = new THREE.Mesh(
      new THREE.SphereGeometry(1.1, 24, 24),
      new THREE.MeshStandardMaterial({ color: 0x0b1329, roughness: 0.4, metalness: 0.6 })
    );
    helmet.position.set(0, -3.2, 19);
    spaceGroup.add(helmet);

    // Holographic Communicator Terminal Display
    const hudTex = createCockpitHudTexture();
    const hudPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(6.6, 3.3),
      new THREE.MeshBasicMaterial({
        map: hudTex,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
      })
    );
    hudPlane.position.set(0, -1.8, 17);
    hudPlane.rotation.x = -0.18;
    spaceGroup.add(hudPlane);

    // ═════════════════════════════════════════════════════════════════
    // LAYER 2: EXOSPHERE & LOW EARTH ORBIT (LEO) (Y: 75 to 35)
    // ═════════════════════════════════════════════════════════════════
    const orbitGroup = new THREE.Group();
    orbitGroup.position.set(0, 55, 0);
    scene.add(orbitGroup);

    // Curved Horizon of Earth Limb Below Orbit
    const earthHorizonGeo = new THREE.SphereGeometry(72, 64, 32, 0, Math.PI * 2, 0, Math.PI * 0.45);
    const earthHorizonMat = new THREE.MeshStandardMaterial({
      color: 0x0f2862,
      roughness: 0.6,
      metalness: 0.1,
      emissive: 0x061430,
    });
    const earthLimb = new THREE.Mesh(earthHorizonGeo, earthHorizonMat);
    earthLimb.position.set(0, -78, -10);
    orbitGroup.add(earthLimb);

    // Glowing Atmospheric Aura Ring
    const atmosAura = new THREE.Mesh(
      new THREE.RingGeometry(72, 75, 64),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      })
    );
    atmosAura.position.set(0, -76, -8);
    atmosAura.rotation.x = -Math.PI / 2.2;
    orbitGroup.add(atmosAura);

    // 3D Communication Satellites Flying Across
    const satellites = [];
    for (let s = 0; s < 2; s++) {
      const satGroup = new THREE.Group();
      satGroup.position.set(s === 0 ? -16 : 14, (s === 0 ? 4 : -3), (s === 0 ? 4 : -2));

      // Main Gold Foil Satellite Body
      const satBody = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 1.4, 16),
        new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.2 })
      );
      satGroup.add(satBody);

      // Solar Panel Wings
      const panelMat = new THREE.MeshStandardMaterial({
        color: 0x1e3a8a,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x0f172a,
      });
      const wingL = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.04, 0.8), panelMat);
      wingL.position.x = -1.9;
      satGroup.add(wingL);

      const wingR = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.04, 0.8), panelMat);
      wingR.position.x = 1.9;
      satGroup.add(wingR);

      // Blinking Navigation LED Beacon
      const ledBeacon = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
      );
      ledBeacon.position.set(0, 0.8, 0);
      satGroup.add(ledBeacon);

      satGroup.userData = { speed: s === 0 ? 0.035 : -0.04, led: ledBeacon };
      satellites.push(satGroup);
      orbitGroup.add(satGroup);
    }

    // Shooting Stars / Meteors Streaking Through Atmosphere
    const meteors = [];
    const meteorMat = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    for (let m = 0; m < 3; m++) {
      const meteorGeo = new THREE.CylinderGeometry(0.04, 0.18, 4.5, 8);
      const meteor = new THREE.Mesh(meteorGeo, meteorMat);
      meteor.rotation.z = Math.PI / 4 + (Math.random() - 0.5) * 0.2;
      meteor.position.set((Math.random() - 0.5) * 35, 6 - Math.random() * 12, (Math.random() - 0.5) * 10);
      meteor.userData = { speedX: -0.35 - Math.random() * 0.2, speedY: -0.35 - Math.random() * 0.2 };
      meteors.push(meteor);
      orbitGroup.add(meteor);
    }

    // ═════════════════════════════════════════════════════════════════
    // LAYER 3: STRATOSPHERE & MESOSPHERE (Y: 35 to -5)
    // ═════════════════════════════════════════════════════════════════
    const stratoGroup = new THREE.Group();
    stratoGroup.position.set(0, 15, 0);
    scene.add(stratoGroup);

    // High-Altitude Weather Research Balloon
    const balloonGroup = new THREE.Group();
    balloonGroup.position.set(-9, 3, 2);

    const balloonCanopy = new THREE.Mesh(
      new THREE.SphereGeometry(2.4, 24, 24),
      new THREE.MeshStandardMaterial({
        color: 0xf1f5f9,
        roughness: 0.3,
        metalness: 0.1,
        transparent: true,
        opacity: 0.88,
      })
    );
    balloonCanopy.scale.set(1.0, 1.25, 1.0);
    balloonGroup.add(balloonCanopy);

    const gondola = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.45, 0.6),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.6 })
    );
    gondola.position.y = -3.4;
    balloonGroup.add(gondola);
    stratoGroup.add(balloonGroup);

    // Supersonic Jet Flying Through Stratosphere
    const jetGroup = new THREE.Group();
    jetGroup.position.set(15, -4, 4);

    const jetBody = new THREE.Mesh(
      new THREE.ConeGeometry(0.45, 3.2, 16),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2 })
    );
    jetBody.rotation.z = Math.PI / 2;
    jetGroup.add(jetBody);

    const jetWings = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.05, 3.4),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7 })
    );
    jetGroup.add(jetWings);

    // Contrails
    const contrailGeo = new THREE.CylinderGeometry(0.08, 0.08, 6, 8);
    const contrailMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.45,
    });
    const contrail = new THREE.Mesh(contrailGeo, contrailMat);
    contrail.rotation.z = Math.PI / 2;
    contrail.position.x = -3.8;
    jetGroup.add(contrail);

    jetGroup.userData = { speed: -0.18 };
    stratoGroup.add(jetGroup);

    // ═════════════════════════════════════════════════════════════════
    // LAYER 4: TROPOSPHERE & CUMULUS CLOUD DECK (Y: -5 to -38)
    // ═════════════════════════════════════════════════════════════════
    const cloudDeckGroup = new THREE.Group();
    cloudDeckGroup.position.set(0, -22, 0);
    scene.add(cloudDeckGroup);

    // 3D Volumetric Cumulus Clouds Drifting Across
    const clouds = [];
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.95,
      metalness: 0.05,
      transparent: true,
      opacity: 0.85,
    });

    for (let c = 0; c < 9; c++) {
      const cGroup = new THREE.Group();
      const puffCount = 5 + Math.floor(Math.random() * 4);
      for (let p = 0; p < puffCount; p++) {
        const puff = new THREE.Mesh(
          new THREE.SphereGeometry(1.4 + Math.random() * 1.2, 12, 12),
          cloudMat
        );
        puff.position.set(
          (Math.random() - 0.5) * 4.5,
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 3
        );
        cGroup.add(puff);
      }
      cGroup.position.set(
        (Math.random() - 0.5) * 45,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 16 - 2
      );
      cGroup.userData = { speed: 0.015 + Math.random() * 0.025 };
      clouds.push(cGroup);
      cloudDeckGroup.add(cGroup);
    }

    // City Light Grid Gleaming Below the Clouds
    const cityCount = 200;
    const cityGeo = new THREE.BufferGeometry();
    const cityPos = new Float32Array(cityCount * 3);
    for (let i = 0; i < cityCount; i++) {
      cityPos[i * 3] = (Math.random() - 0.5) * 40;
      cityPos[i * 3 + 1] = -14 + (Math.random() - 0.5) * 2;
      cityPos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 8;
    }
    cityGeo.setAttribute('position', new THREE.BufferAttribute(cityPos, 3));
    const cityMat = new THREE.PointsMaterial({
      color: 0xfde047,
      size: 1.8,
      map: glowDotTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    const cityLights = new THREE.Points(cityGeo, cityMat);
    cloudDeckGroup.add(cityLights);

    // ═════════════════════════════════════════════════════════════════
    // LAYER 5: EARTH SURFACE — WARM HOME SANCTUARY (Y: -38 to -68)
    // ═════════════════════════════════════════════════════════════════
    const homeGroup = new THREE.Group();
    homeGroup.position.set(0, -52, 0);
    scene.add(homeGroup);

    // Warm Hardwood Floor
    const floorGeo = new THREE.PlaneGeometry(32, 24);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x271911,
      roughness: 0.4,
      metalness: 0.05,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3.8;
    homeGroup.add(floor);

    // Modern Dining Table Set for Four
    const tableTopGeo = new THREE.BoxGeometry(11, 0.4, 5.5);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0x3f2817,
      roughness: 0.35,
    });
    const table = new THREE.Mesh(tableTopGeo, tableMat);
    table.position.set(0, -1.8, 0);
    homeGroup.add(table);

    // 4 Dinner Plates (Ready for Sarah, Dad, and the two kids)
    const plateGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.08, 20);
    const plateMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.2 });
    [[-3.2, -1.5, -1.2], [-1.0, -1.5, -1.2], [1.0, -1.5, -1.2], [3.2, -1.5, -1.2]].forEach(([px, py, pz]) => {
      const plate = new THREE.Mesh(plateGeo, plateMat);
      plate.position.set(px, py, pz);
      homeGroup.add(plate);
    });

    // Sleek Domestic Robot Agent (Standing at the table)
    const agentGroup = new THREE.Group();
    agentGroup.position.set(0, 1.2, -2.4);
    homeGroup.add(agentGroup);

    const agentTorso = new THREE.Mesh(
      new THREE.CylinderGeometry(0.9, 1.05, 3.2, 24),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.6, roughness: 0.2 })
    );
    agentGroup.add(agentTorso);

    const agentHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.75, 24, 24),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.5, roughness: 0.2 })
    );
    agentHead.position.y = 2.3;
    agentGroup.add(agentHead);

    const agentVisor = new THREE.Mesh(
      new THREE.BoxGeometry(0.92, 0.22, 0.28),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    agentVisor.position.set(0, 2.3, 0.68);
    agentGroup.add(agentVisor);

    // Serving Platter
    const platter = new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 1.5, 0.1, 24),
      new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.8 })
    );
    platter.position.set(0, 0.2, 1.4);
    agentGroup.add(platter);

    // Rising Steam Particles from Cooked Food
    const steamCount = 70;
    const steamGeo = new THREE.BufferGeometry();
    const steamPos = new Float32Array(steamCount * 3);
    for (let i = 0; i < steamCount; i++) {
      steamPos[i * 3] = (Math.random() - 0.5) * 8;
      steamPos[i * 3 + 1] = -1.5 + Math.random() * 4.5;
      steamPos[i * 3 + 2] = -1.2 + (Math.random() - 0.5) * 2;
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));
    const steamMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2.2,
      map: glowDotTex,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const steamParticles = new THREE.Points(steamGeo, steamMat);
    homeGroup.add(steamParticles);

    // Rising Warm Hearth Embers / Golden Sparks
    const emberCount = 90;
    const emberGeo = new THREE.BufferGeometry();
    const emberPos = new Float32Array(emberCount * 3);
    for (let i = 0; i < emberCount; i++) {
      emberPos[i * 3] = (Math.random() - 0.5) * 16;
      emberPos[i * 3 + 1] = -3.5 + Math.random() * 9.5;
      emberPos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPos, 3));
    const emberMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 2.5,
      map: glowDotTex,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const embers = new THREE.Points(emberGeo, emberMat);
    homeGroup.add(embers);

    // Domestic Status Terminal
    const domesticTex = createDomesticHudTexture();
    const domesticMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(6.6, 3.3),
      new THREE.MeshBasicMaterial({
        map: domesticTex,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
      })
    );
    domesticMesh.position.set(0, 3.2, 2.5);
    homeGroup.add(domesticMesh);

    // ─── Pointer & Resize Listeners ───
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

    // ─── Animation Loop (Vertical Descent through All 5 Layers) ───
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const p = Math.max(0, Math.min(1, scrollRef.current));

      // Pointer smoothing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // 1. Layer 1 Animations: Tumbling Asteroids & Ambient Stars
      stars.rotation.y = time * 0.003;
      asteroids.forEach((ast) => {
        ast.rotation.x += ast.userData.rotX;
        ast.rotation.y += ast.userData.rotY;
        ast.position.x += ast.userData.speedX;
        if (ast.position.x > 22) ast.position.x = -22;
        if (ast.position.x < -22) ast.position.x = 22;
      });

      // 2. Layer 2 Animations: Orbiting Satellites & Shooting Stars
      satellites.forEach((sat) => {
        sat.position.x += sat.userData.speed;
        sat.rotation.y = time * 0.2;
        if (sat.position.x > 24) sat.position.x = -24;
        if (sat.position.x < -24) sat.position.x = 24;
        if (sat.userData.led) {
          sat.userData.led.visible = Math.sin(time * 5) > 0;
        }
      });

      meteors.forEach((m) => {
        m.position.x += m.userData.speedX;
        m.position.y += m.userData.speedY;
        if (m.position.y < -15 || m.position.x < -25) {
          m.position.set(22 + Math.random() * 8, 8 + Math.random() * 6, (Math.random() - 0.5) * 10);
        }
      });

      // 3. Layer 3 Animations: Weather Balloon & Jet
      balloonGroup.position.y = 3 + Math.sin(time * 0.8) * 0.6;
      balloonGroup.rotation.z = Math.sin(time * 0.5) * 0.04;
      jetGroup.position.x += jetGroup.userData.speed;
      if (jetGroup.position.x < -26) jetGroup.position.x = 26;

      // 4. Layer 4 Animations: Volumetric Cloud Drift
      clouds.forEach((cl) => {
        cl.position.x += cl.userData.speed;
        if (cl.position.x > 28) cl.position.x = -28;
      });

      // 5. Layer 5 Animations: Domestic Robot, Rising Steam & Warm Embers
      agentGroup.position.y = 1.2 + Math.sin(time * 2.0) * 0.05;

      const sPos = steamGeo.attributes.position.array;
      for (let i = 0; i < steamCount; i++) {
        sPos[i * 3 + 1] += 0.035;
        sPos[i * 3] += Math.sin(time * 2 + i) * 0.01;
        if (sPos[i * 3 + 1] > 3.0) {
          sPos[i * 3 + 1] = -1.5;
        }
      }
      steamGeo.attributes.position.needsUpdate = true;

      const ePos = emberGeo.attributes.position.array;
      for (let i = 0; i < emberCount; i++) {
        ePos[i * 3 + 1] += 0.045;
        ePos[i * 3] += Math.sin(time * 1.5 + i) * 0.012;
        if (ePos[i * 3 + 1] > 6.0) {
          ePos[i * 3 + 1] = -3.5;
        }
      }
      emberGeo.attributes.position.needsUpdate = true;

      // ─── Camera Vertical Descent across all 5 Layers ───
      // p: 0.0 (Space Y: 95) -> 0.25 (Orbit Y: 55) -> 0.5 (Strato Y: 15) -> 0.75 (Clouds Y: -22) -> 1.0 (Home Y: -52)
      const targetCamY = 95 - p * 147; // From 95 down to -52
      const targetCamZ = 28 - Math.sin(p * Math.PI) * 4; // Subtle breath/zoom along descent

      camera.position.y += (targetCamY - camera.position.y) * 0.08;
      camera.position.z += (targetCamZ - camera.position.z) * 0.08;
      camera.position.x += (mouseRef.current.x * 2.5 - camera.position.x) * 0.08;

      camera.lookAt(0, camera.position.y - 2.5, 0);

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
          background: 'linear-gradient(180deg, #020617 0%, #0c1a30 30%, #0369a1 60%, #1e1b4b 85%, #180d05 100%)',
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
        background: 'radial-gradient(ellipse at 50% 20%, #040914 0%, #000000 70%)',
      }}
    />
  );
}
