import os

agents_content = """import React from 'react';
import CodeTabs from '../components/CodeTabs';

export default function PersonalAgents() {
  const openClawCode = {
    rust: `// OpenClaw Integration
let openclaw = OpenClawAdapter::new("http://localhost:8080/v1");
router.register(openclaw);`
  };

  const hermesCode = {
    python: `# Hermes Agent Integration
from baton.agents import HermesAgent
from baton import BatonRouter

hermes = HermesAgent(model="NousResearch/Hermes-3")
router = BatonRouter()
router.register(hermes, port=8080)
router.start()`
  };

  const nemoClawCode = {
    rust: `// NemoClaw Secure Sandbox
let secure_nemo = NemoClawAdapter::with_sandbox(
    SandboxConfig::strict()
        .allow_network(false)
        .allow_fs_read("/app/data")
);
router.register(secure_nemo);`
  };

  const piCode = {
    python: `# Pi Agent Core SDK
from baton.adapters import PiAdapter
import pi_agent_core

agent = pi_agent_core.Agent()
router.register(PiAdapter(agent))`
  };

  const khojCode = {
    bash: `# Start Khoj
khoj-server --port 8000

# Expose securely to Baton
cloudflared tunnel --url http://localhost:8000`
  };

  const agentZeroCode = {
    python: `# Agent Zero Framework
from agent_zero import Zero
from baton.adapters import ZeroAdapter

zero_instance = Zero.initialize()
router.register(ZeroAdapter(zero_instance))`
  };

  const openHarnessCode = {
    bash: `# OpenHarness Research Node
npm install -g @hkuds/openharness
openharness start --port 3000

# Expose securely to Baton
cloudflared tunnel --url http://localhost:3000`
  };

  const zCodeCode = {
    bash: `# Connect ZCode (GLM-5.2) to Baton
# Ensure you have your Z.ai API key configured
zcode connect --proxy-port 8080`
  };

  const scoutCode = {
    powershell: `# Microsoft Scout Container
Invoke-ScoutNode -UseOpenClawHarness -Port 8080

# Connect via mDNS to Baton on local network`
  };

  const kiloClawCode = {
    bash: `# KiloClaw Managed Host
# Paste the generated Managed URL directly into Baton Endpoint
kiloclaw deploy --model hermes-3 --cloud`
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="section-header">
        <h1 className="section-title" style={{ fontSize: '2.5rem' }}>Personal AI Agents</h1>
        <p className="section-subtitle" style={{ maxWidth: '800px' }}>
          Baton seamlessly proxies the world's most popular persistent "always-on" agent harnesses, letting you securely interact with them from anywhere.
        </p>
      </div>

      <div className="z-block" style={{ marginTop: '3rem' }}>
        <div className="z-text">
          <div>
            <h2>OpenClaw</h2>
            <p>The category pioneer (formerly Clawdbot/Moltbot). Built around a persistent Gateway daemon connecting to 25+ messaging channels. Largest ecosystem with 373K+ GitHub stars and 44,000+ community skills on ClawHub. Broad coverage, but requires careful security management due to its massive attack surface.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={openClawCode} />
        </div>
      </div>
      
      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>Hermes Agent (Nous Research)</h2>
            <p>The main challenger. Built around a self-improving learning loop, autonomously writing and refining its own reusable skills. Features conservative-by-default security (read-only root filesystems, prompt-injection scanning) and includes a built-in migrate tool for OpenClaw configs.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={hermesCode} />
        </div>
      </div>
      
      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>NemoClaw (NVIDIA)</h2>
            <p>A security/orchestration layer wrapping OpenClaw or Hermes with NVIDIA's OpenShell runtime. Enforces policy-based sandboxing and zero-permission-by-default execution. Positioned as the "enterprise-safe" way to run these harnesses securely.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={nemoClawCode} />
        </div>
      </div>
      
      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>Pi (Pi Agent Core)</h2>
            <p>The minimal terminal-coding harness underneath OpenClaw itself. Shipped as a robust SDK (pi-ai, pi-agent-core, pi-tui). The best pick if you want to embed a harness directly into your own software rather than run a full assistant daemon.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={piCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>Khoj</h2>
            <p>An open-source personal AI focused on self-hosted knowledge assistant use cases. Highly popular in the "always-on personal agent" category for managing private data.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={khojCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>Agent Zero</h2>
            <p>A general-purpose, persistent, self-hosted agent framework oriented toward flexible tool use and long-running autonomous tasks.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={agentZeroCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>OpenHarness (HKUDS)</h2>
            <p>An academic/research-origin harness frequently cited in current rankings alongside open-source personal-agent options. Highly experimental and flexible.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={openHarnessCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>ZCode (Z.ai)</h2>
            <p>The official harness for the GLM-5.2 model. Features million-token context, multi-agent Goals, mobile bot control, and a plugin architecture. A fast-emerging vendor-backed alternative.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={zCodeCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>Scout (Microsoft)</h2>
            <p>Microsoft's always-on enterprise agent built directly on top of OpenClaw's open-source harness. Showcased at Build 2026, it runs natively in Microsoft's execution containers.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={scoutCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>Honcho / KiloClaw</h2>
            <p>Managed hosting layers (e.g., KiloClaw for OpenClaw) that wrap open-source harnesses with one-click deployment, security hardening, and multi-model routing. Ideal for those bypassing self-hosting pains.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={kiloClawCode} />
        </div>
      </div>
    </div>
  );
}
"""

