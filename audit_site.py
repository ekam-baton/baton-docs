import os

# 1. Delete hallucinated pages
files_to_delete = [
    "src/pages/A2A.jsx",
    "src/pages/Workspaces.jsx",
    "src/pages/Frameworks.jsx"
]
for f in files_to_delete:
    if os.path.exists(f):
        os.remove(f)

# 2. Rewrite AdaptersGuide.jsx (Real Webhook Adapters)
adapters_content = """import React, { useState } from 'react';
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
"""

# 3. Rewrite Home.jsx (Real features)
home_content = """import React from 'react';
import { Layers, Zap, Lock, Cpu, Globe2, Link, Shield } from 'lucide-react';
import RoutingNexus from '../components/RoutingNexus';
import Starfield from '../components/Starfield';

export default function Home() {
  return (
    <div className="animate-fade-in" style={{ position: 'relative' }}>
      
      {/* Interactive Universe Background */}
      <Starfield />

      {/* Hero Section */}
      <div className="hero-section" style={{ position: 'relative', zIndex: 1, minHeight: '100vh', paddingTop: '80px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="hero-content" style={{ flex: '1 1 500px', zIndex: 10 }}>
          <h1 className="hero-title" style={{ textAlign: 'left', textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>The Universal Mobile Router for AI.</h1>
          <p className="hero-subtitle" style={{ margin: '0 0 3rem', textAlign: 'left', textShadow: '0 5px 15px rgba(0,0,0,0.8)' }}>
            BATON is a highly secure, local-first Android client. Connect to your local AI agents, custom webhooks, or cloud endpoints using encrypted tunnels—all without storing your API keys in the cloud.
          </p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a href="#" className="store-badge">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" style={{ height: '48px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }} />
            </a>
          </div>
        </div>
        
        <div className="hero-mockup-container" style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <RoutingNexus />
        </div>
      </div>

      {/* Feature Grid */}
      <div className="page-wrapper" style={{ position: 'relative', zIndex: 1, background: 'linear-gradient(to bottom, rgba(2,6,23,0) 0%, var(--bg-dark) 200px)', paddingTop: '8rem' }}>
        <div className="bento-grid">
          <div className="bento-card span-8">
            <Globe2 className="card-icon" />
            <h3>Zero-Trust Mobile Routing</h3>
            <p style={{ fontSize: '1.1rem' }}>
              BATON is a pure client. It acts as the universal bridge between your phone and your autonomous systems, never logging your chat data on external servers.
            </p>
          </div>
          
          <div className="bento-card span-4">
            <Shield className="card-icon" />
            <h3>Firebase Auth</h3>
            <p>Secure identity management powered by Firebase Authentication, ensuring only authorized users can access your configured agents.</p>
          </div>

          <div className="bento-card span-3">
            <Lock className="card-icon" />
            <h3>SQLCipher</h3>
            <p>All of your agent configurations, API keys, and chat histories are locally encrypted on your Android device using SQLCipher 256-bit AES encryption.</p>
          </div>

          <div className="bento-card span-3">
            <Link className="card-icon" />
            <h3>Deep Link Provisioning</h3>
            <p>Distribute agent configurations to your team instantly. A simple tap on a Baton deep-link securely configures endpoints and auth types inside the app.</p>
          </div>

          <div className="bento-card span-3">
            <Zap className="card-icon" />
            <h3>Cloudflare & Ngrok</h3>
            <p>Natively designed to work with secure tunneling tools, letting you expose local LLMs to your phone without opening ports on your home router.</p>
          </div>

          <div className="bento-card span-3">
            <Layers className="card-icon" />
            <h3>Strict Network Security</h3>
            <p>The Android app implements strict Network Security Configurations, enforcing HTTPS, blocking cleartext traffic, and providing hooks for certificate pinning.</p>
          </div>

          <div className="bento-card span-12" style={{ textAlign: 'center', padding: '4rem 2rem', background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 70%), var(--bg-card)' }}>
            <Cpu className="card-icon" style={{ margin: '0 auto 1.5rem', width: '48px', height: '48px' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Enterprise Architecture. Local Control.</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.15rem', color: 'var(--text-muted)' }}>
              BATON doesn't lock you into a vendor ecosystem. It gives you an enterprise-grade mobile interface, complete with Fake Billing flows and API Key management, to control the custom AI endpoints you build on your own hardware.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
"""

