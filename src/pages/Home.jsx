import React from 'react';
import { Link } from 'react-router-dom';
import GalaxyBackground from '../components/GalaxyBackground';
import ConnectionLog from '../components/AuditLogFeed';

export default function Home() {
  return (
    <div className="animate-fade-in" style={{ position: 'relative' }}>
      <GalaxyBackground />

      {/* ── Hero ── */}
      <section className="home-hero" aria-label="Hero" style={{ position: 'relative', zIndex: 1 }}>
        <div className="home-hero-inner">
          <h1>
            Your AI stays<br />on your machine.
          </h1>
          <p className="home-hero-lead">
            BATON is a mobile app that talks to AI models running on your own computer.
            Your prompts never leave your network. No accounts, no cloud storage, no data harvesting.
          </p>
          <div className="home-hero-cta">
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
              macOS
            </a>
          </div>
          <p className="home-hero-note">
            Also available for <a href="https://github.com/ekam-baton/baton/releases/latest/download/BatonNetwork.xcframework.zip" target="_blank" rel="noopener noreferrer">iOS (Framework)</a> · Free to try, $9.99/year after
          </p>
        </div>
      </section>

      {/* ── How it works + Connection Log ── */}
      <section className="home-section" aria-label="How it works" style={{ position: 'relative', zIndex: 1 }}>
        <div className="home-narrow">
          <h2>How it works</h2>
          <p className="home-body">
            You run an AI model on your computer — Ollama, LM Studio, vLLM, whatever you prefer.
            BATON connects your phone to that model over an encrypted channel.
            When you're on the same Wi-Fi, the connection is direct and instant. When you're out,
            it routes through a relay that can't read your messages.
          </p>
          <p className="home-body">
            That's it. No sign-ups, no API keys to manage, no tokens metered by a cloud provider.
            Your hardware, your models, your conversations.
          </p>
        </div>

        {/* Terminal showing a real connection sequence */}
        <div style={{ marginTop: '2.5rem' }}>
          <ConnectionLog />
        </div>
      </section>

      {/* ── The problem ── */}
      <section className="home-section home-section-alt" aria-label="The problem we solve" style={{ position: 'relative', zIndex: 1 }}>
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
                  <li>$9.99/year for the relay service</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Setup ── */}
      <section className="home-section" aria-label="Setup" style={{ position: 'relative', zIndex: 1 }}>
        <div className="home-narrow">
          <h2>Setup takes about two minutes</h2>
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
            Once paired, your phone remembers the connection.
            Open the app and start chatting. It reconnects automatically.
          </p>
        </div>
      </section>

      {/* ── For developers ── */}
      <section className="home-section home-section-alt" aria-label="Developers" style={{ position: 'relative', zIndex: 1 }}>
        <div className="home-narrow">
          <h2>Build tools that run on your machine</h2>
          <p className="home-body">
            BATON supports the <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">Model Context Protocol</a> (MCP),
            the open standard for connecting AI models to local tools. Write a Python script that
            queries your database, reads files, controls your smart home, or calls internal APIs —
            then trigger it from your phone.
          </p>
          <div className="home-code-block">
            <div className="home-code-header">example_tool.py</div>
            <pre><code>{`from mcp.server.fastmcp import FastMCP

mcp = FastMCP("my-tools")

@mcp.tool()
def search_notes(query: str) -> str:
    """Search your local notes database."""
    # Your logic here — runs on YOUR computer
    results = db.search(query)
    return f"Found {len(results)} matches"`}</code></pre>
          </div>
          <p className="home-body" style={{ marginTop: '1.5rem' }}>
            Register it in <code>baton.json</code>, restart the connector, and it's available from your phone.
            <Link to="/developers" className="home-inline-link"> Read the developer guide →</Link>
          </p>
        </div>
      </section>

      {/* ── Security ── */}
      <section className="home-section" aria-label="Security" style={{ position: 'relative', zIndex: 1 }}>
        <div className="home-narrow">
          <h2>How the encryption works</h2>
          <p className="home-body">
            When your phone and computer pair, they perform an X25519 key exchange — the same
            algorithm used by Signal and WireGuard. Every message is then encrypted with AES-256-GCM
            before it leaves either device.
          </p>
          <p className="home-body">
            The relay server, when needed, forwards encrypted packets it cannot decrypt. It knows
            a device ID is talking to another device ID. It cannot see what's being said. We designed
            it this way because the simplest way to protect data is to never have it.
          </p>
          <p className="home-body">
            Private keys live in your phone's hardware security module (Android Keystore / iOS Secure Enclave)
            and never leave the chip. Chat history is stored locally in a SQLCipher-encrypted database.
            <Link to="/security" className="home-inline-link"> Full security architecture →</Link>
          </p>
        </div>
      </section>

      {/* ── Enterprise ── */}
      <section className="home-section home-section-alt" aria-label="Enterprise" style={{ position: 'relative', zIndex: 1 }}>
        <div className="home-narrow">
          <h2>Works for teams too</h2>
          <p className="home-body">
            If you're an IT admin, you can deploy the BATON relay inside your own VPC.
            Proxy requests to your Anthropic, Azure OpenAI, or Vertex AI instances
            without exposing API keys to end users. Provision devices through MDM.
            Every conversation gets a cryptographic audit trail that satisfies ISO 27037.
          </p>
          <p className="home-body">
            <Link to="/enterprise" className="home-inline-link">Enterprise deployment guide →</Link>
          </p>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="home-section" aria-label="Pricing" style={{ position: 'relative', zIndex: 1 }}>
        <div className="home-narrow">
          <h2>Pricing</h2>
          <p className="home-body">
            The mobile app and desktop connector are free to download. The relay service that lets
            you reach your computer from outside your home network costs <strong>$9.99 per year</strong> (₹199/year in India).
          </p>
          <p className="home-body">
            There are no tiers, no feature gates, no "contact sales" pages. One price, everything included.
            We charge for the relay infrastructure so we don't have to monetize your data.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="home-section home-section-alt" aria-label="FAQ" style={{ position: 'relative', zIndex: 1 }}>
        <div className="home-narrow">
          <h2>Questions</h2>
          <div className="home-faq">
            <details>
              <summary>Do I need to open ports on my router?</summary>
              <p>
                No. BATON uses NAT traversal and relay routing. You don't need to configure
                your router, set up dynamic DNS, or expose any services to the internet.
              </p>
            </details>
            <details>
              <summary>What models can I use?</summary>
              <p>
                Anything that speaks HTTP or the Model Context Protocol. Ollama, LM Studio,
                vLLM, LocalAI, text-generation-webui — if it runs on your machine and has an
                API endpoint, BATON can talk to it. You can also proxy to cloud APIs like
                Anthropic or Azure OpenAI if you prefer.
              </p>
            </details>
            <details>
              <summary>Is this open source?</summary>
              <p>
                The desktop connector and relay server are open source under the Apache 2.0 license.
                The mobile apps are currently source-available. All code is on <a href="https://github.com/ekam-baton" target="_blank" rel="noopener noreferrer">GitHub</a>.
              </p>
            </details>
            <details>
              <summary>Why not just use a VPN?</summary>
              <p>
                You could, but a VPN exposes your entire network. BATON only exposes the specific
                model endpoints you configure, with per-message encryption on top. It's a narrower,
                more secure surface.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
