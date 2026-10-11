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
    scene.fog = new THREE.FogExp2(0x000000, 0.003);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 50);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // ─── ACT 1: Deep Space Cosmos (Spacecraft Viewport) ───
    const spaceGroup = new THREE.Group();
    scene.add(spaceGroup);

    // Starfield
    const starCount = 2000;
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
      size: 1.1,
      transparent: true,
      opacity: 0.9,
    });
    const starField = new THREE.Points(starGeo, starMat);
    spaceGroup.add(starField);

    // Spacecraft panoramic window frame (Cold industrial matte dark metal)
    const frameGeo = new THREE.TorusGeometry(18, 0.6, 16, 64);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x111318,
      roughness: 0.8,
      metalness: 0.3,
    });
    const windowFrame = new THREE.Mesh(frameGeo, frameMat);
    windowFrame.position.set(0, 0, 32);
    spaceGroup.add(windowFrame);

    // ─── ACT 2: Encrypted Transmission Beam (Deep Space to Earth) ───
    const beamGroup = new THREE.Group();
    scene.add(beamGroup);

    const packetCount = 280;
    const packetGeo = new THREE.BufferGeometry();
    const packetPos = new Float32Array(packetCount * 3);
    for (let i = 0; i < packetCount; i++) {
      const t = Math.random();
      packetPos[i * 3] = (Math.random() - 0.5) * 1.8;
      packetPos[i * 3 + 1] = (Math.random() - 0.5) * 1.8;
      packetPos[i * 3 + 2] = 20 - t * 80;
    }
    packetGeo.setAttribute('position', new THREE.BufferAttribute(packetPos, 3));
    const packetMat = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 1.6,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const dataStream = new THREE.Points(packetGeo, packetMat);
    beamGroup.add(dataStream);

    // Concentric transmission encryption rings
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const conduitRings = [];
    for (let i = 0; i < 6; i++) {
      const cRing = new THREE.Mesh(new THREE.RingGeometry(2.5, 2.58, 32), ringMat);
      cRing.position.set(0, 0, 10 - i * 15);
      conduitRings.push(cRing);
      beamGroup.add(cRing);
    }

    // ─── ACT 3: Earth Planet (The Sanctuary in the Void) ───
    const earthGroup = new THREE.Group();
    earthGroup.position.set(0, 0, -70);
    scene.add(earthGroup);

    // Earth Sphere
    const earthGeo = new THREE.SphereGeometry(9.0, 64, 64);
    // Procedural Earth surface styling using multi-layer materials
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0x1d3557,
      roughness: 0.65,
      metalness: 0.1,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earthMesh);

    // Earth Atmosphere Glow
    const atmosGeo = new THREE.SphereGeometry(9.6, 48, 48);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
    earthGroup.add(atmosphere);

    // Orbiting Satellite / Node Pin pointing to Home
    const beaconGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const homeBeacon = new THREE.Mesh(beaconGeo, beaconMat);
    homeBeacon.position.set(3.5, 4.2, 7.5);
    earthGroup.add(homeBeacon);

    // ─── ACT 4: The Warm Home Sanctuary (Earth Kitchen & Agent) ───
    const homeGroup = new THREE.Group();
    homeGroup.position.set(0, -6, -140);
    scene.add(homeGroup);

    // Warm floor plane
    const floorGeo = new THREE.PlaneGeometry(32, 28);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x16120e,
      roughness: 0.4,
      metalness: 0.1,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -4;
    homeGroup.add(floor);

    // Warm Dining Table
    const tableTopGeo = new THREE.BoxGeometry(10, 0.4, 5.5);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0x2a1e14,
      roughness: 0.5,
    });
    const table = new THREE.Mesh(tableTopGeo, tableMat);
    table.position.set(0, -1.8, 0);
    homeGroup.add(table);

    // Table settings / plates (Family of four)
    const plateGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.1, 24);
    const plateMat = new THREE.MeshStandardMaterial({ color: 0xeee8d5, roughness: 0.3 });
    [[-3, -1.5, -1.2], [-1, -1.5, -1.2], [1, -1.5, -1.2], [3, -1.5, -1.2]].forEach(([px, py, pz]) => {
      const plate = new THREE.Mesh(plateGeo, plateMat);
      plate.position.set(px, py, pz);
      homeGroup.add(plate);
    });

    // Stylized Domestic Robot Agent (Gentle minimal figure preparing dinner)
    const agentGroup = new THREE.Group();
    agentGroup.position.set(0, 0.5, -2);
    homeGroup.add(agentGroup);

    const robotTorsoGeo = new THREE.CylinderGeometry(0.8, 0.9, 2.8, 32);
    const robotMat = new THREE.MeshStandardMaterial({
      color: 0xf4f4f5,
      metalness: 0.4,
      roughness: 0.2,
      clearcoat: 0.9,
    });
    const robotTorso = new THREE.Mesh(robotTorsoGeo, robotMat);
    agentGroup.add(robotTorso);

    const robotHeadGeo = new THREE.SphereGeometry(0.65, 32, 32);
    const robotHead = new THREE.Mesh(robotHeadGeo, robotMat);
    robotHead.position.y = 2.1;
    agentGroup.add(robotHead);

    // Warm friendly visor light
    const visorGeo = new THREE.BoxGeometry(0.8, 0.18, 0.3);
    const visorMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 2.1, 0.58);
    agentGroup.add(visor);

    // ─── Lighting Systems ───
    // Cold Space Light
    const spaceAmbient = new THREE.AmbientLight(0x0a1020, 1.2);
    scene.add(spaceAmbient);

    const sunLight = new THREE.DirectionalLight(0xffffff, 3.2);
    sunLight.position.set(20, 30, 40);
    scene.add(sunLight);

    // Warm Domestic Home Light (Golden hour kitchen hearth)
    const homeWarmLight = new THREE.PointLight(0xfbbf24, 6.0, 45);
    homeWarmLight.position.set(0, 3, -138);
    scene.add(homeWarmLight);

    const kitchenGlow = new THREE.PointLight(0xf59e0b, 3.5, 30);
    kitchenGlow.position.set(4, 1, -136);
    scene.add(kitchenGlow);

    // ─── Mouse Tracking ───
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

    // ─── Animation Loop (Scroll-Interpolated Camera Path) ───
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const p = Math.max(0, Math.min(1, scrollRef.current)); // 0.0 to 1.0

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      if (!prefersReducedMotion) {
        // Continuous organic motions
        starField.rotation.y = time * 0.008;
        earthMesh.rotation.y = time * 0.04;
        agentGroup.position.y = 0.5 + Math.sin(time * 1.8) * 0.08;

        // Animated data packet transit
        const pArray = packetGeo.attributes.position.array;
        for (let i = 0; i < packetCount; i++) {
          pArray[i * 3 + 2] -= 0.6;
          if (pArray[i * 3 + 2] < -70) {
            pArray[i * 3 + 2] = 20;
          }
        }
        packetGeo.attributes.position.needsUpdate = true;

        conduitRings.forEach((r, idx) => {
          r.rotation.z = time * (0.2 + idx * 0.05);
        });

        // ─── Cinematic Camera Journey Based on Scroll Progress ───
        // Act 1 (p < 0.25): In the Cockpit / Deep Space (Z: 48 to 25)
        // Act 2 (0.25 < p < 0.55): Traveling along the Data Stream (Z: 25 to -30)
        // Act 3 (0.55 < p < 0.80): Orbiting Earth (Z: -30 to -90)
        // Act 4 (p > 0.80): Inside the Warm Home Sanctuary (Z: -90 to -128)
        let targetCamZ, targetCamY, targetLookZ, targetLookY;

        if (p < 0.25) {
          // Deep Space Viewport
          const t = p / 0.25;
          targetCamZ = 48 - t * 18;
          targetCamY = 0;
          targetLookZ = -100;
          targetLookY = 0;
          windowFrame.position.z = 32 - t * 10;
        } else if (p < 0.55) {
          // Traveling down the Encrypted Conduit
          const t = (p - 0.25) / 0.3;
          targetCamZ = 30 - t * 45;
          targetCamY = -t * 2;
          targetLookZ = -70;
          targetLookY = 0;
        } else if (p < 0.8) {
          // Orbiting Earth Beacon
          const t = (p - 0.55) / 0.25;
          targetCamZ = -15 - t * 50;
          targetCamY = -2 - t * 3;
          targetLookZ = -100;
          targetLookY = -2;
        } else {
          // Entering Home Sanctuary
          const t = (p - 0.8) / 0.2;
          targetCamZ = -65 - t * 55;
          targetCamY = -5 - t * 1;
          targetLookZ = -140;
          targetLookY = -2;
        }

        // Camera position lerp with gentle mouse parallax
        camera.position.z += (targetCamZ - camera.position.z) * 0.08;
        camera.position.y += (targetCamY + mouseRef.current.y * 2.5 - camera.position.y) * 0.08;
        camera.position.x += (mouseRef.current.x * 3.5 - camera.position.x) * 0.08;

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

      starGeo.dispose();
      starMat.dispose();
      frameGeo.dispose();
      frameMat.dispose();
      packetGeo.dispose();
      packetMat.dispose();
      ringMat.dispose();
      earthGeo.dispose();
      earthMat.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      beaconGeo.dispose();
      beaconMat.dispose();
      floorGeo.dispose();
      floorMat.dispose();
      tableTopGeo.dispose();
      tableMat.dispose();
      plateGeo.dispose();
      plateMat.dispose();
      robotTorsoGeo.dispose();
      robotMat.dispose();
      robotHeadGeo.dispose();
      visorGeo.dispose();
      visorMat.dispose();
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
      }}
    />
  );
}
