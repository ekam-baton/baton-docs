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

  const supportedHarnesses = [
    {
      name: 'Ollama',
      desc: 'The most popular runner for local Llama 3 and open-weight models.',
      code: {
        bash: `# 1. Start Ollama exposing the port
OLLAMA_HOST=0.0.0.0 ollama serve

# 2. Expose via tunnel
cloudflared tunnel --url http://localhost:11434`,
        baton_app: `Endpoint URL: https://xxx.trycloudflare.com
Auth Type: None (or add API key if using proxy)`
      }
    },
    {
      name: 'LM Studio',
      desc: 'Powerful local GUI and OpenAI-compatible drop-in server.',
      code: {
        bash: `# 1. Start LM Studio Local Server (Port 1234)
# 2. Expose via tunnel
cloudflared tunnel --url http://localhost:1234`,
        baton_app: `Endpoint URL: https://xxx.trycloudflare.com/v1
Auth Type: None`
      }
    },
    {
      name: 'vLLM',
      desc: 'High-throughput and memory-efficient serving engine for production.',
      code: {
        bash: `# 1. Start vLLM OpenAI-compatible server
python -m vllm.entrypoints.openai.api_server --model meta-llama/Llama-3-8b --port 8000

# 2. Expose via tunnel
cloudflared tunnel --url http://localhost:8000`,
      }
    },
    {
      name: 'Llama.cpp',
      desc: 'The core C++ engine for running GGUF models on consumer hardware.',
      code: {
        bash: `# 1. Start Llama.cpp server
./server -m models/llama3.gguf --port 8080 --host 0.0.0.0

# 2. Expose via tunnel
cloudflared tunnel --url http://localhost:8080`,
      }
    },
    {
      name: 'LocalAI',
      desc: 'Complete drop-in replacement REST API for OpenAI.',
      code: {
        bash: `# 1. Start LocalAI docker
docker run -p 8080:8080 localai/localai:latest-cpu

# 2. Expose via tunnel
cloudflared tunnel --url http://localhost:8080`,
      }
    },
    {
      name: 'AutoGen',
      desc: 'Microsoft\'s framework for building complex multi-agent conversations.',
      code: {
        python: `from autogpt import AutoGPT
from baton import BatonRouter

router = BatonRouter()
router.register_agent("autogpt", AutoGPT.listen_http(port=5000))
router.start()`,
        bash: `docker run -d -p 5000:5000 autogpt-baton-bridge`
      }
    },
    {
      name: 'CrewAI',
      desc: 'Role-playing multi-agent framework for delegating autonomous tasks.',
      code: {
        python: `# CrewAI Baton Adapter
from crewai import Crew
from baton.adapters import CrewAdapter

my_crew = Crew(agents=[researcher, writer], tasks=[task1])
router.register(CrewAdapter(my_crew, port=8080))`
      }
    },
    {
      name: 'LangChain / LangGraph',
      desc: 'The industry standard for building robust RAG and agentic workflows.',
      code: {
        python: `# LangGraph Baton Adapter
from baton.adapters import LangGraphAdapter

app = workflow.compile()
router.register(LangGraphAdapter(app, port=8080))`
      }
    },
    {
      name: 'Hugging Face TGI',
      desc: 'Text Generation Inference toolkit for deploying massive models.',
      code: {
        bash: `# 1. Start TGI Docker
docker run -p 8080:80 ghcr.io/huggingface/text-generation-inference

# 2. Expose via tunnel
cloudflared tunnel --url http://localhost:8080`,
      }
    },
    {
      name: 'GPT4All / Jan',
      desc: 'Privacy-first desktop clients with built-in API routing capabilities.',
      code: {
        bash: `# 1. Enable API Server in Settings (port 4891 for GPT4All, 1337 for Jan)
# 2. Expose via tunnel
cloudflared tunnel --url http://localhost:1337`,
      }
    }
  ];

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

            {/* ── Baton Native SDK Bridges ────────────────────────────── */}
      <div className="section-header" style={{ marginTop: '4rem', marginBottom: '2rem' }}>
        <h1 className="section-title" style={{ fontSize: '2.5rem' }}>Baton Native Bridges</h1>
        <p className="section-subtitle">
          SDK Adapters for building native agents from scratch.
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

      {/* ── Compatible Harnesses ─────────────────────────── */}
      <div className="section-header" style={{ marginTop: '4rem', marginBottom: '2rem' }}>
        <h1 className="section-title" style={{ fontSize: '2.5rem', background: 'linear-gradient(90deg, #fff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Supported Harnesses & Frameworks
        </h1>
        <p className="section-subtitle" style={{ maxWidth: '800px' }}>
          Baton's routing architecture is completely agnostic. It acts as a drop-in mobile proxy for the world's most powerful open-source AI frameworks.
        </p>
      </div>
      
      {supportedHarnesses.map((harness, i) => (
        <div className="z-block" key={harness.name}>
          <div className="z-text">
            <div>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.8rem', marginBottom: '0.5rem', marginTop: 0 }}>
                {harness.name}
              </h2>
              <p style={{ margin: 0 }}>{harness.desc}</p>
            </div>
          </div>
          <div className="z-code">
            <CodeTabs codeBlocks={harness.code} />
          </div>
        </div>
      ))}
    </div>

  );
}
