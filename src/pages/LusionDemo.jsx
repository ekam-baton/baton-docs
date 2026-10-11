import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import InterstellarCanvas from '../components/InterstellarCanvas';
import './LusionDemo.css';

export default function LusionDemo() {
  const [activeScenario, setActiveScenario] = useState('home');
  const [customInput, setCustomInput] = useState('');
  const [customMessages, setCustomMessages] = useState([]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Web Audio API: Meditative Interstellar cosmic drone (A1 + E2 gentle ambient chord)
  const toggleAudio = () => {
    if (!isPlayingAudio) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        
        if (!audioCtxRef.current) {
          const ctx = new AudioCtx();
          
          // Deep A1 fundamental
          const osc1 = ctx.createOscillator();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(55, ctx.currentTime);

          // E2 fifth harmony
          const osc2 = ctx.createOscillator();
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(82.4, ctx.currentTime);

          // Subtle upper harmonic
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

  const handleSendCustom = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const userMsg = customInput.trim();
    setCustomInput('');
    setCustomMessages((prev) => [
      ...prev,
      { sender: 'space', text: userMsg, time: 'NOW' },
      { sender: 'home', text: `[LOCAL GPU]: Executing "${userMsg}" via MCP tools. Zero bytes retained. Mission complete.`, time: 'ROUND-TRIP: 0.12s' },
    ]);
  };

  return (
    <div className="lusion-experience">
      {/* ─── Top Preview Banner ─── */}
      <div className="lusion-preview-bar">
        <div className="lusion-preview-tag">
          <span className="lusion-pulse-dot" />
          <span>INTERSTELLAR TRANSMISSION DEMO &middot; PRIVATE LOCAL-FIRST ROUTING</span>
        </div>
        <Link to="/" className="lusion-back-btn">
          &larr; Return to Original Site
        </Link>
      </div>

      {/* ─── Deep Cosmic Space Background (Zero 3D Baton Property) ─── */}
      <InterstellarCanvas />

      {/* ─── Ambient Cosmic Audio Toggle ─── */}
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

      {/* ─── Hero Section with Cinematic Story Terminal ─── */}
      <section className="lusion-hero" aria-label="Hero">
        <p className="lusion-hero-tagline">Finding Peace in the Chaos</p>
        <h1 className="lusion-hero-headline">
          Own Your Workflow.<br />Deploy Intelligence.
        </h1>
        <p className="lusion-hero-lead">
          Chat with your private AI from anywhere. Whether connecting to a local machine or an enterprise VPC, BATON delivers end-to-end encrypted routing with zero telemetry.
        </p>

        {/* ─── The Cinematic Interstellar Transmission Terminal ─── */}
        <div className="lusion-story-terminal">
          <div className="lusion-story-header">
            <div className="lusion-story-status">
              <span className="lusion-story-dot" />
              <span>ORBITER-VII // DISTANCE: 3.84 AU &rarr; EARTH LOCAL HOST</span>
            </div>
            <span>E2EE CONDUIT: ACTIVE [X25519 &middot; AES-256-GCM]</span>
          </div>

          <div className="lusion-story-tabs">
            <button
              type="button"
              className={`lusion-story-tab ${activeScenario === 'home' ? 'active' : ''}`}
              onClick={() => setActiveScenario('home')}
            >
              01 &middot; HOME SANCTUARY (DINNER & CHORES)
            </button>
            <button
              type="button"
              className={`lusion-story-tab ${activeScenario === 'confidential' ? 'active' : ''}`}
              onClick={() => setActiveScenario('confidential')}
            >
              02 &middot; SENSITIVE WORKSTATION COMPUTE
            </button>
            <button
              type="button"
              className={`lusion-story-tab ${activeScenario === 'custom' ? 'active' : ''}`}
              onClick={() => setActiveScenario('custom')}
            >
              03 &middot; TRANSMIT YOUR OWN INSTRUCTION
            </button>
          </div>

          <div className="lusion-story-body">
            {activeScenario === 'home' && (
              <>
                <div className="lusion-bubble lusion-bubble-space">
                  <div className="lusion-bubble-meta">
                    <span>ASTRONAUT [DEEP SPACE FLIGHT DECK]</span>
                    <span>T-MINUS 30 MIN TO DOCK</span>
                  </div>
                  <div className="lusion-bubble-text">
                    &ldquo;Preheat the oven, roast the vegetables, and set the dining table. Sarah and the kids will be home from school in 30 minutes.&rdquo;
                  </div>
                </div>

                <div className="lusion-conduit-bridge">
                  <span className="lusion-conduit-line" />
                  <span>🔒 ZERO-KNOWLEDGE RELAY &middot; 0 BYTES LOGGED TO CLOUD &middot; HARDWARE ENCLAVE VERIFIED</span>
                  <span className="lusion-conduit-line" />
                </div>

                <div className="lusion-bubble lusion-bubble-home">
                  <div className="lusion-bubble-meta">
                    <span>DOMESTIC ROBOT AGENT [EARTH HOME &middot; LOCAL MCP]</span>
                    <span>RTX 4090 LOCAL INFERENCE</span>
                  </div>
                  <div className="lusion-bubble-text">
                    &ldquo;Oven preheating to 200&deg;C. Domestic kitchen routine initiated. Living room temperature set to 21&deg;C. Dining table set for four. Everything is quiet.&rdquo;
                  </div>
                </div>
              </>
            )}

            {activeScenario === 'confidential' && (
              <>
                <div className="lusion-bubble lusion-bubble-space">
                  <div className="lusion-bubble-meta">
                    <span>REMOTE WORKER [TRAVEL ENCLAVE]</span>
                    <span>AIRPORT WI-FI &middot; UNTRUSTED NETWORK</span>
                  </div>
                  <div className="lusion-bubble-text">
                    &ldquo;Pull the proprietary trade secrets and run the automated risk analysis on our private model cluster. Do not touch external APIs.&rdquo;
                  </div>
                </div>

                <div className="lusion-conduit-bridge">
                  <span className="lusion-conduit-line" />
                  <span>🔒 ISOLATED MCP TUNNEL &middot; ZERO TELEMETRY &middot; NO TRAINING ON YOUR DATA</span>
                  <span className="lusion-conduit-line" />
                </div>

                <div className="lusion-bubble lusion-bubble-home">
                  <div className="lusion-bubble-meta">
                    <span>OFFICE DESKTOP [ISOLATED VPC &middot; OLLAMA]</span>
                    <span>0.00ms CLOUD LEAK</span>
                  </div>
                  <div className="lusion-bubble-text">
                    &ldquo;Analysis complete. All 4,800 records parsed locally in memory. SQLCipher database locked. Zero packets sent to third-party data centers.&rdquo;
                  </div>
                </div>
              </>
            )}

            {activeScenario === 'custom' && (
              <>
                <div className="lusion-bubble lusion-bubble-space">
                  <div className="lusion-bubble-meta">
                    <span>YOU [ANYWHERE IN THE UNIVERSE]</span>
                    <span>TRANSMITTING VIA BATON</span>
                  </div>
                  <div className="lusion-bubble-text">
                    {customMessages.length === 0 
                      ? 'Type any command below to test your private transmission to your local machine...'
                      : customMessages[0].text
                    }
                  </div>
                </div>

                {customMessages.length > 1 && (
                  <>
                    <div className="lusion-conduit-bridge">
                      <span className="lusion-conduit-line" />
                      <span>🔒 SECURE ENCRYPTED RETURN PATH &middot; HARDWARE ISOLATED</span>
                      <span className="lusion-conduit-line" />
                    </div>
                    <div className="lusion-bubble lusion-bubble-home">
                      <div className="lusion-bubble-meta">
                        <span>YOUR MACHINE AT HOME [MCP TOOL EXECUTION]</span>
                        <span>{customMessages[1].time}</span>
                      </div>
                      <div className="lusion-bubble-text">
                        {customMessages[1].text}
                      </div>
                    </div>
                  </>
                )}

                <form className="lusion-live-input-bar" onSubmit={handleSendCustom}>
                  <input
                    type="text"
                    className="lusion-live-input"
                    placeholder="e.g. Turn on the porch lights and check the server health..."
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                  />
                  <button type="submit" className="lusion-live-send">
                    Transmit &rarr;
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* ─── CTA Buttons (Exact Originals) ─── */}
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
      </section>

      {/* ─── How it works (Exact Copy) ─── */}
      <div className="lusion-section-divider" />
      <section className="lusion-section" aria-label="How it works">
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
          <h2 className="lusion-title-h2">How it works</h2>
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

      {/* ─── The problem with cloud AI (Exact Copy) ─── */}
      <div className="lusion-section-divider" />
      <section className="lusion-section" aria-label="The problem we solve">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          <h2 className="lusion-title-h2">The problem with cloud AI</h2>
          <p className="lusion-body">
            Standard cloud assistants route your private conversations through third-party data centers,
            where prompts are logged, analyzed, and retained.
          </p>
        </div>

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
    </div>
  );
}
