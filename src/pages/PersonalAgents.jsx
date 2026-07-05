import React from 'react';
import CodeTabs from '../components/CodeTabs';

export default function PersonalAgents() {
  const ollamaCode = {
    bash: `# Run Ollama locally
ollama run llama3

# Expose securely to Baton
cloudflared tunnel --url http://localhost:11434`
  };

  const lmStudioCode = {
    bash: `# LM Studio Local Inference Server
# 1. Open LM Studio and start the Local Server on port 1234
# 2. Expose it via Ngrok or Cloudflare

ngrok http 1234`
  };

  const langChainCode = {
    python: `# LangChain / LangServe Backend
from fastapi import FastAPI
from langserve import add_routes
from langchain_openai import ChatOpenAI

app = FastAPI()
model = ChatOpenAI(model="gpt-4")

add_routes(app, model, path="/chat")
# Run with uvicorn and expose the endpoint to Baton`
  };

  const crewAiCode = {
    python: `# CrewAI Autonomous Agents
from crewai import Agent, Task, Crew
import json

# Your Flask/Express adapter will trigger this crew
# when Baton sends a POST request.
researcher = Agent(role='Researcher', goal='Find data', backstory='...', verbose=True)
task = Task(description='Research the topic', agent=researcher)

crew = Crew(agents=[researcher], tasks=[task])
result = crew.kickoff()
# Return the result via SSE to Baton`
  };

  const mcpCode = {
    typescript: `// Model Context Protocol (MCP) Server
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({ name: "local-tools", version: "1.0.0" });

// Expose local file system or database access 
// directly to your Baton mobile app through MCP
const transport = new StdioServerTransport();
await server.connect(transport);`
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="section-header">
        <h1 className="section-title" style={{ fontSize: '2.5rem' }}>Personal AI Agents</h1>
        <p className="section-subtitle" style={{ maxWidth: '800px' }}>
          Baton seamlessly proxies the world's most popular open-source LLM runners and agent frameworks, letting you securely interact with your local hardware from anywhere.
        </p>
      </div>

      <div className="z-block" style={{ marginTop: '3rem' }}>
        <div className="z-text">
          <div>
            <h2>Ollama</h2>
            <p>The fastest way to get up and running with large language models locally. By exposing Ollama's local port (11434) via a secure tunnel, Baton can chat directly with your local Llama 3, Mistral, or Phi models.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={ollamaCode} />
        </div>
      </div>
      
      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>LM Studio</h2>
            <p>A powerful desktop GUI for running GGUF models. It features a built-in local inference server that mimics the OpenAI API. Point Baton to its local port to chat with any downloaded model.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={lmStudioCode} />
        </div>
      </div>
      
      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>LangChain & LangGraph</h2>
            <p>Build complex, stateful RAG (Retrieval-Augmented Generation) applications. Wrap your LangChain graph in a FastAPI/LangServe endpoint and connect Baton to converse with your enterprise data.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={langChainCode} />
        </div>
      </div>
      
      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>CrewAI / AutoGen</h2>
            <p>Orchestrate teams of autonomous AI agents. Use Baton as the human-in-the-loop interface. When your Crew requires human feedback or approval, it can send a message to Baton, and you can reply directly from your phone.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={crewAiCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>Model Context Protocol (MCP)</h2>
            <p>The new standard for connecting AI models to data sources and tools. Build an MCP server to securely expose your local SQL database or file system, and use Baton to query it natively from your mobile device.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={mcpCode} />
        </div>
      </div>
    </div>
  );
}
