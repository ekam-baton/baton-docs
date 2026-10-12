import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import StoryScrollyCanvas from '../components/StoryScrollyCanvas';
import './LusionDemo.css';

export default function LusionDemo() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Track scroll position seamlessly across the page
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStage = (stagePercent) => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: totalHeight * stagePercent,
      behavior: 'smooth'
    });
  };

  // Web Audio API: Meditative Interstellar cosmic drone
  const toggleAudio = () => {
    if (!isPlayingAudio) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        
        if (!audioCtxRef.current) {
          const ctx = new AudioCtx();
          
          const osc1 = ctx.createOscillator();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(55, ctx.currentTime);

          const osc2 = ctx.createOscillator();
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(82.4, ctx.currentTime);

          const osc3 = ctx.createOscillator();
          osc3.type = 'triangle';
          osc3.frequency.setValueAtTime(164.8, ctx.currentTime);

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.04, ctx.currentTime);

          osc1.connect(gain);
          osc2.connect(gain);
          osc3.connect(gain);
          gain.connect(ctx.destination);

          osc1.start();
          osc2.start();
          osc3.start();

          audioCtxRef.current = ctx;
          gainNodeRef.current = gain;
        } else if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        setIsPlayingAudio(true);
      } catch (err) {
        console.error('Audio init error:', err);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsPlayingAudio(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="lusion-experience">
      {/* ─── Top Telemetry Banner ─── */}
      <div className="lusion-preview-bar">
        <div className="lusion-preview-tag">
          <span className="lusion-pulse-dot" />
          <span>ATMOSPHERIC DESCENT &middot; DEEP SPACE TO EARTH SANCTUARY</span>
        </div>
        <Link to="/" className="lusion-back-btn">
          &larr; Return to Original Site
        </Link>
      </div>

      {/* ─── Real-Time 3D Multi-Layer Flight Canvas ─── */}
      <StoryScrollyCanvas scrollProgress={scrollProgress} />

      {/* ─── Ambient Audio Toggle ─── */}
      <button 
        type="button" 
        className="lusion-audio-pill" 
        onClick={toggleAudio}
        aria-label="Toggle ambient cosmic sound"
      >
        <div className="lusion-waveform">
          <span className={`lusion-wave-bar ${isPlayingAudio ? 'active' : ''}`} />
          <span className={`lusion-wave-bar ${isPlayingAudio ? 'active' : ''}`} />
          <span className={`lusion-wave-bar ${isPlayingAudio ? 'active' : ''}`} />
          <span className={`lusion-wave-bar ${isPlayingAudio ? 'active' : ''}`} />
        </div>
        <span>{isPlayingAudio ? 'SOUND: ON' : 'SOUND: OFF'}</span>
      </button>

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 1: DEEP SPACE & INTERSTELLAR VOID (The Top Screen)
          In 3D: Tumbling asteroids, cosmic stardust, spacecraft cockpit
          ═══════════════════════════════════════════════════════════════ */}
      <section className="layer-section" aria-label="Layer 1: Deep Space">
        <div className="layer-container text-center">
          <div className="layer-altitude-badge">
            <span className="lusion-pulse-dot" style={{ width: '6px', height: '6px' }} />
            <span>LAYER 01 // ALTITUDE: 384,000 KM &middot; DEEP SPACE &amp; INTERSTELLAR VOID</span>
          </div>

          <h1 className="lusion-hero-headline">
            Own Your Workflow.<br />Deploy Intelligence.
          </h1>
          <p className="lusion-hero-lead">
            Chat with your private AI from anywhere. Whether connecting to a local machine or an enterprise VPC, BATON delivers end-to-end encrypted routing with zero telemetry.
          </p>

          <div className="lusion-hero-cta">
            <a
              href="https://github.com/ekam-baton/baton/releases/latest/download/Baton_x64.msi"
              target="_blank"
              rel="noopener noreferrer"
              className="lusion-btn-solid"
            >
              Download for Windows
            </a>
            <a
              href="https://github.com/ekam-baton/baton/releases/latest/download/baton-v1.0.apk"
              target="_blank"
              rel="noopener noreferrer"
              className="lusion-btn-outline"
            >
              Android APK
            </a>
            <a
              href="https://github.com/ekam-baton/baton/releases/latest/download/baton-gateway-engine-macos"
              target="_blank"
              rel="noopener noreferrer"
              className="lusion-btn-outline"
            >
              macOS Hub
            </a>
          </div>

          <p className="lusion-hero-note">
            Also available for <a href="https://github.com/ekam-baton/baton/releases/latest/download/BatonNetwork.xcframework.zip" target="_blank" rel="noopener noreferrer">iOS (Framework)</a> &middot; Built for uncompromising privacy
          </p>

          <div className="layer-scroll-indicator">
            <span>SCROLL DOWN TO DESCEND THROUGH ATMOSPHERIC LAYERS</span>
            <span>&darr;</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 2: EXOSPHERE & LOW EARTH ORBIT (LEO)
          In 3D: Earth horizon limb, communication satellites, meteors
          ═══════════════════════════════════════════════════════════════ */}
      <section className="layer-section" aria-label="Layer 2: Exosphere & Orbit">
        <div className="layer-glass-card">
          <div className="layer-altitude-badge" style={{ color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.35)' }}>
            <span>LAYER 02 // ALTITUDE: 800 KM &middot; EXOSPHERE &amp; ORBITAL SATELLITE RELAY</span>
          </div>
          <h2 className="lusion-title-h2">How it works</h2>
          <p className="layer-quote">
            &ldquo;One private transmission sent from the edge of space. No cloud corporation listens in.&rdquo;
          </p>
          <p className="lusion-body">
            You run an AI model on your computer &mdash; Ollama, LM Studio, vLLM, whatever you prefer.
            BATON connects your phone to that model over an encrypted channel.
            When you're on the same Wi-Fi, the connection is direct and instant. When you're away,
            it securely forwards encrypted envelopes without inspecting your prompts.
          </p>
          <p className="lusion-body">
            No central logins, no API keys to distribute, and no usage caps.
            Your hardware, your models, your privacy.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 3: STRATOSPHERE & MESOSPHERE
          In 3D: High-altitude weather balloon, supersonic jet contrail
          ═══════════════════════════════════════════════════════════════ */}
      <section className="layer-section" aria-label="Layer 3: Stratosphere">
        <div className="layer-glass-card" style={{ maxWidth: '860px' }}>
          <div className="layer-altitude-badge" style={{ color: '#34d399', borderColor: 'rgba(52, 211, 153, 0.35)' }}>
            <span>LAYER 03 // ALTITUDE: 50 KM &middot; STRATOSPHERE &amp; HIGH-ALTITUDE CURRENTS</span>
          </div>
          <h2 className="lusion-title-h2">The problem with cloud AI</h2>
          <p className="layer-caption" style={{ marginBottom: '2rem' }}>
            Standard cloud assistants route your private conversations through third-party data centers,
            where prompts are logged, analyzed, and retained.
          </p>

          <div className="lusion-compare-grid">
            <div className="lusion-compare-card">
              <h4>Cloud AI Vendors</h4>
              <ul>
                <li>Prompts stored on centralized servers</li>
                <li>Data retained for model training</li>
                <li>Strict rate limits and monthly recurring fees</li>
                <li>Dependent on third-party uptime</li>
              </ul>
            </div>
            <div className="lusion-compare-card highlight">
              <h4>BATON + Local AI</h4>
              <ul>
                <li>Prompts remain strictly on your computer</li>
                <li>Zero telemetry or model training</li>
                <li>Unlimited generation powered by your own GPU</li>
                <li>Independent infrastructure funded by users, not data</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 4: TROPOSPHERE & CUMULUS CLOUD DECK
          In 3D: 3D Volumetric clouds drifting with parallax, city lights
          ═══════════════════════════════════════════════════════════════ */}
      <section className="layer-section" aria-label="Layer 4: Troposphere & Clouds">
        <div style={{ maxWidth: '960px', width: '100%', margin: '0 auto' }}>
          <div className="text-center" style={{ marginBottom: '2.5rem' }}>
            <div className="layer-altitude-badge" style={{ color: '#818cf8', borderColor: 'rgba(129, 140, 248, 0.35)' }}>
              <span>LAYER 04 // ALTITUDE: 8,000 M &middot; TROPOSPHERE &amp; CUMULUS CLOUD DECK</span>
            </div>
            <h2 className="lusion-title-h2">Quick 3-Step Setup</h2>
            <p className="lusion-body" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Get started in under two minutes with automated cryptographic pairing.
            </p>
          </div>

          <div className="lusion-steps-grid">
            <div className="lusion-step-box">
              <div className="lusion-step-num">01 / DAEMON</div>
              <h3>Start the Connector</h3>
              <p>Install the standalone BATON binary on your Windows or Mac machine. It detects your local models automatically.</p>
            </div>
            <div className="lusion-step-box">
              <div className="lusion-step-num">02 / CLIENT</div>
              <h3>Install Mobile App</h3>
              <p>Open BATON on your Android or iOS device. Your phone generates secure private keys inside its hardware keystore.</p>
            </div>
            <div className="lusion-step-box">
              <div className="lusion-step-num">03 / HANDSHAKE</div>
              <h3>Scan to Connect</h3>
              <p>Scan the desktop pairing QR code. Your devices establish an authenticated link and reconnect automatically.</p>
            </div>
          </div>

          {/* Model Context Protocol Code Block */}
          <div className="layer-glass-card" style={{ marginTop: '3.5rem', maxWidth: '780px' }}>
            <h2 className="lusion-title-h2">Extend with Model Context Protocol</h2>
            <p className="lusion-body">
              BATON implements the <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>Model Context Protocol</a> (MCP)
              standard. Write Python or TypeScript tools to query local databases, inspect files, or control local services from your phone.
            </p>
            
            <div className="lusion-code-frame">
              <div className="lusion-code-bar">example_tool.py &mdash; FastMCP</div>
              <pre><code>{`from mcp.server.fastmcp import FastMCP

mcp = FastMCP("my-tools")

@mcp.tool()
def search_notes(query: str) -> str:
    """Search your local notes database."""
    results = db.search(query)
    return f"Found {len(results)} matches"`}</code></pre>
            </div>

            <p className="lusion-body" style={{ marginTop: '1.25rem' }}>
              <Link to="/developers" style={{ color: '#ffffff', textDecoration: 'underline' }}>
                Read the full developer guide &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 5: EARTH SURFACE — THE WARM HOME SANCTUARY
          In 3D: Warm dining table set for 4, domestic robot agent,
                 steam rising, warm golden embers & hearth glow
          ═══════════════════════════════════════════════════════════════ */}
      <section className="layer-section" aria-label="Layer 5: Earth Surface & Home Sanctuary">
        <div style={{ maxWidth: '860px', width: '100%', margin: '0 auto' }}>
          
          {/* Story Climax Banner */}
          <div className="layer-glass-card" style={{ borderColor: 'rgba(251, 191, 36, 0.4)', background: 'rgba(24, 16, 10, 0.65)', marginBottom: '4rem' }}>
            <div className="layer-altitude-badge" style={{ color: '#fbbf24', borderColor: 'rgba(251, 191, 36, 0.45)' }}>
              <span>LAYER 05 // ALTITUDE: 0 M &middot; EARTH SURFACE &amp; WARM HOME SANCTUARY</span>
            </div>
            <p className="layer-quote" style={{ color: '#fef3c7' }}>
              &ldquo;Preheat the oven, roast the vegetables, and set the dining table. Sarah and the kids will be home from school in 30 minutes.&rdquo;
            </p>
            <p className="layer-caption" style={{ color: '#d4d4d8' }}>
              Executed locally on your workstation via Model Context Protocol. Zero bytes retained in the cloud.
              The table is set for four. Dinner is underway. Peace in the chaos.
            </p>
          </div>

          {/* Cryptographic Security */}
          <div className="layer-glass-card" style={{ marginBottom: '3.5rem' }}>
            <h2 className="lusion-title-h2">Cryptographic Security</h2>
            <p className="lusion-body">
              Every session begins with an authenticated X25519 key exchange. Messages are encrypted
              locally using AES-256-GCM before leaving memory. Private keys stay enclosed in your
              device's hardware enclave, and chat history is saved in an on-device SQLCipher database.
            </p>
            <p className="lusion-body">
              <Link to="/security" style={{ color: '#ffffff', textDecoration: 'underline' }}>
                View complete security architecture &rarr;
              </Link>
            </p>
          </div>

          {/* Enterprise & Private VPC */}
          <div className="layer-glass-card" style={{ marginBottom: '3.5rem' }}>
            <h2 className="lusion-title-h2">Enterprise &amp; Private VPC</h2>
            <p className="lusion-body">
              Deploy the BATON connector within your corporate VPC via Docker. Provide employees with
              secure mobile access to internal model clusters and enterprise endpoints with automated MDM provisioning
              and cryptographic audit trails.
            </p>
            <p className="lusion-body">
              <Link to="/enterprise" style={{ color: '#ffffff', textDecoration: 'underline' }}>
                Enterprise deployment documentation &rarr;
              </Link>
            </p>
          </div>

          {/* Frequently Asked Questions */}
          <div className="layer-glass-card">
            <h2 className="lusion-title-h2" style={{ marginBottom: '2.5rem' }}>
              Frequently Asked Questions
            </h2>
            <div className="lusion-faq">
              <details>
                <summary>Do I need to configure port forwarding?</summary>
                <p>
                  No. BATON handles NAT traversal automatically. You do not need to open router ports,
                  configure dynamic DNS, or expose any ports to the public internet.
                </p>
              </details>
              <details>
                <summary>Which AI models and engines can I use?</summary>
                <p>
                  Any inference backend with an HTTP or MCP interface is supported: Ollama, LM Studio,
                  vLLM, LocalAI, and custom Python/Node.js agents. You can also connect to enterprise
                  cloud endpoints like Claude or Azure OpenAI if needed.
                </p>
              </details>
              <details>
                <summary>Is the project open source?</summary>
                <p>
                  Yes. The desktop connector and relay server are open source under the Apache 2.0 license.
                  Explore the repositories on <a href="https://github.com/ekam-baton" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>GitHub</a>.
                </p>
              </details>
              <details>
                <summary>Why use BATON instead of a general VPN?</summary>
                <p>
                  A standard VPN exposes your entire local subnet. BATON isolates access strictly to the
                  AI model and MCP tool processes you specify, adding per-message application-layer encryption.
                </p>
              </details>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Persistent 5-Layer Atmospheric Descent Scrubber ─── */}
      <div className="scrolly-stage-controller" role="toolbar" aria-label="Atmospheric Layer Controller">
        <button
          type="button"
          className={`scrolly-stage-btn ${scrollProgress < 0.18 ? 'active' : ''}`}
          onClick={() => scrollToStage(0.0)}
        >
          01 &middot; SPACE
        </button>
        <button
          type="button"
          className={`scrolly-stage-btn ${scrollProgress >= 0.18 && scrollProgress < 0.38 ? 'active' : ''}`}
          onClick={() => scrollToStage(0.25)}
        >
          02 &middot; ORBIT
        </button>
        <button
          type="button"
          className={`scrolly-stage-btn ${scrollProgress >= 0.38 && scrollProgress < 0.62 ? 'active' : ''}`}
          onClick={() => scrollToStage(0.48)}
        >
          03 &middot; STRATO
        </button>
        <button
          type="button"
          className={`scrolly-stage-btn ${scrollProgress >= 0.62 && scrollProgress < 0.82 ? 'active' : ''}`}
          onClick={() => scrollToStage(0.72)}
        >
          04 &middot; CLOUDS
        </button>
        <button
          type="button"
          className={`scrolly-stage-btn ${scrollProgress >= 0.82 ? 'active' : ''}`}
          onClick={() => scrollToStage(0.92)}
        >
          05 &middot; HOME
        </button>
      </div>
    </div>
  );
}
