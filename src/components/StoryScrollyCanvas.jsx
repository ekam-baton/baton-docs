import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function StoryScrollyCanvas({ scrollProgress = 0 }) {
  const containerRef = useRef(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ─── Scene & Camera ───
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.002);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1200
    );
    camera.position.set(0, 0, 36);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // ═══════════════════════════════════════════════════════════════
    // ACT 1: SPACECRAFT COCKPIT INTERIOR (Deep Space Solitude)
    // ═══════════════════════════════════════════════════════════════
    const cockpitGroup = new THREE.Group();
    scene.add(cockpitGroup);

    // Cockpit canopy struts (angular geometric flight deck window)
    const strutMat = new THREE.MeshStandardMaterial({
      color: 0x1e222d,
      roughness: 0.3,
      metalness: 0.8,
    });

    const strutGeoLeft = new THREE.BoxGeometry(0.5, 24, 0.8);
    const strutLeft = new THREE.Mesh(strutGeoLeft, strutMat);
    strutLeft.position.set(-11, 0, 24);
    strutLeft.rotation.z = -0.32;
    cockpitGroup.add(strutLeft);

    const strutRight = new THREE.Mesh(strutGeoLeft, strutMat);
    strutRight.position.set(11, 0, 24);
    strutRight.rotation.z = 0.32;
    cockpitGroup.add(strRight);

    // Top arch canopy
    const archGeo = new THREE.BoxGeometry(26, 0.6, 0.8);
    const archTop = new THREE.Mesh(archGeo, strutMat);
    archTop.position.set(0, 9.5, 24);
    cockpitGroup.add(archTop);

    // Cockpit Flight Control Console
    const consoleGeo = new THREE.BoxGeometry(22, 2.8, 4.5);
    const consoleMat = new THREE.MeshStandardMaterial({
      color: 0x0c0e14,
      roughness: 0.7,
      metalness: 0.4,
    });
    const flightConsole = new THREE.Mesh(consoleGeo, consoleMat);
    flightConsole.position.set(0, -7.5, 25);
    flightConsole.rotation.x = -0.35;
    cockpitGroup.add(flightConsole);

    // Glowing Holographic Communicator Terminal in Cockpit
    const holoScreenGeo = new THREE.PlaneGeometry(5.5, 3.2);
    const holoScreenMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide,
    });
    const holoScreen = new THREE.Mesh(holoScreenGeo, holoScreenMat);
    holoScreen.position.set(0, -4.6, 27);
    holoScreen.rotation.x = -0.25;
    cockpitGroup.add(holoScreen);

    // Starfield beyond the cockpit
    const starCount = 2200;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 800;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 800;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 1000 - 150;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.2,
      transparent: true,
      opacity: 0.9,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // ═══════════════════════════════════════════════════════════════
    // ACT 2: GLOWING ENCRYPTED DATA CONDUIT (Speeding Through Space)
    // ═══════════════════════════════════════════════════════════════
    const conduitGroup = new THREE.Group();
    scene.add(conduitGroup);

    // Fast-traveling cyan/blue photon packets
    const packetCount = 380;
    const packetGeo = new THREE.BufferGeometry();
    const packetPos = new Float32Array(packetCount * 3);
    for (let i = 0; i < packetCount; i++) {
      const radius = 1.0 + Math.random() * 2.5;
      const angle = Math.random() * Math.PI * 2;
      packetPos[i * 3] = Math.cos(angle) * radius;
      packetPos[i * 3 + 1] = Math.sin(angle) * radius - 1.0;
      packetPos[i * 3 + 2] = 15 - Math.random() * 110;
    }
    packetGeo.setAttribute('position', new THREE.BufferAttribute(packetPos, 3));
    const packetMat = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 2.2,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const dataStream = new THREE.Points(packetGeo, packetMat);
    conduitGroup.add(dataStream);

    // Concentric cryptographic tunnel rings
    const conduitRings = [];
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    for (let i = 0; i < 10; i++) {
      const cRing = new THREE.Mesh(new THREE.RingGeometry(3.0, 3.12, 36), ringMat);
      cRing.position.set(0, -1.0, 10 - i * 12);
      conduitRings.push(cRing);
      conduitGroup.add(cRing);
    }

    // ═══════════════════════════════════════════════════════════════
    // ACT 3: VIVID 3D PLANET EARTH (The Sanctuary in the Void)
    // ═══════════════════════════════════════════════════════════════
    const earthGroup = new THREE.Group();
    earthGroup.position.set(0, 0, -85);
    scene.add(earthGroup);

    // Earth Sphere with continents / ocean contrast
    const earthGeo = new THREE.SphereGeometry(12.0, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      roughness: 0.55,
      metalness: 0.15,
      emissive: 0x051329,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earthMesh);

    // Glowing Atmosphere Envelope
    const atmosGeo = new THREE.SphereGeometry(12.8, 48, 48);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.32,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
    earthGroup.add(atmosphere);

    // Pulsing Home Target Reticle on Earth
    const reticleGeo = new THREE.RingGeometry(0.8, 0.95, 32);
    const reticleMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      side: THREE.DoubleSide,
    });
    const homeReticle = new THREE.Mesh(reticleGeo, reticleMat);
    homeReticle.position.set(2.8, 3.8, 11.8);
    earthGroup.add(homeReticle);

    const reticleDotGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const reticleDotMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const reticleDot = new THREE.Mesh(reticleDotGeo, reticleDotMat);
    reticleDot.position.set(2.8, 3.8, 11.9);
    earthGroup.add(reticleDot);

    // ═══════════════════════════════════════════════════════════════
    // ACT 4: WARM HOME SANCTUARY (Kitchen, Dining Table & Robot Agent)
    // ═══════════════════════════════════════════════════════════════
    const homeGroup = new THREE.Group();
    homeGroup.position.set(0, -2, -165);
    scene.add(homeGroup);

    // Warm wooden floor
    const floorGeo = new THREE.PlaneGeometry(36, 32);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1c140d,
      roughness: 0.35,
      metalness: 0.05,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -4.5;
    homeGroup.add(floor);

    // Dining table (Dinner setting for family of four)
    const tableTopGeo = new THREE.BoxGeometry(11, 0.45, 6);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0x382314,
      roughness: 0.4,
    });
    const table = new THREE.Mesh(tableTopGeo, tableMat);
    table.position.set(0, -2.0, 0);
    homeGroup.add(table);

    // Table settings
    const plateGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.1, 24);
    const plateMat = new THREE.MeshStandardMaterial({ color: 0xfdfbf7, roughness: 0.2 });
    [[-3.2, -1.7, -1.5], [-1.1, -1.7, -1.5], [1.1, -1.7, -1.5], [3.2, -1.7, -1.5]].forEach(([px, py, pz]) => {
      const plate = new THREE.Mesh(plateGeo, plateMat);
      plate.position.set(px, py, pz);
      homeGroup.add(plate);
    });

    // 3D Domestic Robot Agent (Standing at the table)
    const agentGroup = new THREE.Group();
    agentGroup.position.set(0, 0.8, -2.5);
    homeGroup.add(agentGroup);

    const torsoGeo = new THREE.CylinderGeometry(0.9, 1.0, 3.2, 32);
    const agentMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.5,
      roughness: 0.15,
      clearcoat: 1.0,
    });
    const torso = new THREE.Mesh(torsoGeo, agentMat);
    agentGroup.add(torso);

    const headGeo = new THREE.SphereGeometry(0.72, 32, 32);
    const head = new THREE.Mesh(headGeo, agentMat);
    head.position.y = 2.4;
    agentGroup.add(head);

    // Glowing eye visor
    const visorGeo = new THREE.BoxGeometry(0.9, 0.2, 0.35);
    const visorMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 2.4, 0.65);
    agentGroup.add(visor);

    // ─── Dynamic Lighting ───
    const ambientLight = new THREE.AmbientLight(0x0e1320, 1.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 3.5);
    sunLight.position.set(25, 35, 40);
    scene.add(sunLight);

    // Cockpit interior cyan fill
    const cockpitLight = new THREE.PointLight(0x38bdf8, 3.0, 15);
    cockpitLight.position.set(0, -3, 27);
    scene.add(cockpitLight);

    // Warm golden hour kitchen hearth light
    const homeWarmLight = new THREE.PointLight(0xf59e0b, 7.5, 55);
    homeWarmLight.position.set(0, 4.5, -162);
    scene.add(homeWarmLight);

    // ─── Pointer & Resize Listeners ───
    const onPointerMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
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

    // ─── Animation Loop (Camera Travel Across 4 Acts) ───
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const p = Math.max(0, Math.min(1, scrollRef.current));

      // Pointer smoothing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (!prefersReducedMotion) {
        // Continuous ambient world motion
        starField.rotation.y = time * 0.006;
        earthMesh.rotation.y = time * 0.035;
        agentGroup.position.y = 0.8 + Math.sin(time * 2.0) * 0.07;
        homeReticle.rotation.z = time * 0.8;

        // Data packet flow down the beam
        const pArray = packetGeo.attributes.position.array;
        for (let i = 0; i < packetCount; i++) {
          pArray[i * 3 + 2] -= 0.8;
          if (pArray[i * 3 + 2] < -85) {
            pArray[i * 3 + 2] = 15;
          }
        }
        packetGeo.attributes.position.needsUpdate = true;

        conduitRings.forEach((r, idx) => {
          r.rotation.z = time * (0.25 + idx * 0.04);
        });

        // ─── 3D Camera Path Interpolation ───
        // Act 1: p < 0.25 (Inside Cockpit looking at deep space, Cam Z = 36 to 22)
        // Act 2: 0.25 <= p < 0.55 (Flying down the Data Conduit, Cam Z = 22 to -45)
        // Act 3: 0.55 <= p < 0.80 (Approaching Earth, Cam Z = -45 to -95)
        // Act 4: p >= 0.80 (Inside Home Kitchen Sanctuary, Cam Z = -95 to -152)
        let targetCamZ, targetCamY, targetLookZ, targetLookY;

        if (p < 0.25) {
          const t = p / 0.25;
          targetCamZ = 36 - t * 14;
          targetCamY = 0;
          targetLookZ = -100;
          targetLookY = 0;
        } else if (p < 0.55) {
          const t = (p - 0.25) / 0.3;
          targetCamZ = 22 - t * 65;
          targetCamY = -1.0;
          targetLookZ = -85;
          targetLookY = 0;
        } else if (p < 0.80) {
          const t = (p - 0.55) / 0.25;
          targetCamZ = -43 - t * 50;
          targetCamY = -1.5;
          targetLookZ = -110;
          targetLookY = 0;
        } else {
          const t = (p - 0.80) / 0.2;
          targetCamZ = -93 - t * 60;
          targetCamY = -2.0;
          targetLookZ = -165;
          targetLookY = 0;
        }

        // Camera lerp with gentle mouse parallax
        camera.position.z += (targetCamZ - camera.position.z) * 0.08;
        camera.position.y += (targetCamY + mouseRef.current.y * 2.0 - camera.position.y) * 0.08;
        camera.position.x += (mouseRef.current.x * 3.0 - camera.position.x) * 0.08;

        camera.lookAt(0, targetLookY, targetLookZ);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);

      strutGeoLeft.dispose();
      archGeo.dispose();
      consoleGeo.dispose();
      holoScreenGeo.dispose();
      starGeo.dispose();
      packetGeo.dispose();
      ringMat.dispose();
      earthGeo.dispose();
      atmosGeo.dispose();
      reticleGeo.dispose();
      reticleDotGeo.dispose();
      floorGeo.dispose();
      tableTopGeo.dispose();
      plateGeo.dispose();
      torsoGeo.dispose();
      headGeo.dispose();
      visorGeo.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

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
        background: 'radial-gradient(ellipse at 50% 20%, #030611 0%, #000000 75%)',
      }}
    />
  );
}
