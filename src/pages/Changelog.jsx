import React from 'react';
import { GitCommit, Sparkles, PhoneCall } from 'lucide-react';

export default function Changelog() {
  return (
    <div className="page-wrapper animate-fade-in">
      <div className="section-header">
        <h1 className="section-title">Changelog & Roadmap</h1>
        <p className="section-subtitle">
          Track the evolution of the BATON Universal Router. From initial mobile chat interfaces to future integrations with physical household robotics.
        </p>
      </div>

      <div className="z-block" style={{ gridTemplateColumns: '1fr', gap: '2rem' }}>
        <div className="bento-card" style={{ borderLeft: '4px solid #3b82f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <PhoneCall className="card-icon" style={{ margin: 0 }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Phase 2: Natural Language Calling</h2>
            <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', padding: '0.2rem 0.8rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600 }}>UPCOMING</span>
          </div>
          <p style={{ color: 'var(--text-muted)' }}>
            In the upcoming phase, BATON will introduce native <strong>calling features</strong>. Users will be able to literally dial up their household physical robots and converse with them in real-time using advanced voice synthesis, bypassing the text interface entirely.
          </p>
        </div>

        <div className="bento-card" style={{ borderLeft: '4px solid #27c93f' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Sparkles className="card-icon" style={{ margin: 0, color: '#27c93f' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>v1.0.0: The Universal Layer</h2>
            <span style={{ background: 'rgba(39, 201, 63, 0.2)', color: '#27c93f', padding: '0.2rem 0.8rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600 }}>CURRENT</span>
          </div>
          <p style={{ color: 'var(--text-muted)' }}>
            Initial release of the BATON mobile application.
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
            <li>Introduced strict NemoClaw sandboxing for untrusted agent execution.</li>
            <li>Native support for Model Context Protocol (MCP) tool tunneling.</li>
            <li>Zero-latency WebSocket routing for dense RAG pipelines.</li>
            <li>Official support for AWS Bedrock, Azure OpenAI, and Google AI Studio.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
