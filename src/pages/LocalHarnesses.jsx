import React, { useState } from 'react';
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
docker run --gpus all -p 8000:8000 vllm/vllm-openai \
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

  const githubMcpCode = {
    bash: `# Run the official GitHub MCP server
npx -y @modelcontextprotocol/server-github`
  };

  const postgresMcpCode = {
    bash: `# Run the PostgreSQL MCP server with your DB URL
npx -y @modelcontextprotocol/server-postgres postgresql://localhost/mydb`
  };

  const playwrightMcpCode = {
    bash: `# Run the Playwright Browser Automation MCP Server
npx -y @modelcontextprotocol/server-playwright`
  };

  const braveSearchMcpCode = {
    bash: `# Run Brave Search MCP (requires API key)
BRAVE_API_KEY=your_key npx -y @modelcontextprotocol/server-brave-search`
  };

  const filesystemMcpCode = {
    bash: `# Run Filesystem MCP to expose specific directories
npx -y @modelcontextprotocol/server-filesystem /path/to/expose`
  };

  const memoryMcpCode = {
    bash: `# Run the Knowledge Graph Memory MCP Server
npx -y @modelcontextprotocol/server-memory`
  };

  const slackMcpCode = {
    bash: `# Run the Slack MCP server for workspace interaction
SLACK_BOT_TOKEN=xoxb-... npx -y @modelcontextprotocol/server-slack`
  };

  const googleDriveMcpCode = {
    bash: `# Run the Google Drive MCP server
npx -y @modelcontextprotocol/server-gdrive`
  };

  const steps = [
    {
      number: '01',
      title: 'Start Your Local Agent',
      description: 'Run your local AI agent (e.g., using Ollama or a custom Python script). Make sure it is listening on a local port, such as 8080.',
      code: `// Start your local agent on port 8080\npython my_agent.py --port 8080`,
    },
    {
      number: '02',
      title: 'Remote Access: Cloudflare Tunnels',
      description: 'To securely access your agent from outside your house, use Cloudflare Tunnels. It creates an encrypted link without opening router ports.',
      code: `// Install cloudflared and expose port 8080\ncloudflared tunnel --url http://localhost:8080\n\n// Copy the generated URL (e.g., https://xxx.trycloudflare.com)\n// Paste this into the Endpoint URL field in Baton.`,
    },
    {
      number: '03',
      title: 'Remote Access: Ngrok Tunnels',
      description: 'Ngrok is another quick alternative for exposing local environments to your mobile device over the internet.',
      code: `// Install ngrok and expose port 8080\nngrok http 8080\n\n// Copy the generated URL (e.g., https://xxx.ngrok-free.app)\n// Paste this into the Endpoint URL field in Baton.`,
    },
    {
      number: '04',
      title: 'Local Wi-Fi Only: mDNS Discovery',
      description: 'If you only use Baton at home on the same Wi-Fi, the backend can register via mDNS. Baton discovers it automatically without any URL.',
      code: `// Backend registers:  _baton._tcp.local  (port 8081)\n// Baton discovers it automatically.\n// Works like AirDrop — same network, zero config.`,
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

      {/* ── 2. Popular MCP Servers & SDK Bridges ────────────────────────── */}
      <div className="section-header" style={{ marginTop: '5rem', marginBottom: '2rem' }}>
        <h1 className="section-title" style={{ fontSize: '2.5rem' }}>2. Real-World MCP Servers & Adapters</h1>
        <p className="section-subtitle" style={{ maxWidth: '800px' }}>
          Connect real-world tools to Baton. Use native adapters like OpenClaw/NemoClaw to build from scratch, or instantly connect the world's most popular open-source Model Context Protocol (MCP) servers.
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
            <h2>GitHub MCP Server</h2>
            <p>A standard for managing developer workflows. Allows agents to interact with repositories, issues, PRs, and discussions using GitHub's native identity.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={githubMcpCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>Playwright MCP Server</h2>
            <p>One of the most essential servers in the ecosystem. It allows your agents to drive browser automation, perform testing, and scrape web content.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={playwrightMcpCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>PostgreSQL MCP Server</h2>
            <p>Instantly gives your AI agents secure, read-only or read-write access to local database schemas and records for Data Analysis tasks.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={postgresMcpCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>Memory MCP Server</h2>
            <p>A popular reference server that implements a knowledge graph-based persistent memory system, helping agents maintain context over long sessions.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={memoryMcpCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>Filesystem MCP Server</h2>
            <p>A core reference implementation that provides secure, tightly-controlled access to local files and directories, fundamental for coding assistants.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={filesystemMcpCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>Brave Search MCP Server</h2>
            <p>Equips your local agents with live internet access via the Brave Search API, allowing them to pull real-time data and news into Baton.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={braveSearchMcpCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>Slack MCP Server</h2>
            <p>Allows your Baton agents to read messages, post updates, and interact directly with your team's Slack workspaces.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={slackMcpCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>Google Drive MCP Server</h2>
            <p>Enables secure access to your Google Docs, Sheets, and Drive files, allowing your local agent to search and read your private documents.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={googleDriveMcpCode} />
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
