import React from 'react';
import { LifeBuoy } from 'lucide-react';
import { FaDiscord, FaGithub } from 'react-icons/fa';

export default function Community() {
  return (
    <div className="page-wrapper animate-fade-in" style={{ paddingTop: '6rem' }}>
      <div className="section-header">
        <h1>Community & Support</h1>
        <p>
          Ask questions, share your MCP agents, and follow development on Discord and GitHub.
        </p>
      </div>

      <div className="bento-grid">
        <div className="bento-card span-6">
          <FaDiscord className="card-icon" />
          <h3>Discord Server</h3>
          <p>
            Join our official Discord server to chat with the core engineering team, share your custom MCP tools, and get real-time help setting up your local AI environments.
          </p>
          <a href="https://discord.gg/wMKg8CMd" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ marginTop: '1.5rem', width: 'fit-content' }}>Join Discord</button>
          </a>
        </div>

        <div className="bento-card span-6">
          <FaGithub className="card-icon" />
          <h3>GitHub Discussions</h3>
          <p>
            Encountered a bug or want to request a new feature? Head over to our GitHub Discussions to participate in architecture proposals and open-source development.
          </p>
          <a href="https://github.com/ekam-baton" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ marginTop: '1.5rem', width: 'fit-content', background: '#333', boxShadow: 'none' }}>View GitHub</button>
          </a>
        </div>

        <div className="bento-card span-12">
          <LifeBuoy className="card-icon" />
          <h3>Enterprise Support</h3>
          <p style={{ maxWidth: '800px' }}>
            Need help deploying the Baton Connector on a VPS or setting up team access? Reach out via GitHub Discussions or Discord — we respond to every message.
          </p>
        </div>
      </div>
    </div>
  );
}
