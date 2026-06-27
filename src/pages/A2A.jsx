import React from 'react';
import CodeTabs from '../components/CodeTabs';

export default function A2A() {
  const delegationCode = {
    rust: `// Rust A2A Handshake
let router = BatonRouter::new();

// Agent 1: Researcher (Gemini)
router.register_agent("researcher", gemini_adapter);

// Agent 2: Writer (Local Llama)
router.register_agent("writer", local_llama);

// Establish A2A Delegation Rule
router.add_route(
    Route::from("researcher")
        .to("writer")
        .when_intent("draft_report")
);`,
    python: `# Python A2A Router
from baton import BatonRouter, Route

router = BatonRouter()
router.register("researcher", gemini)
router.register("writer", llama)

# Allow researcher to delegate writing tasks
router.add_route(Route(source="researcher", target="writer", on_intent="draft_report"))
router.start()`,
    go: `// Go A2A Routing Table
router := baton.NewRouter()
router.Register("researcher", geminiClient)
router.Register("writer", llamaClient)

// Configure A2A permissions
route := baton.NewRoute("researcher", "writer").WhenIntent("draft_report")
router.AddRoute(route)`,
    swift: `// Swift A2A Orchestration
let router = BatonRouter()
router.register(agent: "researcher", adapter: gemini)
router.register(agent: "writer", adapter: llama)

// Set up delegation rules
let route = Route(from: "researcher", to: "writer", condition: .intent("draft_report"))
router.add(route)`
  };

  const mcpCode = {
    rust: `// Expose internal tools via MCP
let mcp_server = MCPServer::new();
mcp_server.add_tool("query_database", db_query_fn);

// Attach MCP context to an agent
router.attach_mcp("researcher", mcp_server);`,
    python: `# Python MCP Context
from baton.mcp import MCPServer

mcp = MCPServer()
mcp.register_tool("query_database", db_query)

router.attach_mcp("researcher", mcp)`,
    go: `// Go MCP Configuration
mcp := baton.NewMCPServer()
mcp.AddTool("query_database", dbQueryFunc)

router.AttachMCP("researcher", mcp)`,
    swift: `// Swift MCP Tools
let mcp = MCPServer()
mcp.addTool(name: "query_database", action: dbQuery)

router.attachMCP(agent: "researcher", context: mcp)`
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="section-header">
        <h1 className="section-title">A2A & MCP Infrastructure</h1>
        <p className="section-subtitle">
          BATON is not just a human-facing chat app. At its core, it is a high-performance <strong>Agent-to-Agent (A2A)</strong> orchestration layer built natively on the <strong>Model Context Protocol (MCP)</strong>. 
        </p>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div >
            <h2 style={{ marginTop: 0 }}>Agent Delegation Handshakes</h2>
            <p>Define strict routing tables to control how agents communicate with each other. In this example, a massive cloud model (Gemini) acts as a researcher, and delegates the final writing task to a local, private model (Llama 3).</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={delegationCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div >
            <h2>Model Context Protocol (MCP)</h2>
            <p>Agents in the BATON ecosystem share tools and state via the standardized Model Context Protocol. You can expose internal databases, APIs, or filesystem operations as MCP tools, and attach them to specific agents.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={mcpCode} />
        </div>
      </div>
    </div>
  );
}


