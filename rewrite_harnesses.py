import textwrap

content = """import React, { useState } from 'react';
import CodeTabs from '../components/CodeTabs';

export default function LocalHarnesses() {
  const [activeStep, setActiveStep] = useState(null);

  const frameworkCode = {
    "Ollama": `# 1. Start Ollama exposing the port
OLLAMA_HOST=0.0.0.0 ollama serve

# 2. Expose via Cloudflare Tunnel
cloudflared tunnel --url http://localhost:11434

# 3. Paste the generated URL into Baton!`,
    "Python (LangChain)": `# LangChain / CrewAI / AutoGen Adapter
from baton.adapters import LangChainAdapter
from baton import BatonRouter
from my_agent import my_langchain_workflow

router = BatonRouter()
# Drop your existing LangChain app right into Baton
router.register(LangChainAdapter(my_langchain_workflow, port=8080))
router.start()`,
    "Docker (vLLM)": `# Deploy a high-throughput model via Docker
docker run --gpus all -p 8000:8000 vllm/vllm-openai \\
    --model meta-llama/Llama-3-8b

# Expose securely to your mobile device
cloudflared tunnel --url http://localhost:8000`
  };

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
}`
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
nemoclaw start --profile strict-sandbox.json`
  };

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
        <h1 className="section-title">Local Harnesses & Agents</h1>
        <p className="section-subtitle">
          Connect your existing third-party AI frameworks, or build secure native agents from scratch using our SDK adapters.
        </p>
      </div>

      {/* ── 1. Connect Existing Frameworks ─────────────────────── */}
      <div className="z-block" style={{ marginTop: '2rem' }}>
        <div className="z-text">
          <div>
            <h2 style={{ fontSize: '2rem', background: 'linear-gradient(90deg, #fff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              1. Connect Existing Frameworks
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.7)' }}>
              Baton's routing architecture is completely agnostic. It acts as a drop-in mobile proxy for the world's most powerful open-source AI frameworks.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '1rem' }}>
              Seamlessly connect to runners like <strong>Ollama, vLLM, and LM Studio</strong>, or orchestrate advanced autonomous agents built on <strong>LangChain, CrewAI, and AutoGen</strong>.
            </p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={frameworkCode} />
        </div>
      </div>

      {/* ── 2. Baton Native SDK Bridges ────────────────────────── */}
      <div className="section-header" style={{ marginTop: '5rem', marginBottom: '2rem' }}>
        <h1 className="section-title" style={{ fontSize: '2.5rem' }}>2. Baton Native SDK Bridges</h1>
        <p className="section-subtitle" style={{ maxWidth: '800px' }}>
          If you are building an agent from scratch, our native SDK adapters provide robust plumbing and strict security boundaries.
        </p>
      </div>

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

      {/* ── 3. Routing & Remote Access ─────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(61,142,255,0.08) 0%, rgba(100,210,255,0.05) 100%)',
        border: '1px solid rgba(61,142,255,0.25)',
        borderRadius: '16px',
        padding: '2rem',
        marginTop: '5rem',
        marginBottom: '3rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🌐</span>
          <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 700, color: '#3D8EFF' }}>
            3. Remote Access & Tunneling
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

with open("src/pages/LocalHarnesses.jsx", "w", encoding="utf-8") as f:
    f.write(content)
