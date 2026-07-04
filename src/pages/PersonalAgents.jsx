import React from 'react';
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
