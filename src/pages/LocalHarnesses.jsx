import React, { useState } from 'react';
import CodeTabs from '../components/CodeTabs';

export default function LocalHarnesses() {
  const [activeStep, setActiveStep] = useState(null);

  const openClawCode = {
    rust: `// OpenClaw Integration
let openclaw = OpenClawAdapter::new("http://localhost:8080/v1");
router.register(openclaw);`,
    python: `# OpenClaw Python Bridge
from baton import OpenClaw
claw = OpenClaw(endpoint="http://localhost:8080/v1")
claw.connect()`,
    go: `// OpenClaw Go Bridge
import "github.com/baton-router/sdk-go"

claw := baton.NewOpenClaw("http://localhost:8080/v1")
err := claw.Connect()`,
    swift: `// BATON iOS SDK
import BatonKit

let claw = OpenClaw(endpoint: "http://localhost:8080/v1")
Task {
    await claw.connect()
    let response = try await claw.chat("Hello local model!")
}`,
    curl: `curl -X POST http://localhost:8080/v1/agent \\
  -H "Content-Type: application/json" \\
  -d '{"model": "llama-3-8b-local", "messages": []}'`
  };

  const nemoClawCode = {
    rust: `// NemoClaw Secure Sandbox
let secure_nemo = NemoClawAdapter::with_sandbox(
    SandboxConfig::strict()
        .allow_network(false)
        .allow_fs_read("/app/data")
);
router.register(secure_nemo);`,
    go: `// NemoClaw Secure Sandbox (Go)
sandbox := baton.NewSandboxConfig().
    AllowNetwork(false).
    AllowFSRead("/app/data")
secureNemo := baton.NewNemoClawAdapter(sandbox)`,
    bash: `# Launch NemoClaw with Seccomp Profile
nemoclaw start --profile strict-sandbox.json`,
    swift: `// iOS Sandbox config
let sandbox = SandboxConfig.strict()
    .allowNetwork(false)
    .allowFSRead("/app/data")
let secureNemo = NemoClawAdapter(sandbox: sandbox)`
  };

  const autoGptCode = {
    python: `# AutoGPT HTTP Bridge
from autogpt import AutoGPT
from baton import BatonRouter

router = BatonRouter()
router.register_agent("autogpt", AutoGPT.listen_http(port=5000))
router.start()`,
    go: `// AutoGPT Bridge via Go
router := baton.NewBatonRouter()
router.RegisterAgent("autogpt", baton.AutoGPTListenHTTP(5000))
router.Start()`,
    bash: `# Start AutoGPT Docker bridge
docker run -d -p 5000:5000 autogpt-baton-bridge`,
    swift: `// AutoGPT Bridge via iOS
let router = BatonRouter()
router.registerAgent("autogpt", AutoGPT.listenHTTP(port: 5000))
router.start()`
  };

  const steps = [
    {
      number: '01',
      title: 'Start Your Local Backend',
      description: 'Run mcp-connector on your laptop, or start an agent built with our Developer SDKs. It auto-detects your IP and prints a QR code in the terminal.',
      code: `cd baton-backend
cargo run -p mcp-connector
# OR: node my-agent.js


# ╔══════════════════════════════════════════╗
# ║       📱  Scan to Connect in Baton        ║
# ╚══════════════════════════════════════════╝
# [QR CODE DISPLAYED HERE]
#   URL: http://192.168.1.10:8081
#   Or: open Baton → tap + → paste URL above
#
# mDNS: Registered as _baton._tcp.local`,
    },
    {
      number: '02',
      title: 'Scan QR in Baton (Recommended)',
      description: 'Open Baton → tap + (Add Agent) → tap the QR icon next to the URL field → point your camera at the terminal. Done.',
      code: `// No manual typing needed.
// Baton auto-fills and validates the URL from the scan.
// Works with any QR reader on the same network.`,
    },
    {
      number: '03',
      title: 'Auto-Discover via mDNS',
      description: 'The backend registers as _baton._tcp.local. On the same Wi-Fi, Baton can list discovered servers automatically.',
      code: `// Backend registers:  _baton._tcp.local  (port 8081)
// Baton discovers it without any QR or URL.
// Works like AirDrop — same network, zero config.`,
    },
    {
      number: '04',
      title: 'Manual Fallback',
      description: 'Switched Wi-Fi? Tap the chat title in Baton → edit Endpoint URL → Save. No reconnect wizard needed.',
      code: `// Find your new IP after switching networks:
ipconfig                    // Windows
ifconfig | grep "inet "     // Mac / Linux

// Then in Baton: tap agent name in chat → edit URL → Save`,
    },
  ];

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="section-header">
        <h1 className="section-title">Local Harnesses</h1>
        <p className="section-subtitle">
          Deploy raw messaging pipes via OpenClaw, or enforce strict execution boundaries with NemoClaw&apos;s seccomp-secured OpenShell sandbox. Total privacy, absolute control.
        </p>
      </div>

      {/* ── Connect with Baton ─────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(61,142,255,0.08) 0%, rgba(100,210,255,0.05) 100%)',
        border: '1px solid rgba(61,142,255,0.25)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '3rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>📱</span>
          <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, color: '#3D8EFF' }}>
            Connect with Baton — Zero Config
          </h2>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2rem', maxWidth: '640px', lineHeight: 1.6 }}>
          When you start <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 4 }}>mcp-connector</code> (or any custom agent built with the <strong>Baton Developer SDKs</strong>),
          it detects your local IP, prints a scannable QR code, and registers on your local network via <strong>mDNS</strong>.
          No manual IP lookup. No copy-paste. Just scan and go.
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
          💡 <strong style={{ color: '#FF9F0A' }}>Changed Wi-Fi networks?</strong> Your laptop gets a new IP.
          Re-scan the terminal QR code, or tap the agent name in any Baton chat to edit the URL on-the-fly.
        </div>
      </div>

      {/* ── Existing harness docs ────────────────────────────── */}
      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>OpenClaw Integration</h2>
            <p>OpenClaw provides raw, unrestricted messaging capabilities for local agents running directly on your hardware.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={openClawCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>NemoClaw Sandbox</h2>
            <p>NemoClaw wraps your agents in a strict seccomp-bpf sandbox, preventing network exfiltration and restricting filesystem access.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={nemoClawCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>AutoGPT Bridge</h2>
            <p>Connect your existing AutoGPT instances to the BATON router using the HTTP bridge, allowing it to delegate tasks to other agents.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={autoGptCode} />
        </div>
      </div>
    </div>
  );
}
