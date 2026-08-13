import React from 'react';
import { Mail } from 'lucide-react';
import { FaDiscord, FaGithub } from 'react-icons/fa';

export default function Community() {
  return (
    <div className="page-wrapper animate-fade-in" style={{ paddingTop: '4rem' }}>
      <div className="section-header">
        <h1>Community & Engineering Support</h1>
        <p>
          Collaborate with the BATON maintainer community, share custom Model Context Protocol agents, and receive direct architecture guidance.
        </p>
      </div>

      <div className="bento-grid">
        <div className="bento-card span-6">
          <FaDiscord className="card-icon" />
          <h3>Discord Community</h3>
          <p>
            Connect with sovereign AI developers, exchange MCP configuration recipes, and troubleshoot your local LLM setup.
          </p>
          <div style={{ marginTop: '1.5rem' }}>
            <a href="https://discord.gg/wMKg8CMd" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ width: 'fit-content' }}>
              Join Discord Server
            </a>
          </div>
        </div>

        <div className="bento-card span-6">
          <FaGithub className="card-icon" />
          <h3>GitHub Discussions & Issues</h3>
          <p>
            Submit bug reports, review pull requests, and contribute to the open-source client and connector ecosystem.
          </p>
          <div style={{ marginTop: '1.5rem' }}>
            <a href="https://github.com/ekam-baton" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ width: 'fit-content' }}>
              Open GitHub Discussions
            </a>
          </div>
        </div>

        <div className="bento-card span-12">
          <Mail className="card-icon" />
          <h3>Direct Maintainer Contact</h3>
          <p style={{ maxWidth: '750px', marginBottom: '1rem' }}>
            For enterprise deployment queries, security vulnerability reports, or bespoke integration inquiries, reach out directly to the core engineering maintainers:
          </p>
          <a href="mailto:ekam.baton@gmail.com" className="btn-primary" style={{ width: 'fit-content' }}>
            Email ekam.baton@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
