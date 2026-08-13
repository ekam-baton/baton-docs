import React from 'react';
import { Link } from 'react-router-dom';
import GalaxyBackground from '../components/GalaxyBackground';
import AuditLogFeed from '../components/AuditLogFeed';

export default function Home() {
  return (
    <div className="animate-fade-in" style={{ position: 'relative' }}>
      {/* 3D Traveling Galaxy Background */}
      <GalaxyBackground />

      {/* ── Hero Section (Two-Column with Live Telemetry) ── */}
      <section className="home-hero-container" aria-label="Hero">
        <div className="home-hero-grid">
          {/* Left Column: Headline, Value Proposition, Downloads */}
          <div className="home-hero-left">
            <div className="hero-status-pill">
              <span className="hero-status-dot" />
              <span>Direct LAN & Blind TURN Relay</span>
            </div>

            <h1 className="hero-headline">
              Your AI stays<br />on your machine.
            </h1>

            <p className="hero-description">
              BATON connects your smartphone directly to AI models running on your personal computer or private VPS.
              Your prompts and data never touch third-party cloud servers.
            </p>

            <div className="hero-cta-group">
              <a
                href={`${import.meta.env.BASE_URL}Baton_0.1.0_x64_en-US.msi`}
                download
                className="btn-solid"
              >
                Download for Windows
              </a>
              <a
                href="https://github.com/ekam-baton/baton/releases/latest/download/app-debug.apk"
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

            <p className="hero-subnote">
              Also available for <a href="https://github.com/ekam-baton/baton/releases/latest/download/BatonNetwork.xcframework.zip" target="_blank" rel="noopener noreferrer">iOS (Framework)</a> · Free to try, $9.99/year after
            </p>
          </div>

          {/* Right Column: Live Cryptographic Telemetry Feed */}
          <div className="home-hero-right">
            <AuditLogFeed />
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="home-section" aria-label="How it works">
        <div className="home-narrow">
          <h2>How it works</h2>
          <p className="home-body">
            You run an AI model on your computer — Ollama, LM Studio, vLLM, whatever you prefer.
            BATON connects your phone to that model over an encrypted channel.
            When you're on the same Wi-Fi, the connection is direct and instant. When you're out,
            it routes through a blind relay that mathematically cannot decrypt your messages.
          </p>
          <p className="home-body">
            No central accounts, no tracking, no tokens metered by a cloud provider.
            Your hardware, your models, your conversations.
          </p>
        </div>
      </section>

      {/* ── The Problem with Cloud AI ── */}
      <section className="home-section home-section-alt" aria-label="The problem we solve">
        <div className="home-split">
          <div className="home-split-text">
            <h2>The problem with cloud AI</h2>
            <p className="home-body">
              Every time you send a prompt to ChatGPT, Claude, or Gemini, your words travel to
              someone else's server. They get logged. They get used for training. They get stored
              in a jurisdiction you didn't choose.
            </p>
            <p className="home-body">
              For personal use, that might be fine. For medical questions, legal drafts,
              proprietary code, client data, or anything you'd rather keep private — it's not.
            </p>
          </div>
          <div className="home-split-aside">
            <div className="home-comparison">
              <div className="comparison-col">
                <h4>Cloud AI</h4>
                <ul>
                  <li>Prompts stored on third-party servers</li>
                  <li>Data used for model training</li>
                  <li>Rate limits and usage caps</li>
                  <li>Monthly subscription fees</li>
                </ul>
              </div>
              <div className="comparison-col comparison-col-alt">
                <h4>BATON + Local AI</h4>
                <ul>
                  <li>Prompts stay on your hardware</li>
                  <li>Nothing leaves your network</li>
                  <li>No rate limits — your GPU, your rules</li>
                  <li>$9.99/year for relay infrastructure</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Setup ── */}
      <section className="home-section" aria-label="Setup">
        <div className="home-narrow">
          <h2>Setup takes two minutes</h2>
          <ol className="home-steps">
            <li>
              <strong>Install the desktop connector</strong> on your Windows or Mac.
              It finds your local AI models automatically.
            </li>
            <li>
              <strong>Install the mobile app</strong> on your Android or iPhone.
            </li>
            <li>
              <strong>Scan the QR code</strong> on your desktop screen.
              Your devices pair with a cryptographic handshake — no passwords, no accounts.
            </li>
          </ol>
          <p className="home-body">
            Once paired, your phone remembers the connection and reconnects automatically.
          </p>
        </div>
      </section>

      {/* ── Developers & MCP ── */}
      <section className="home-section home-section-alt" aria-label="Developers">
        <div className="home-narrow">
          <h2>Build tools that run on your machine</h2>
          <p className="home-body">
            BATON supports the <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">Model Context Protocol</a> (MCP),
            the open standard for connecting AI models to local tools. Write a Python script that
            queries your database, reads files, controls smart devices, or calls internal APIs —
            then trigger it securely from your phone.
          </p>
          <div className="home-code-block">
            <div className="home-code-header">example_tool.py</div>
            <pre><code>{`from mcp.server.fastmcp import FastMCP

mcp = FastMCP("my-tools")

@mcp.tool()
def search_notes(query: str) -> str:
    """Search your local notes database."""
    # Runs locally on YOUR computer
    results = db.search(query)
    return f"Found {len(results)} matches"`}</code></pre>
          </div>
          <p className="home-body" style={{ marginTop: '1.5rem' }}>
            Register it in <code>baton.json</code> and it's immediately available from your phone.
            <Link to="/developers" className="home-inline-link"> Read the developer guide →</Link>
          </p>
        </div>
      </section>

      {/* ── Security Architecture ── */}
      <section className="home-section" aria-label="Security">
        <div className="home-narrow">
          <h2>End-to-end encryption by default</h2>
          <p className="home-body">
            When your phone and computer pair, they perform an X25519 Diffie-Hellman key exchange.
            Every message is encrypted with AES-256-GCM before leaving your device.
          </p>
          <p className="home-body">
            The relay server only sees encrypted envelopes and a destination ID header. It cannot
            read your prompts or model responses. Private keys remain protected inside your
            phone's hardware security enclave (Android Keystore / iOS Secure Enclave).
            <Link to="/security" className="home-inline-link"> Full security architecture →</Link>
          </p>
        </div>
      </section>

      {/* ── Enterprise ── */}
      <section className="home-section home-section-alt" aria-label="Enterprise">
        <div className="home-narrow">
          <h2>Enterprise & Private VPC</h2>
          <p className="home-body">
            Deploy the BATON hub inside your private VPC to give workforce teams secure mobile
            access to internal models (Anthropic Claude, Azure OpenAI, Google Vertex AI) without
            data egress into external networks. Provision devices through MDM with full ISO/IEC 27037 audit logs.
          </p>
          <p className="home-body">
            <Link to="/enterprise" className="home-inline-link">Enterprise deployment guide →</Link>
          </p>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="home-section" aria-label="Pricing">
        <div className="home-narrow">
          <h2>Pricing</h2>
          <p className="home-body">
            The mobile app and desktop connector are free to download and use on local networks.
            The relay service that lets you reach your home server from cellular data costs <strong>$9.99/year</strong> (₹199/year in India).
          </p>
          <p className="home-body">
            One simple price. No tiers, no token markups, no data monetization.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="home-section home-section-alt" aria-label="FAQ">
        <div className="home-narrow">
          <h2>Questions</h2>
          <div className="home-faq">
            <details>
              <summary>Do I need to open router ports or configure dynamic DNS?</summary>
              <p>
                No. BATON's hybrid networking uses automated NAT traversal and relay routing so
                you can securely connect from anywhere without exposing open ports.
              </p>
            </details>
            <details>
              <summary>Which AI models can I use?</summary>
              <p>
                Any engine that supports HTTP or the Model Context Protocol: Ollama, LM Studio,
                vLLM, LocalAI, Mistral, Llama 3, DeepSeek, or custom Python tool servers.
              </p>
            </details>
            <details>
              <summary>Is BATON open source?</summary>
              <p>
                The desktop connector and cloud relay are open source under the Apache 2.0 license.
                The mobile apps are source-available. Find everything on <a href="https://github.com/ekam-baton" target="_blank" rel="noopener noreferrer">GitHub</a>.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
