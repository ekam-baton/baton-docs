import React from 'react';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { Mail } from 'lucide-react';

export default function Community() {
  return (
    <div className="animate-fade-in inner-page">
      <h1>Community</h1>
      <p className="page-intro">
        Get help, share what you've built, or contribute to the project.
      </p>

      <div className="community-links">
        <a href="https://discord.gg/wMKg8CMd" target="_blank" rel="noopener noreferrer" className="community-link">
          <FaDiscord size={22} className="community-link-icon" />
          <div>
            <h3>Discord</h3>
            <p>
              Chat with other users, ask setup questions, and share MCP tools you've built.
            </p>
          </div>
        </a>

        <a href="https://github.com/ekam-baton" target="_blank" rel="noopener noreferrer" className="community-link">
          <FaGithub size={22} className="community-link-icon" />
          <div>
            <h3>GitHub</h3>
            <p>
              Browse the source code, file bug reports, and open pull requests.
              The connector and relay are Apache 2.0 licensed.
            </p>
          </div>
        </a>

        <a href="mailto:ekam.baton@gmail.com" className="community-link">
          <Mail size={22} className="community-link-icon" />
          <div>
            <h3>Email</h3>
            <p>
              For enterprise inquiries, security reports, or anything that doesn't fit in a GitHub issue.
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}
