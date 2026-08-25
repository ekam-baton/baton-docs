import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Monitor, Lock, ArrowRight, ScanLine, Download, Cable } from 'lucide-react';
import Starfield from '../components/Starfield';

export default function Home() {
  return (
    <div className="animate-fade-in">

      {/* Interactive Universe Background */}
      <Starfield />

      {/* ── Hero ── */}
      <section className="home-hero" aria-label="Hero" style={{ position: 'relative', zIndex: 1 }}>
        <div className="home-hero-inner">
          <h1>
            Own Your Workflow.<br />Deploy Intelligence.
          </h1>
          <p className="home-hero-lead">
            BATON is a mobile app that connects your phone directly to AI models running on your computer.
            Your prompts stay on your hardware. No accounts, no telemetry, no third-party cloud.
          </p>
          <div className="home-hero-cta">
            <a
              href="https://github.com/ekam-baton/baton/releases/latest/download/Baton_x64.msi"
              className="btn-solid"
            >
              Download for Windows
            </a>
            <a
              href="https://github.com/ekam-baton/baton/releases/latest/download/baton-v1.0.apk"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Android APK
            </a>
            <a
              href="https://github.com/ekam-baton/baton/releases/latest/download/baton-gateway-engine-macos"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              macOS Hub
            </a>
          </div>
          <p className="home-hero-note">
            Also available for <a href="https://github.com/ekam-baton/baton/releases/latest/download/BatonNetwork.xcframework.zip" target="_blank" rel="noopener noreferrer">iOS (Framework)</a> · Built for uncompromising privacy
          </p>

          <div className="hero-diagram">
            <div className="hero-diagram-node">
              <div className="node-icon"><Smartphone size={18} /></div>
              <span className="node-label">Your Phone</span>
            </div>
            
            <div className="hero-diagram-lock">
              <div className="diagram-line"></div>
              <div className="lock-content">
                <Lock size={14} style={{ color: 'var(--accent)' }} />
                <span className="lock-label">AES-256</span>
              </div>
              <div className="diagram-line"></div>
            </div>

            <div className="hero-diagram-node">
              <div className="node-icon"><Monitor size={18} /></div>
              <span className="node-label">Your Computer</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Works with ── */}
      <section className="works-with" aria-label="Compatible platforms">
        <p className="works-with-label">Works with</p>
        <div className="works-with-logos">
          <span className="works-with-item">Ollama</span>
          <span className="works-with-item">LM Studio</span>
          <span className="works-with-item">vLLM</span>
          <span className="works-with-item">LocalAI</span>
          <span className="works-with-item">Claude API</span>
          <span className="works-with-item">Azure OpenAI</span>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="home-section" aria-label="How it works">
        <div className="home-narrow text-center">
          <span className="section-label">Overview</span>
          <h2>How it works</h2>
          <p className="home-body">
            You run an AI model on your computer — Ollama, LM Studio, vLLM, whatever you prefer.
            BATON connects your phone to that model over an encrypted channel.
            When you're on the same Wi-Fi, the connection is direct and instant. When you're away,
            it securely forwards encrypted envelopes without inspecting your prompts.
          </p>
          <p className="home-body">
            No central logins, no API keys to distribute, and no usage caps.
            Your hardware, your models, your privacy.
          </p>
        </div>
      </section>

      {/* ── The problem ── */}
      <section className="home-section home-section-alt" aria-label="The problem we solve">
        <div className="home-symmetric-wrapper">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="section-label">Why It Matters</span>
            <h2>The problem with cloud AI</h2>
            <p className="home-body" style={{ maxWidth: '640px', margin: '0 auto' }}>
              Standard cloud assistants route your private conversations through third-party data centers,
              where prompts are logged, analyzed, and retained.
            </p>
          </div>

          <div className="home-comparison-grid">
            <div className="comparison-col">
              <h4>Cloud AI Vendors</h4>
              <ul>
                <li>Prompts stored on centralized servers</li>
                <li>Data retained for model training</li>
                <li>Strict rate limits and monthly recurring fees</li>
                <li>Dependent on third-party uptime</li>
              </ul>
            </div>
            <div className="comparison-col comparison-col-alt">
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

      {/* ── Setup ── */}
      <section className="home-section" aria-label="Setup">
        <div className="home-symmetric-wrapper">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="section-label">Getting Started</span>
            <h2>Quick 3-Step Setup</h2>
            <p className="home-body" style={{ maxWidth: '580px', margin: '0 auto' }}>
              Get started in under two minutes with automated cryptographic pairing.
            </p>
          </div>

          <div className="home-steps-grid">
            <div className="home-step-card">
              <div className="step-number"><Download size={16} /></div>
              <h3>Start the Connector</h3>
              <p>Install the standalone BATON binary on your Windows or Mac machine. It detects your local models automatically.</p>
            </div>
            <div className="home-step-card">
              <div className="step-number"><Smartphone size={16} /></div>
              <h3>Install Mobile App</h3>
              <p>Open BATON on your Android or iOS device. Your phone generates secure private keys inside its hardware keystore.</p>
            </div>
            <div className="home-step-card">
              <div className="step-number"><ScanLine size={16} /></div>
              <h3>Scan to Connect</h3>
              <p>Scan the desktop pairing QR code. Your devices establish an authenticated link and reconnect automatically.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── For developers ── */}
      <section className="home-section home-section-alt" aria-label="Developers">
        <div className="home-narrow text-center">
          <span className="section-label">For Developers</span>
          <h2>Extend with Model Context Protocol</h2>
          <p className="home-body">
            BATON implements the <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">Model Context Protocol</a> (MCP)
            standard. Write Python or TypeScript tools to query local databases, inspect files, or control local services from your phone.
          </p>
          <div className="home-code-block" style={{ textAlign: 'left', margin: '2rem auto' }}>
            <div className="home-code-header">example_tool.py</div>
            <pre><code>{`from mcp.server.fastmcp import FastMCP

mcp = FastMCP("my-tools")

@mcp.tool()
def search_notes(query: str) -> str:
    """Search your local notes database."""
    results = db.search(query)
    return f"Found {len(results)} matches"`}</code></pre>
          </div>
          <p className="home-body">
            <Link to="/developers" className="home-inline-link">Read the full developer guide →</Link>
          </p>
        </div>
      </section>

      {/* ── Security ── */}
      <section className="home-section" aria-label="Security">
        <div className="home-narrow text-center">
          <span className="section-label">Security</span>
          <h2>Cryptographic Security</h2>
          <p className="home-body">
            Every session begins with an authenticated X25519 key exchange. Messages are encrypted
            locally using AES-256-GCM before leaving memory. Private keys stay enclosed in your
            device's hardware enclave, and chat history is saved in an on-device SQLCipher database.
          </p>
          <p className="home-body">
            <Link to="/security" className="home-inline-link">View complete security architecture →</Link>
          </p>
        </div>
      </section>

      {/* ── Enterprise ── */}
      <section className="home-section home-section-alt" aria-label="Enterprise">
        <div className="home-narrow text-center">
          <span className="section-label">Enterprise</span>
          <h2>Enterprise & Private VPC</h2>
          <p className="home-body">
            Deploy the BATON connector within your corporate VPC via Docker. Provide employees with
            secure mobile access to internal model clusters and enterprise endpoints with automated MDM provisioning
            and cryptographic audit trails.
          </p>
          <p className="home-body">
            <Link to="/enterprise" className="home-inline-link">Enterprise deployment documentation →</Link>
          </p>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="home-section" aria-label="Pricing">
        <div className="home-symmetric-wrapper">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="section-label">Pricing</span>
            <h2>Simple, Honest Pricing</h2>
            <p className="home-body" style={{ maxWidth: '580px', margin: '0 auto' }}>
              We charge for infrastructure so your data stays yours. No VC funding, no data monetization.
            </p>
          </div>

          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-tier">Free</div>
              <div className="pricing-price">$0</div>
              <p className="pricing-desc">Same Wi-Fi only</p>
              <ul className="pricing-features">
                <li>Unlimited local AI chat</li>
                <li>E2EE on all messages</li>
                <li>MCP tool support</li>
                <li>On-device SQLCipher storage</li>
              </ul>
            </div>
            <div className="pricing-card featured">
              <div className="pricing-tier">Premium</div>
              <div className="pricing-price">Coming Soon</div>
              <p className="pricing-desc">Access from anywhere</p>
              <ul className="pricing-features">
                <li>Everything in Free</li>
                <li>Encrypted relay for remote access</li>
                <li>NAT traversal — no port forwarding</li>
                <li>Priority relay infrastructure</li>
              </ul>
            </div>
            <div className="pricing-card">
              <div className="pricing-tier">Enterprise</div>
              <div className="pricing-price">Custom</div>
              <p className="pricing-desc">Self-hosted VPC deployment</p>
              <ul className="pricing-features">
                <li>Everything in Premium</li>
                <li>Private relay in your VPC</li>
                <li>MDM provisioning</li>
                <li>Cryptographic audit trails</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="home-section home-section-alt" aria-label="FAQ">
        <div className="home-narrow">
          <h2 className="text-center" style={{ marginBottom: '2.5rem' }}>Frequently Asked Questions</h2>
          <div className="home-faq">
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
                Explore the repositories on <a href="https://github.com/ekam-baton" target="_blank" rel="noopener noreferrer">GitHub</a>.
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
