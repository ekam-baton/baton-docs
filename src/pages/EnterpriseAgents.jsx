import React from 'react';
import CodeTabs from '../components/CodeTabs';
import { Building2, ShieldCheck, Network } from 'lucide-react';

export default function EnterpriseAgents() {
  const claudeCode = {
    typescript: `// AWS Lambda Adapter for Claude Enterprise
import { Anthropic } from '@anthropic-ai/sdk';
import { BatonStream } from '@baton/lambda-utils'; // Theoretical helper

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // Stored in AWS Secrets Manager
});

export const handler = async (event) => {
  const { messages } = JSON.parse(event.body);
  
  // Transform Baton messages to Anthropic format
  const anthropicMessages = messages.map(m => ({
    role: m.role,
    content: m.content
  }));

  const stream = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20240620',
    max_tokens: 1024,
    messages: anthropicMessages,
    stream: true,
  });

  return BatonStream.respond(stream); 
  // API Gateway proxies the SSE stream to the Baton App
};`
  };

  const openaiCode = {
    python: `# FastAPI Adapter for Azure OpenAI Codex
import os
from openai import AzureOpenAI
from fastapi import FastAPI
from fastapi.responses import StreamingResponse

app = FastAPI()

client = AzureOpenAI(
  azure_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT"), 
  api_key=os.getenv("AZURE_OPENAI_API_KEY"),  
  api_version="2024-02-15-preview"
)

@app.post("/chat")
async def chat_endpoint(request: dict):
    # Stream directly from your dedicated Azure instance
    response = client.chat.completions.create(
        model="gpt-4",
        messages=request["messages"],
        stream=True
    )
    
    def generate():
        for chunk in response:
            if chunk.choices[0].delta.content is not None:
                yield f"data: {{\\"content\\": \\"{chunk.choices[0].delta.content}\\"}}\\n\\n"
        yield "data: [DONE]\\n\\n"

    return StreamingResponse(generate(), media_type="text/event-stream")`
  };

  const geminiCode = {
    typescript: `// Cloud Run Adapter for Gemini Enterprise / Vertex AI
import { VertexAI } from '@google-cloud/vertexai';
import express from 'express';

const app = express();
app.use(express.json());

// Initialize Vertex with your Google Workspace Service Account
const vertex_ai = new VertexAI({
    project: 'your-corporate-gcp-project', 
    location: 'us-central1'
});
const model = vertex_ai.preview.getGenerativeModel({
    model: 'gemini-1.5-pro'
});

app.post('/api/chat', async (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/event-stream' });
    
    const streamingResp = await model.generateContentStream({
        contents: req.body.messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{text: m.content}]
        }))
    });

    for await (const item of streamingResp.stream) {
        res.write(\`data: {"content": "\${item.candidates[0].content.parts[0].text}"}\\n\\n\`);
    }
    res.write('data: [DONE]\\n\\n');
    res.end();
});

app.listen(8080);`
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="section-header">
        <h1 className="section-title" style={{ fontSize: '2.5rem' }}>
          <Building2 className="title-icon" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '1rem', color: 'var(--accent-blue)' }} /> 
          Enterprise Workspaces
        </h1>
        <p className="section-subtitle" style={{ maxWidth: '800px' }}>
          Securely interface with your organization's managed AI environments. BATON acts as a zero-trust mobile endpoint for corporate VPCs and dedicated instances.
        </p>
      </div>

      <div className="bento-grid" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <div className="bento-card span-12" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 300px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Zero-Trust Architecture</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                Enterprise AI environments (like Azure OpenAI or Claude Enterprise) are typically restricted to internal corporate networks to protect intellectual property.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                BATON never routes data through a third-party cloud. To connect to your corporate AI, simply join your mobile device to your corporate VPN (e.g., <strong>Tailscale</strong>, <strong>GlobalProtect</strong>, or <strong>Cisco AnyConnect</strong>). BATON will hit your internal API Gateway securely, keeping all traffic within your VPC.
              </p>
            </div>
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <ShieldCheck style={{ color: '#10b981', flexShrink: 0, marginTop: '4px' }} />
                <div>
                  <h4 style={{ margin: '0 0 0.5rem' }}>Hardware-Backed Keys</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Store corporate API gateway keys safely in the Android Keystore. They never leave the device.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Network style={{ color: '#3b82f6', flexShrink: 0, marginTop: '4px' }} />
                <div>
                  <h4 style={{ margin: '0 0 0.5rem' }}>VPC Integration</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Route HTTP traffic through your authorized corporate VPN client on your mobile device.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>Claude for Enterprise</h2>
            <p>Deploy a lightweight AWS Lambda adapter behind an API Gateway. The Lambda securely proxies your mobile requests to Anthropic's managed endpoints, leveraging your organization's IAM roles for secure API key injection.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={claudeCode} />
        </div>
      </div>
      
      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>Azure OpenAI / Codex</h2>
            <p>For organizations running dedicated Azure OpenAI instances. Spin up an internal FastAPI proxy that validates your corporate headers and streams completions directly from your <code>.openai.azure.com</code> endpoint.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={openaiCode} />
        </div>
      </div>
      
      <div className="z-block">
        <div className="z-text">
          <div>
            <h2>Gemini Enterprise (Vertex AI)</h2>
            <p>Integrate directly with Google Workspace and Google Cloud. Build a Google Cloud Run service authenticated by your GCP Service Accounts. Connect your Baton app to the secure Cloud Run URL to chat with Gemini 1.5 Pro.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={geminiCode} />
        </div>
      </div>

    </div>
  );
}
