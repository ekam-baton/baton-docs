import React from 'react';
import CodeTabs from '../components/CodeTabs';

export default function Frameworks() {
  const langchainCode = {
    python: `# LangChain Bridge
from langchain_community.chat_models import ChatBaton
from langchain.schema import HumanMessage

chat = ChatBaton(endpoint="ws://localhost:8080/ws")
chat([HumanMessage(content="Hello BATON!")])`,
    javascript: `// LangChain.js Integration
import { ChatBaton } from "@langchain/baton";

const chat = new ChatBaton({
  endpoint: "ws://localhost:8080/ws"
});
await chat.invoke("Hello BATON!");`,
    go: `// LangChainGo Integration
import "github.com/tmc/langchaingo/llms"

llm, err := baton.NewChat(baton.WithEndpoint("ws://localhost:8080/ws"))
res, err := llm.Call(ctx, "Hello BATON!")`,
    swift: `// LangChain Swift integration
import LangChain

let llm = BatonLLM(endpoint: "ws://localhost:8080/ws")
let response = await llm.predict("Hello BATON!")`
  };

  const crewAiCode = {
    python: `# CrewAI Agent Integration
from crewai import Agent
from baton.crewai import BatonLLM

baton_llm = BatonLLM(model="llama-3-local")

researcher = Agent(
    role='Senior Research Analyst',
    goal='Uncover technological advancements',
    backstory='You work at a leading tech think tank.',
    verbose=True,
    allow_delegation=False,
    llm=baton_llm
)`,
    go: `// CrewAI equivalent via Go Agents
batonLLM := baton.NewLLM("llama-3-local")
researcher := agent.New(
    agent.WithRole("Analyst"),
    agent.WithLLM(batonLLM),
)`,
    swift: `// CrewAI wrapper for iOS
let batonLLM = BatonLLM(model: "llama-3-local")
let researcher = CrewAgent(role: "Analyst", llm: batonLLM)`
  };

  const autoGenCode = {
    python: `# AutoGen Group Chat Bridge
import autogen

config_list = [{
    "model": "baton-router",
    "base_url": "http://localhost:8080/v1",
    "api_key": "NULL"
}]

assistant = autogen.AssistantAgent(
    name="assistant",
    llm_config={"config_list": config_list}
)`,
    go: `// AutoGen HTTP Interface via Go
config := autogen.Config{
    Model: "baton-router",
    BaseURL: "http://localhost:8080/v1",
}
agent := autogen.NewAssistantAgent("assistant", config)`,
    swift: `// AutoGen HTTP Interface via Swift
let config = AutoGenConfig(model: "baton-router", baseUrl: "http://localhost:8080/v1")
let agent = AssistantAgent(name: "assistant", config: config)`,
    bash: `# AutoGen Server Start
autogen start --model baton-router --url http://localhost:8080/v1`
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="section-header">
        <h1 className="section-title">Agent Frameworks</h1>
        <p className="section-subtitle">
          Don't rewrite your orchestration logic. Connect your existing multi-agent framework directly to the BATON Universal Router with officially supported plugins.
        </p>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div >
            <h2>LangChain Support</h2>
            <p>LangChain is fully supported via the <code>ChatBaton</code> adapter. It provides high-throughput streaming through WebSockets to reduce latency in dense RAG pipelines.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={langchainCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div >
            <h2>CrewAI Integration</h2>
            <p>Empower your CrewAI agents with local models by replacing the default OpenAI dependency with the <code>BatonLLM</code> class. Perfect for complex, role-playing agents.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={crewAiCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div >
            <h2>AutoGen Bridge</h2>
            <p>Connect Microsoft's AutoGen framework by pointing the base URL to BATON's OpenAI-compatible HTTP interface.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={autoGenCode} />
        </div>
      </div>
    </div>
  );
}