routing_content = """import React, { useState } from 'react';

export default function RoutingTunnels() {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      number: '01',
      title: 'Start Your Local Agent',
      description: 'Run your local AI agent (e.g., using Ollama or a custom Python script). Make sure it is listening on a local port, such as 8080.',
      code: `// Start your local agent on port 8080\\npython my_agent.py --port 8080`,
    },
    {
      number: '02',
      title: 'Remote Access: Cloudflare Tunnels',
      description: 'To securely access your agent from outside your house, use Cloudflare Tunnels. It creates an encrypted link without opening router ports.',
      code: `// Install cloudflared and expose port 8080\\ncloudflared tunnel --url http://localhost:8080\\n\\n// Copy the generated URL (e.g., https://xxx.trycloudflare.com)\\n// Paste this into the Endpoint URL field in Baton.`,
    },
    {
      number: '03',
      title: 'Remote Access: Ngrok Tunnels',
      description: 'Ngrok is another quick alternative for exposing local environments to your mobile device over the internet.',
      code: `// Install ngrok and expose port 8080\\nngrok http 8080\\n\\n// Copy the generated URL (e.g., https://xxx.ngrok-free.app)\\n// Paste this into the Endpoint URL field in Baton.`,
    },
    {
      number: '04',
      title: 'Local Wi-Fi Only: mDNS Discovery',
      description: 'If you only use Baton at home on the same Wi-Fi, the backend can register via mDNS. Baton discovers it automatically without any URL.',
      code: `// Backend registers:  _baton._tcp.local  (port 8081)\\n// Baton discovers it automatically.\\n// Works like AirDrop — same network, zero config.`,
    },
  ];

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="section-header">
        <h1 className="section-title">Routing & Remote Access</h1>
        <p className="section-subtitle">
          Securely connect your Baton mobile app to your local AI agents, whether you are on the same Wi-Fi or across the globe.
        </p>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, rgba(61,142,255,0.08) 0%, rgba(100,210,255,0.05) 100%)',
        border: '1px solid rgba(61,142,255,0.25)',
        borderRadius: '16px',
        padding: '2rem',
        marginTop: '3rem',
        marginBottom: '3rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🌐</span>
          <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 700, color: '#3D8EFF' }}>
            Zero-Config Networking
          </h2>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2rem', maxWidth: '640px', lineHeight: 1.6 }}>
          Once your agent is running, you can access it on your local Wi-Fi via <strong>mDNS</strong>, or securely expose it to your phone anywhere in the world using <strong>encrypted tunnels</strong>.
          No open router ports. Maximum security.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {steps.map((step) => (
            <div
              key={step.number}
              onClick={() => setActiveStep(activeStep === step.number ? null : step.number)}
              style={{
                background: activeStep === step.number ? 'rgba(61,142,255,0.12)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${activeStep === step.number ? 'rgba(61,142,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '12px',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{
                  background: 'rgba(61,142,255,0.2)',
                  color: '#3D8EFF',
                  borderRadius: '8px',
                  padding: '2px 10px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                }}>
                  {step.number}
                </span>
                <strong style={{ fontSize: '0.95rem' }}>{step.title}</strong>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', margin: '0 0 0.75rem', lineHeight: 1.5 }}>
                {step.description}
              </p>
              {activeStep === step.number && (
                <pre style={{
                  background: 'rgba(0,0,0,0.4)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  fontSize: '0.78rem',
                  color: '#64D2FF',
                  overflowX: 'auto',
                  margin: 0,
                  fontFamily: 'monospace',
                  whiteSpace: 'pre-wrap',
                }}>
                  {step.code}
                </pre>
              )}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '1.5rem',
          padding: '0.75rem 1rem',
          background: 'rgba(255,159,10,0.08)',
          border: '1px solid rgba(255,159,10,0.2)',
          borderRadius: '8px',
          fontSize: '0.875rem',
          color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.5,
        }}>
          💡 <strong style={{ color: '#FF9F0A' }}>Security Tip:</strong> Tunnels ensure that your agent is only reachable by Baton. Add API Key Authentication in Baton for an extra layer of defense against unauthorized access.
        </div>
      </div>
    </div>
  );
}
"""

