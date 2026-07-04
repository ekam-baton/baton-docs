import textwrap

content = """import React, { useState } from 'react';
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
err := claw.Connect()`
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

  const ollamaCode = {
    bash: `# 1. Start Ollama exposing the port
OLLAMA_HOST=0.0.0.0 ollama serve

# 2. Expose via tunnel
cloudflared tunnel --url http://localhost:11434`,
    baton_app: `Endpoint URL: https://xxx.trycloudflare.com
Auth Type: None (or add API key if using proxy)`
  };

  const autoGenCode = {
    python: `# AutoGen HTTP Bridge
from autogen import ConversableAgent
from baton import BatonRouter

agent = ConversableAgent("chatbot")
router = BatonRouter()
router.register_agent("autogen", agent, port=5000)
router.start()`,
  };

  const crewAiCode = {
    python: `# CrewAI Baton Adapter
from crewai import Crew
from baton.adapters import CrewAdapter

my_crew = Crew(agents=[researcher, writer], tasks=[task1])
router.register(CrewAdapter(my_crew, port=8080))`
  };

  const langChainCode = {
    python: `# LangGraph Baton Adapter
from baton.adapters import LangGraphAdapter
from my_app import workflow

app = workflow.compile()
router.register(LangGraphAdapter(app, port=8080))`
  };

  const vllmCode = {
    bash: `# 1. Start vLLM OpenAI-compatible server
python -m vllm.entrypoints.openai.api_server --model meta-llama/Llama-3-8b --port 8000

# 2. Expose via tunnel
cloudflared tunnel --url http://localhost:8000`
  };

  const localAiCode = {
    bash: `# 1. Start LocalAI docker
docker run -p 8080:8080 localai/localai:latest-cpu

# 2. Expose via tunnel
cloudflared tunnel --url http://localhost:8080`
  };

  const lmStudioCode = {
    bash: `# 1. Start LM Studio Local Server (Port 1234)
# 2. Expose via tunnel
cloudflared tunnel --url http://localhost:1234`,
    baton_app: `Endpoint URL: https://xxx.trycloudflare.com/v1
Auth Type: None`
  };

  const llamaCppCode = {
    bash: `# 1. Start Llama.cpp server
./server -m models/llama3.gguf --port 8080 --host 0.0.0.0

# 2. Expose via tunnel
cloudflared tunnel --url http://localhost:8080`
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

      {/* ── 1. Supported AI Frameworks & Harnesses ────────────────────────── */}
      <div className="section-header" style={{ marginTop: '3rem', marginBottom: '2rem' }}>
        <h1 className="section-title" style={{ fontSize: '2.5rem' }}>1. Supported Frameworks</h1>
        <p className="section-subtitle" style={{ maxWidth: '800px' }}>
          Baton's architecture is completely agnostic. It acts as a drop-in mobile proxy for the world's most popular open-source AI frameworks.
        </p>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>OpenClaw Integration</h2>
            <p>Provides raw, unrestricted messaging capabilities for local agents running directly on your hardware via our native SDK.</p>
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
            <p>Wraps your agents in a strict seccomp-bpf sandbox, preventing network exfiltration and restricting filesystem access.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={nemoClawCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>Ollama</h2>
            <p>The most popular runner for local open-weight models. Simply start the server and expose it via a tunnel.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={ollamaCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>LangChain / LangGraph</h2>
            <p>The industry standard for building robust RAG and agentic workflows. Connect it using our dedicated Python adapter.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={langChainCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>AutoGen</h2>
            <p>Microsoft's framework for building complex multi-agent conversations. Seamlessly bridge AutoGen to the Baton router.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={autoGenCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>CrewAI</h2>
            <p>A role-playing multi-agent framework for delegating autonomous tasks to specific AI personas.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={crewAiCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>LM Studio</h2>
            <p>A powerful local GUI and OpenAI-compatible drop-in server for testing and running GGUF models.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={lmStudioCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>vLLM</h2>
            <p>High-throughput and memory-efficient serving engine designed for production deployments.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={vllmCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>LocalAI</h2>
            <p>A complete drop-in replacement REST API for OpenAI, running entirely on consumer hardware.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={localAiCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>Llama.cpp</h2>
            <p>The core C++ engine for running GGUF models on CPU and GPU with minimal overhead.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={llamaCppCode} />
        </div>
      </div>


      {/* ── 2. Routing & Remote Access ─────────────────────────── */}
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
            2. Remote Access & Tunneling
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
