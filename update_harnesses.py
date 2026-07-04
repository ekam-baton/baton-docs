import re

with open("src/pages/LocalHarnesses.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Define the new top 10 array
top10_array = """
  const top10Harnesses = [
    {
      name: 'Ollama',
      desc: 'The most popular runner for local Llama 3 and open-weight models.',
      code: {
        bash: `# 1. Start Ollama exposing the port\\nOLLAMA_HOST=0.0.0.0 ollama serve\\n\\n# 2. Expose via tunnel\\ncloudflared tunnel --url http://localhost:11434`,
        baton_app: `Endpoint URL: https://xxx.trycloudflare.com\\nAuth Type: None (or add API key if using proxy)`
      }
    },
    {
      name: 'LM Studio',
      desc: 'Powerful local GUI and OpenAI-compatible drop-in server.',
      code: {
        bash: `# 1. Start LM Studio Local Server (Port 1234)\\n# 2. Expose via tunnel\\ncloudflared tunnel --url http://localhost:1234`,
        baton_app: `Endpoint URL: https://xxx.trycloudflare.com/v1\\nAuth Type: None`
      }
    },
    {
      name: 'vLLM',
      desc: 'High-throughput and memory-efficient serving engine for production.',
      code: {
        bash: `# 1. Start vLLM OpenAI-compatible server\\npython -m vllm.entrypoints.openai.api_server --model meta-llama/Llama-3-8b --port 8000\\n\\n# 2. Expose via tunnel\\ncloudflared tunnel --url http://localhost:8000`,
      }
    },
    {
      name: 'Llama.cpp',
      desc: 'The core C++ engine for running GGUF models on consumer hardware.',
      code: {
        bash: `# 1. Start Llama.cpp server\\n./server -m models/llama3.gguf --port 8080 --host 0.0.0.0\\n\\n# 2. Expose via tunnel\\ncloudflared tunnel --url http://localhost:8080`,
      }
    },
    {
      name: 'LocalAI',
      desc: 'Complete drop-in replacement REST API for OpenAI.',
      code: {
        bash: `# 1. Start LocalAI docker\\ndocker run -p 8080:8080 localai/localai:latest-cpu\\n\\n# 2. Expose via tunnel\\ncloudflared tunnel --url http://localhost:8080`,
      }
    },
    {
      name: 'AutoGen',
      desc: 'Microsoft\\'s framework for building complex multi-agent conversations.',
      code: {
        python: `from autogpt import AutoGPT\\nfrom baton import BatonRouter\\n\\nrouter = BatonRouter()\\nrouter.register_agent("autogpt", AutoGPT.listen_http(port=5000))\\nrouter.start()`,
        bash: `docker run -d -p 5000:5000 autogpt-baton-bridge`
      }
    },
    {
      name: 'CrewAI',
      desc: 'Role-playing multi-agent framework for delegating autonomous tasks.',
      code: {
        python: `# CrewAI Baton Adapter\\nfrom crewai import Crew\\nfrom baton.adapters import CrewAdapter\\n\\nmy_crew = Crew(agents=[researcher, writer], tasks=[task1])\\nrouter.register(CrewAdapter(my_crew, port=8080))`
      }
    },
    {
      name: 'LangChain / LangGraph',
      desc: 'The industry standard for building robust RAG and agentic workflows.',
      code: {
        python: `# LangGraph Baton Adapter\\nfrom baton.adapters import LangGraphAdapter\\n\\napp = workflow.compile()\\nrouter.register(LangGraphAdapter(app, port=8080))`
      }
    },
    {
      name: 'Hugging Face TGI',
      desc: 'Text Generation Inference toolkit for deploying massive models.',
      code: {
        bash: `# 1. Start TGI Docker\\ndocker run -p 8080:80 ghcr.io/huggingface/text-generation-inference\\n\\n# 2. Expose via tunnel\\ncloudflared tunnel --url http://localhost:8080`,
      }
    },
    {
      name: 'GPT4All / Jan',
      desc: 'Privacy-first desktop clients with built-in API routing capabilities.',
      code: {
        bash: `# 1. Enable API Server in Settings (port 4891 for GPT4All, 1337 for Jan)\\n# 2. Expose via tunnel\\ncloudflared tunnel --url http://localhost:1337`,
      }
    }
  ];
"""

# Insert top10_array after autoGptCode
content = re.sub(r'(const autoGptCode = \{.*?\n  \};\n)', r'\1' + top10_array, content, flags=re.DOTALL)

# Replace the Top 10 Compatible Harnesses and existing harness docs sections
new_rendering = """      {/* ── Baton Native SDK Bridges ────────────────────────────── */}
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

      {/* ── Top 10 Compatible Harnesses ─────────────────────────── */}
      <div className="section-header" style={{ marginTop: '4rem', marginBottom: '2rem' }}>
        <h1 className="section-title" style={{ fontSize: '2.5rem', background: 'linear-gradient(90deg, #fff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          World's Top 10 Supported Harnesses
        </h1>
        <p className="section-subtitle" style={{ maxWidth: '800px' }}>
          Baton's routing architecture is completely agnostic. It acts as a drop-in mobile proxy for the world's most powerful open-source AI frameworks.
        </p>
      </div>
      
      {top10Harnesses.map((harness, i) => (
        <div className="z-block" key={harness.name}>
          <div className="z-text">
            <div>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.8rem', marginBottom: '0.5rem', marginTop: 0 }}>
                <span style={{ color: '#a78bfa', fontWeight: 'bold' }}>#{i + 1}</span>
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
"""

# We replace everything from {/* ── Top 10 Compatible Harnesses ─────────────────────────── */} to the end of the file (before the last `);`)
content = re.sub(r'\{/\* ── Top 10 Compatible Harnesses ─────────────────────────── \*/\}.*?(?=\s*\);\n\})', new_rendering, content, flags=re.DOTALL)

with open("src/pages/LocalHarnesses.jsx", "w", encoding="utf-8") as f:
    f.write(content)