app_content = """import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import PersonalAgents from './pages/PersonalAgents';
import RoutingTunnels from './pages/RoutingTunnels';
import Frameworks from './pages/Frameworks';
import Workspaces from './pages/Workspaces';
import AdaptersGuide from './pages/AdaptersGuide';
import Integrations from './pages/Integrations';
import A2A from './pages/A2A';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Changelog from './pages/Changelog';
import Community from './pages/Community';

function App() {
  return (
    <div className="app-container">
      <TopNav />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/a2a" element={<A2A />} />
          <Route path="/agents" element={<PersonalAgents />} />
          <Route path="/routing" element={<RoutingTunnels />} />
          <Route path="/frameworks" element={<Frameworks />} />
          <Route path="/workspaces" element={<Workspaces />} />
          <Route path="/adapters" element={<AdaptersGuide />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
"""

topnav_content = """import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import batonLogo from '../assets/baton-logo.jpg';

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`top-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          <img src={batonLogo} alt="BATON Logo" className="logo-img" style={{ borderRadius: '15%' }} />
          <span className="logo-text">BATON</span>
        </NavLink>

        <nav className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
          <NavLink to="/a2a" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>A2A Core</NavLink>
          <NavLink to="/agents" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Personal Agents</NavLink>
          <NavLink to="/routing" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Routing & Tunnels</NavLink>
          <NavLink to="/adapters" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Enterprise Adapters</NavLink>
          <NavLink to="/frameworks" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Frameworks</NavLink>
          <NavLink to="/integrations" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Integrations</NavLink>
          <NavLink to="/workspaces" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Workspaces</NavLink>
        </nav>

        <div className="nav-actions">
          <a href="https://github.com/ekam-baton" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>View on GitHub</button>
          </a>
          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
"""

with open("src/pages/PersonalAgents.jsx", "w", encoding="utf-8") as f:
    f.write(agents_content)
with open("src/pages/RoutingTunnels.jsx", "w", encoding="utf-8") as f:
    f.write(routing_content)
with open("src/App.jsx", "w", encoding="utf-8") as f:
    f.write(app_content)
with open("src/components/TopNav.jsx", "w", encoding="utf-8") as f:
    f.write(topnav_content)

if os.path.exists("src/pages/LocalHarnesses.jsx"):
    os.remove("src/pages/LocalHarnesses.jsx")
