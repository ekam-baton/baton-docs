import React from 'react';
import CodeTabs from '../components/CodeTabs';

export default function LocalHarnesses() {
  const openClawCode = {
    rust: `// OpenClaw Integration
let openclaw = OpenClawAdapter::new("http://localhost:8080/v1");
router.register(openclaw);`,
    python: `# OpenClaw Python Bridge
from baton import OpenClaw
claw = OpenClaw(endpoint="http://localhost:8080/v1")
claw.connect()`,
    go: `// OpenClaw Go Bridge
import "github.com/baton-router/sdk-go"

claw := baton.NewOpenClaw("http://localhost:8080/v1")
err := claw.Connect()`,
    swift: `// BATON iOS SDK
import BatonKit

let claw = OpenClaw(endpoint: "http://localhost:8080/v1")
Task {
    await claw.connect()
    let response = try await claw.chat("Hello local model!")
}`,
    curl: `curl -X POST http://localhost:8080/v1/agent \\
  -H "Content-Type: application/json" \\
  -d '{"model": "llama-3-8b-local", "messages": []}'`
  };

  const nemoClawCode = {
    rust: `// NemoClaw Secure Sandbox
let secure_nemo = NemoClawAdapter::with_sandbox(
    SandboxConfig::strict()
        .allow_network(false)
        .allow_fs_read("/app/data")
);
router.register(secure_nemo);`,
    go: `// NemoClaw Secure Sandbox (Go)
sandbox := baton.NewSandboxConfig().
    AllowNetwork(false).
    AllowFSRead("/app/data")
secureNemo := baton.NewNemoClawAdapter(sandbox)`,
    bash: `# Launch NemoClaw with Seccomp Profile
nemoclaw start --profile strict-sandbox.json`,
    swift: `// iOS Sandbox config
let sandbox = SandboxConfig.strict()
    .allowNetwork(false)
    .allowFSRead("/app/data")
let secureNemo = NemoClawAdapter(sandbox: sandbox)`
  };

  const autoGptCode = {
    python: `# AutoGPT HTTP Bridge
from autogpt import AutoGPT
from baton import BatonRouter

router = BatonRouter()
router.register_agent("autogpt", AutoGPT.listen_http(port=5000))
router.start()`,
    go: `// AutoGPT Bridge via Go
router := baton.NewBatonRouter()
router.RegisterAgent("autogpt", baton.AutoGPTListenHTTP(5000))
router.Start()`,
    bash: `# Start AutoGPT Docker bridge
docker run -d -p 5000:5000 autogpt-baton-bridge`,
    swift: `// AutoGPT Bridge via iOS
let router = BatonRouter()
router.registerAgent("autogpt", AutoGPT.listenHTTP(port: 5000))
router.start()`
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="section-header">
        <h1 className="section-title">Local Harnesses</h1>
        <p className="section-subtitle">
          Deploy raw messaging pipes via OpenClaw, or enforce strict execution boundaries with NemoClaw's seccomp-secured OpenShell sandbox. Total privacy, absolute control.
        </p>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div >
            <h2>OpenClaw Integration</h2>
            <p>OpenClaw provides raw, unrestricted messaging capabilities for local agents running directly on your hardware.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={openClawCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div >
            <h2>NemoClaw Sandbox</h2>
            <p>NemoClaw wraps your agents in a strict seccomp-bpf sandbox, preventing network exfiltration and restricting filesystem access.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={nemoClawCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div >
            <h2>AutoGPT Bridge</h2>
            <p>Connect your existing AutoGPT instances to the BATON router using the HTTP bridge, allowing it to delegate tasks to other agents.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={autoGptCode} />
        </div>
      </div>
    </div>
  );
}


