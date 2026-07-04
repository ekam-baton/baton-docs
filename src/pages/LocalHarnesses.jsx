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
      title: 'Start Your Local Agent',
      description: 'Run your local AI agent (e.g., using Ollama or a custom Python script). Make sure it is listening on a local port, such as 8080.',
      code: `// Start your local agent on port 8080
python my_agent.py --port 8080`,
    },
    {
      number: '02',
      title: 'Remote Access: Cloudflare Tunnels',
      description: 'To securely access your agent from outside your house, use Cloudflare Tunnels. It creates an encrypted link without opening router ports.',
      code: `// Install cloudflared and expose port 8080
cloudflared tunnel --url http://localhost:8080

// Copy the generated URL (e.g., https://xxx.trycloudflare.com)
// Paste this into the Endpoint URL field in Baton.`,
    },
    {
      number: '03',
      title: 'Remote Access: Ngrok Tunnels',
      description: 'Ngrok is another quick alternative for exposing local environments to your mobile device over the internet.',
      code: `// Install ngrok and expose port 8080
ngrok http 8080

// Copy the generated URL (e.g., https://xxx.ngrok-free.app)
// Paste this into the Endpoint URL field in Baton.`,
    },
    {
      number: '04',
      title: 'Local Wi-Fi Only: mDNS Discovery',
      description: 'If you only use Baton at home on the same Wi-Fi, the backend can register via mDNS. Baton discovers it automatically without any URL.',
      code: `// Backend registers:  _baton._tcp.local  (port 8081)
// Baton discovers it automatically.
// Works like AirDrop — same network, zero config.`,
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
          you can access it on your local Wi-Fi via <strong>mDNS</strong>, or securely expose it to your phone anywhere in the world using <strong>encrypted tunnels</strong>.
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

      {/* ── Top 10 Compatible Harnesses ─────────────────────────── */}
      <div className="z-block" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '2rem 0' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', background: 'linear-gradient(90deg, #fff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          World's Top 10 Supported Harnesses
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '800px' }}>
          Baton's routing architecture is completely agnostic. Because it speaks standard Model Context Protocol (MCP) and HTTP/WebSocket, it acts as a drop-in mobile proxy for the world's most powerful open-source AI frameworks.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', width: '100%' }}>
          {[
            { name: 'Ollama', desc: 'The most popular runner for local Llama 3 and open-weight models.' },
            { name: 'LM Studio', desc: 'Powerful local GUI and OpenAI-compatible drop-in server.' },
            { name: 'vLLM', desc: 'High-throughput and memory-efficient serving engine for production.' },
            { name: 'Llama.cpp', desc: 'The core C++ engine for running GGUF models on consumer hardware.' },
            { name: 'LocalAI', desc: 'Complete drop-in replacement REST API for OpenAI.' },
            { name: 'AutoGen', desc: 'Microsoft\'s framework for building complex multi-agent conversations.' },
            { name: 'CrewAI', desc: 'Role-playing multi-agent framework for delegating autonomous tasks.' },
            { name: 'LangChain / LangGraph', desc: 'The industry standard for building robust RAG and agentic workflows.' },
            { name: 'Hugging Face TGI', desc: 'Text Generation Inference toolkit for deploying massive models.' },
            { name: 'GPT4All / Jan', desc: 'Privacy-first desktop clients with built-in API routing capabilities.' }
          ].map((harness, i) => (
            <div key={harness.name} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '12px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0 0 0.5rem', fontSize: '1.2rem' }}>
                <span style={{ color: '#a78bfa', fontWeight: 'bold' }}>#{i + 1}</span>
                {harness.name}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>
                {harness.desc}
              </p>
            </div>
          ))}
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
