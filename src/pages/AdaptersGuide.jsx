import React, { useState } from 'react';
import { Server, ArrowRight, ShieldCheck, Code, Box, Smartphone } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

export default function AdaptersGuide() {
  const [activeTab, setActiveTab] = useState('nodejs');

  return (
    <div className="animate-fade-in page-wrapper">
      <div className="section-header">
        <h1>Building Custom Adapters</h1>
        <p>Learn how to build a custom backend server to receive messages from the Baton Android app.</p>
      </div>

      <div className="bento-grid">
        <div className="bento-card span-12" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 300px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>How Baton Communicates</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                The Baton Android app is essentially a highly secure, local-first HTTP client. When you send a message in the app, Baton sends a standard <code>POST</code> request containing the chat history to your configured Endpoint URL.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                An "Adapter" is simply any web server (Node.js, Python, Rust) that you run on your machine or in the cloud. It receives this POST request, processes it (e.g., calls the OpenAI API or a local model), and returns the response back to your phone.
              </p>
            </div>
            <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem', background: 'var(--bg-card)', borderRadius: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.75rem' }}>
                <Smartphone className="card-icon" style={{ margin: 0, color: 'var(--accent-blue)' }} />
                <div>
                  <h4 style={{ margin: '0 0 0.25rem' }}>Baton Android App</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Sends POST request with JSON chat history.</p>
                </div>
              </div>
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                <ArrowRight size={20} style={{ transform: 'rotate(90deg)' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255, 159, 10, 0.1)', borderRadius: '0.75rem' }}>
                <Server className="card-icon" style={{ margin: 0, color: '#ff9f0a' }} />
                <div>
                  <h4 style={{ margin: '0 0 0.25rem' }}>Your Custom Adapter Server</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Receives webhook, calls LLM, returns text.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bento-card span-12">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Box className="card-icon" style={{ margin: 0 }} />
            <h3 style={{ margin: 0 }}>Adapter Builder Guide</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Baton expects standard HTTP responses. Below is guidance on how to build a basic adapter in Node.js and Python.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <button 
              className={activeTab === 'nodejs' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setActiveTab('nodejs')}
            >
              Node.js / Express
            </button>
            <button 
              className={activeTab === 'python' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setActiveTab('python')}
            >
              Python / FastAPI
            </button>
          </div>

          <div style={{ display: activeTab === 'nodejs' ? 'block' : 'none' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }}>Node.js Express Adapter</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>A simple Express server that receives Baton's payload and returns a static response.</p>
            <CodeBlock code={`import express from 'express';

const app = express();
app.use(express.json());

// Baton will POST to this endpoint
app.post('/api/chat', async (req, res) => {
  // Baton sends an array of messages
  const messages = req.body.messages;
  
  // Extract the latest message from the user
  const lastMessage = messages[messages.length - 1].content;
  console.log("Received from Baton:", lastMessage);

  // You can implement custom logic here (e.g., query a database, call OpenAI)
  const agentResponse = "Hello from your custom Node.js Adapter! You said: " + lastMessage;

  // Baton expects a standard text or JSON response
  res.json({
    choices: [{
      message: { content: agentResponse }
    }]
  });
});

app.listen(3000, () => console.log('Baton Adapter running on port 3000'));`} language="javascript" />
          </div>

          <div style={{ display: activeTab === 'python' ? 'block' : 'none' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }}>Python FastAPI Adapter</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>A basic Python FastAPI server to route messages.</p>
            <CodeBlock code={`from fastapi import FastAPI, Request
import uvicorn

app = FastAPI()

@app.post("/api/chat")
async def handle_baton_request(request: Request):
    # Parse the incoming JSON from Baton
    data = await request.json()
    messages = data.get("messages", [])
    
    # Get the latest user message
    last_message = messages[-1].get("content", "")
    print(f"Received from Baton: {last_message}")
    
    # Generate your response
    agent_response = f"Hello from Python! You said: {last_message}"
    
    # Return in standard format
    return {
        "choices": [
            {"message": {"content": agent_response}}
        ]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3000)`} language="python" />
          </div>
        </div>
      </div>
    </div>
  );
}