# 4. Rewrite Integrations.jsx (Real integrations via HTTP)
integrations_content = """import React from 'react';
import { Blocks, Workflow, Server, CloudCog } from 'lucide-react';

export default function Integrations() {
  return (
    <div className="page-wrapper animate-fade-in">
      <div className="section-header">
        <h1 className="section-title">
          <Blocks className="title-icon" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '1rem' }} /> 
          Connect to Anything
        </h1>
        <p className="section-subtitle">
          Because the Baton Android App functions as an HTTP client, you can connect it to any platform that accepts webhooks or REST API POST requests.
        </p>
      </div>

      <div className="bento-grid">
        <div className="bento-card span-6">
          <Workflow className="card-icon" />
          <h3>No-Code Workflow Automations</h3>
          <p>Instantly trigger complex workflows across thousands of apps by pasting a Webhook URL into the Baton app.</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Make.com & Zapier:</strong> Point BATON to a "Catch Hook" to pass mobile text input directly into your automated pipelines.</li>
            <li><strong>n8n:</strong> Highly popular open-source workflow automation. Simply set up an HTTP Webhook trigger.</li>
          </ul>
        </div>

        <div className="bento-card span-6">
          <Server className="card-icon" />
          <h3>Custom AI Backends</h3>
          <p>Build your own custom AI server and use Baton as your zero-trust mobile UI.</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
            <li style={{ marginBottom: '0.5rem' }}>Deploy a custom Node.js or Python backend on AWS, Linode, or Hetzner.</li>
            <li>Point the app directly to an OpenAI-compatible server running locally on your hardware.</li>
          </ul>
        </div>

        <div className="bento-card span-12">
          <CloudCog className="card-icon" />
          <h3>Cloud Serverless Functions</h3>
          <p>You don't need a heavy server. Write a tiny cloud function that receives Baton's message, performs logic, and replies.</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
            <li><strong>Cloudflare Workers, AWS Lambda, Vercel:</strong> Build highly scalable endpoints without managing infrastructure. Paste the endpoint URL into the Baton app and add your API key.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
"""

# 5. Update App.jsx and TopNav.jsx (Remove hallucinated routes)
app_content = """import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import PersonalAgents from './pages/PersonalAgents';
import RoutingTunnels from './pages/RoutingTunnels';
import AdaptersGuide from './pages/AdaptersGuide';
import Integrations from './pages/Integrations';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Changelog from './pages/Changelog';
import Community from './pages/Community';

function App() {
  return (
    <div className="app-container">
      <TopNav />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/agents" element={<PersonalAgents />} />
          <Route path="/routing" element={<RoutingTunnels />} />
          <Route path="/adapters" element={<AdaptersGuide />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
"""

topnav_content = """import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import batonLogo from '../assets/baton-logo.jpg';

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`top-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          <img src={batonLogo} alt="BATON Logo" className="logo-img" style={{ borderRadius: '15%' }} />
          <span className="logo-text">BATON</span>
        </NavLink>

        <nav className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
          <NavLink to="/agents" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Personal Agents</NavLink>
          <NavLink to="/routing" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Routing & Tunnels</NavLink>
          <NavLink to="/adapters" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Build an Adapter</NavLink>
          <NavLink to="/integrations" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Integrations</NavLink>
        </nav>

        <div className="nav-actions">
          <a href="https://github.com/ekam-baton" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>View on GitHub</button>
          </a>
          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
"""

with open("src/pages/AdaptersGuide.jsx", "w", encoding="utf-8") as f:
    f.write(adapters_content)
with open("src/pages/Home.jsx", "w", encoding="utf-8") as f:
    f.write(home_content)
with open("src/pages/Integrations.jsx", "w", encoding="utf-8") as f:
    f.write(integrations_content)
with open("src/App.jsx", "w", encoding="utf-8") as f:
    f.write(app_content)
with open("src/components/TopNav.jsx", "w", encoding="utf-8") as f:
    f.write(topnav_content)
