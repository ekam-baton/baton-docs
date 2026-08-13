import React from 'react';

export default function Enterprise() {
  return (
    <div className="animate-fade-in inner-page">
      <h1>Enterprise</h1>
      <p className="page-intro">
        Deploy BATON inside your own infrastructure so employee prompts never leave your network.
      </p>

      <h2>The problem for IT teams</h2>
      <p>
        When employees use cloud AI services, every prompt — including proprietary code, client
        data, and internal strategy — travels to a third-party server. IT has no visibility,
        no control, and no guarantee about data retention. BATON gives you a different option:
        route all AI traffic through infrastructure you own.
      </p>

      <h2>How it works</h2>
      <p>
        You deploy the BATON connector as a Docker container inside your VPC. Employees install
        the mobile app and pair with the corporate connector using MDM-distributed configuration
        profiles. All traffic between phones and the connector is end-to-end encrypted. The
        connector proxies requests to your chosen AI backends — whether that's a self-hosted
        vLLM cluster, Azure OpenAI, Anthropic via AWS, or Google Vertex AI.
      </p>
      <p>
        Employees get a fast, native mobile AI chat experience. IT keeps full control over
        which models are available, which tools can be executed, and who has access.
      </p>

      <h2>Supported backends</h2>
      <ul>
        <li><strong>Self-hosted models:</strong> vLLM, TensorRT-LLM, Ollama, or any OpenAI-compatible HTTP endpoint running on your GPU servers.</li>
        <li><strong>Azure OpenAI Service:</strong> Connect to dedicated <code>*.openai.azure.com</code> deployments over private VNets.</li>
        <li><strong>Anthropic (Claude):</strong> Proxy through AWS API Gateway and private VPC endpoints.</li>
        <li><strong>Google Vertex AI:</strong> Authenticated routing to Cloud Run endpoints via service account credentials.</li>
      </ul>

      <h2>Device provisioning</h2>
      <p>
        Distribute pre-authenticated connection profiles to employee devices using standard MDM
        deep links and AppConfig. No manual QR scanning required for managed deployments.
        Device certificates can be rotated through your existing certificate management infrastructure.
      </p>

      <h2>Compliance and audit</h2>
      <p>
        Every conversation generates a cryptographic audit trail stored within your corporate
        infrastructure. The Merkle tree hash chain satisfies ISO/IEC 27037 evidence handling
        requirements. Export audit packages to your SIEM or data warehouse for compliance reviews.
      </p>
      <p>
        MCP tool permissions can be scoped by user role, ensuring that sensitive tools
        (database queries, file system access) are only available to authorized personnel.
      </p>

      <h2>Deployment</h2>
      <p>
        The connector runs as a single Docker container. Here's a minimal configuration:
      </p>
      <div className="z-code">
        <div className="code-header">
          <span>docker-compose.yml</span>
        </div>
        <pre><code>{`version: '3.8'

services:
  baton-hub:
    image: ghcr.io/ekam-baton/baton-hub:latest
    restart: always
    environment:
      - PORT=3000
      - DATABASE_URL=sqlite:///data/baton.db
      - RELAY_URL=wss://relay.baton.network
      - MCP_AGENT_DEFAULT_CMD=python3
      - MCP_AGENT_DEFAULT_ARGS=/opt/agents/main.py
    volumes:
      - ./data:/data
    ports:
      - "127.0.0.1:3000:3000"`}</code></pre>
      </div>

      <p>
        For questions about enterprise licensing, custom deployments, or security assessments,
        reach out at <a href="mailto:ekam.baton@gmail.com">ekam.baton@gmail.com</a>.
      </p>
    </div>
  );
}
