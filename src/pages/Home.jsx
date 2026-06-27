import React from 'react';
import { Layers, Zap, Lock, Cpu, Globe2, Activity } from 'lucide-react';

export default function Home() {
  return (
    <div className="animate-fade-in">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title" style={{ textAlign: 'left' }}>The Universal Way to<br />Talk to Agents & Robots.</h1>
          <p className="hero-subtitle" style={{ margin: '0 0 3rem', textAlign: 'left' }}>
            Whether you're chatting with a cloud model, orchestrating local multi-agent teams, or preparing for the future of household robots, BATON is the definitive natural-language communication platform.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" className="store-badge">
              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" style={{ height: '48px' }} />
            </a>
            <a href="#" className="store-badge">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" style={{ height: '48px' }} />
            </a>
          </div>
        </div>
        <div className="hero-mockup-container" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-11rem' }}>
          <div className="glow-effect" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', height: '400px', background: 'var(--accent-glow)', filter: 'blur(80px)', borderRadius: '50%', zIndex: -1 }}></div>
          
          <div className="universe-border-wrapper">
            <img src="/baton_phones_staggered.png" alt="BATON Staggered Interface Mockup" className="hero-mockup" />
          </div>
        </div>
      </div>

      <div className="page-wrapper" style={{ paddingTop: 0 }}>
        <div className="bento-grid">
          <div className="bento-card span-8">
            <Globe2 className="card-icon" />
            <h3>The Communication Layer of the Future</h3>
            <p style={{ fontSize: '1.1rem' }}>
              BATON is built to be the universal bridge between humans and autonomous systems. 
              Today, you use it for high-performance text and voice chats with digital agents. 
              Tomorrow, you will simply dial up your household physical robots through BATON to talk to them in natural language.
            </p>
          </div>
          
          <div className="bento-card span-4">
            <Zap className="card-icon" />
            <h3>Zero Latency</h3>
            <p>Built for extremely dense RAG pipelines and real-time voice synthesis with continuous streaming WebSockets.</p>
          </div>

          <div className="bento-card span-4">
            <Lock className="card-icon" />
            <h3>NemoClaw Sandbox</h3>
            <p>Strict Seccomp-BPF execution boundaries. Keep your autonomous agents entirely fenced off from your sensitive filesystem and network data.</p>
          </div>

          <div className="bento-card span-4">
            <Layers className="card-icon" />
            <h3>MCP Native</h3>
            <p>Built from day one to support the Model Context Protocol. Expose internal databases and bespoke APIs to agents effortlessly.</p>
          </div>

          <div className="bento-card span-4">
            <Activity className="card-icon" />
            <h3>Agent-to-Agent (A2A)</h3>
            <p>Configure advanced handshakes. Watch as your Researcher agents securely delegate complex tasks to Code-Writer agents in real-time.</p>
          </div>

          <div className="bento-card span-12" style={{ textAlign: 'center', padding: '4rem 2rem', background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 70%), var(--bg-card)' }}>
            <Cpu className="card-icon" style={{ margin: '0 auto 1.5rem', width: '48px', height: '48px' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Your Systems. Your Hardware.</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.15rem', color: 'var(--text-muted)' }}>
              BATON doesn't lock you into a single cloud ecosystem. Run Anthropic via Bedrock, scale on Azure OpenAI, or spin up Llama 3 entirely locally. The interface remains gorgeous, the routing remains flawless.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


