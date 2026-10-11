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

  // Web Audio API: Meditative Interstellar cosmic drone (A1 + E2 gentle ambient chord)
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
          gain.gain.setValueAtTime(0.045, ctx.currentTime);

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
          <span>3D SCROLLYTELLING JOURNEY &middot; INTERSTELLAR TO EARTH</span>
        </div>
        <Link to="/" className="lusion-back-btn">
          &larr; Return to Original Site
        </Link>
      </div>

      {/* ─── Real-Time 3D Scroll Journey Engine ─── */}
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

      {/* ─── ACT 1: Deep Space Solitude (Scroll 0% - 25%) ─── */}
      <section className="scrolly-chapter align-left" aria-label="Act 1: Deep Space Solitude">
        <div className="scrolly-hero-content">
          <div className="scrolly-hud-badge">
            <span className="lusion-pulse-dot" style={{ width: '6px', height: '6px' }} />
            <span>ACT 01 // ORBITER-VII &middot; 3.84 AU DEEP SPACE</span>
          </div>

          <p className="lusion-hero-tagline">Finding Peace in the Chaos</p>
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

          <div className="scrolly-scroll-cue">
            <span>SCROLL TO TRANSMIT ACROSS THE VOID</span>
            <span>&darr;</span>
          </div>
        </div>
      </section>

      {/* ─── ACT 2: The Encrypted Conduit (Scroll 25% - 50%) ─── */}
      <section className="scrolly-chapter align-right" aria-label="Act 2: The Encrypted Conduit">
        <div className="scrolly-panel">
          <div className="scrolly-hud-badge" style={{ color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
            <span>ACT 02 // E2EE TUNNEL &middot; X25519 + AES-256-GCM</span>
          </div>
          <h2 className="lusion-title-h2" style={{ textAlign: 'left' }}>How it works</h2>
          <p className="scrolly-quote" style={{ textAlign: 'left' }}>
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

      {/* ─── ACT 3: The Sanctuary in the Void: Earth (Scroll 50% - 75%) ─── */}
      <section className="scrolly-chapter align-left" aria-label="Act 3: Approaching Earth">
        <div className="scrolly-panel" style={{ maxWidth: '640px' }}>
          <div className="scrolly-hud-badge" style={{ color: '#34d399', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
            <span>ACT 03 // EARTH APPROACH &middot; TARGET LOCKED</span>
          </div>
          <h2 className="lusion-title-h2" style={{ textAlign: 'left' }}>The problem with cloud AI</h2>
          <p className="scrolly-caption" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            Standard cloud assistants route your private conversations through third-party data centers,
            where prompts are logged, analyzed, and retained.
          </p>

          <div className="lusion-compare-grid" style={{ marginTop: '0', gridTemplateColumns: '1fr' }}>
            <div className="lusion-compare-card">
              <h4>Cloud AI Vendors</h4>
              <ul>
                <li>Prompts stored on centralized servers</li>
                <li>Data retained for model training</li>
                <li>Strict rate limits and monthly fees</li>
              </ul>
            </div>
            <div className="lusion-compare-card highlight">
              <h4>BATON + Local AI</h4>
              <ul>
                <li>Prompts remain strictly on your computer</li>
                <li>Zero telemetry or model training</li>
                <li>Unlimited generation via your own GPU</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ACT 4: The Warm Home Sanctuary (Scroll 75% - 100%) ─── */}
      <section className="scrolly-chapter align-right" aria-label="Act 4: The Home Sanctuary">
        <div className="scrolly-panel" style={{ borderColor: 'rgba(251, 191, 36, 0.35)', background: 'rgba(16, 12, 8, 0.55)' }}>
          <div className="scrolly-hud-badge" style={{ color: '#fbbf24', borderColor: 'rgba(251, 191, 36, 0.4)' }}>
            <span>ACT 04 // DOMESTIC SANCTUARY &middot; RTX 4090</span>
          </div>
          <p className="scrolly-quote" style={{ color: '#fef3c7', textAlign: 'left' }}>
            &ldquo;Preheat the oven, roast the vegetables, and set the dining table. Sarah and the kids will be home from school in 30 minutes.&rdquo;
          </p>
          <p className="scrolly-caption" style={{ color: '#d4d4d8', textAlign: 'left' }}>
            Executed locally via Model Context Protocol on your RTX 4090. Zero bytes retained.
            The table is set for four. Dinner is underway. Peace in the chaos.
          </p>
        </div>
      </section>

      {/* ─── Setup (Exact Copy) ─── */}
      <div className="lusion-section-divider" />
      <section className="lusion-section" aria-label="Setup">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          <h2 className="lusion-title-h2">Quick 3-Step Setup</h2>
          <p className="lusion-body">
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
      </section>

      {/* ─── Developers (MCP) (Exact Copy) ─── */}
      <div className="lusion-section-divider" />
      <section className="lusion-section" aria-label="Developers">
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto' }}>
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

          <p className="lusion-body">
            <Link to="/developers" style={{ color: '#ffffff', textDecoration: 'underline' }}>
              Read the full developer guide &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* ─── Security (Exact Copy) ─── */}
      <div className="lusion-section-divider" />
      <section className="lusion-section" aria-label="Security">
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
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
      </section>

      {/* ─── Enterprise (Exact Copy) ─── */}
      <div className="lusion-section-divider" />
      <section className="lusion-section" aria-label="Enterprise">
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
          <h2 className="lusion-title-h2">Enterprise & Private VPC</h2>
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
      </section>

      {/* ─── FAQ (Exact Copy) ─── */}
      <div className="lusion-section-divider" />
      <section className="lusion-section" aria-label="FAQ">
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <h2 className="lusion-title-h2" style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
      </section>

      {/* ─── Persistent 3D Camera Stage Controller ─── */}
      <div className="scrolly-stage-controller" role="toolbar" aria-label="3D Flight Controls">
        <button
          type="button"
          className={`scrolly-stage-btn ${scrollProgress < 0.25 ? 'active' : ''}`}
          onClick={() => scrollToStage(0.0)}
        >
          01 &middot; COCKPIT
        </button>
        <button
          type="button"
          className={`scrolly-stage-btn ${scrollProgress >= 0.25 && scrollProgress < 0.55 ? 'active' : ''}`}
          onClick={() => scrollToStage(0.35)}
        >
          02 &middot; DATA BEAM
        </button>
        <button
          type="button"
          className={`scrolly-stage-btn ${scrollProgress >= 0.55 && scrollProgress < 0.80 ? 'active' : ''}`}
          onClick={() => scrollToStage(0.65)}
        >
          03 &middot; EARTH ORBIT
        </button>
        <button
          type="button"
          className={`scrolly-stage-btn ${scrollProgress >= 0.80 ? 'active' : ''}`}
          onClick={() => scrollToStage(0.92)}
        >
          04 &middot; HOME KITCHEN
        </button>
      </div>
    </div>
  );
}
