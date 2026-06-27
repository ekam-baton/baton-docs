import React from 'react';
import CodeTabs from '../components/CodeTabs';

export default function CloudProviders() {
  const geminiCode = {
    rust: `// Gemini Enterprise Integration
let gemini = GeminiAdapter::new(
    env::var("GEMINI_API_KEY").unwrap()
);
router.register(gemini);`,
    python: `# Python SDK Integration
import google.generativeai as genai

genai.configure(api_key="GEMINI_API_KEY")
model = genai.GenerativeModel('gemini-1.5-pro-latest')`,
    go: `// Go SDK Integration
import "github.com/google/generative-ai-go/genai"

ctx := context.Background()
client, err := genai.NewClient(ctx, option.WithAPIKey(os.Getenv("GEMINI_API_KEY")))
model := client.GenerativeModel("gemini-1.5-pro-latest")`,
    swift: `// iOS Native SDK
import GoogleGenerativeAI

let model = GenerativeModel(
    name: "gemini-1.5-pro-latest",
    apiKey: ProcessInfo.processInfo.environment["GEMINI_API_KEY"]!
)
Task {
    let response = try await model.generateContent("Hello BATON!")
}`,
    curl: `curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=$GEMINI_API_KEY" \\
    -H 'Content-Type: application/json' \\
    -X POST \\
    -d '{ "contents":[{ "parts":[{"text": "Hello BATON!"}] }] }'`
  };

  const azureCode = {
    rust: `// Azure OpenAI Deployment
let azure = AzureOpenAIAdapter::new(
    "https://your-resource.openai.azure.com",
    "deployment-id",
    env::var("AZURE_OPENAI_KEY").unwrap()
);
router.register(azure);`,
    python: `# Python Azure Connection
from openai import AzureOpenAI

client = AzureOpenAI(
    api_key="<api_key>",  
    api_version="2024-02-01",
    azure_endpoint="https://your-resource.openai.azure.com"
)`,
    go: `// Azure OpenAI via Go
import "github.com/sashabaranov/go-openai"

config := openai.DefaultAzureConfig("<api_key>", "https://your-resource.openai.azure.com")
client := openai.NewClientWithConfig(config)`,
    swift: `// Azure OpenAI via Swift
import AzureOpenAI

let client = AzureOpenAIClient(
    endpoint: "https://your-resource.openai.azure.com",
    apiKey: "<api_key>",
    apiVersion: "2024-02-01"
)`
  };

  const bedrockCode = {
    python: `# AWS Bedrock (Claude 3)
import boto3

bedrock = boto3.client(service_name='bedrock-runtime')
response = bedrock.invoke_model(
    modelId='anthropic.claude-3-sonnet-20240229-v1:0',
    body=payload
)`,
    go: `// AWS Bedrock Go SDK
import "github.com/aws/aws-sdk-go-v2/service/bedrockruntime"

client := bedrockruntime.NewFromConfig(cfg)
// Invoke model via AWS SDK`,
    swift: `// AWS Bedrock iOS SDK
import AWSCore
import AWSBedrockRuntime

let bedrock = AWSBedrockRuntime.default()
// Invoke model via AWS SDK`,
    bash: `# AWS CLI Bedrock Invocation
aws bedrock-runtime invoke-model \\
    --model-id anthropic.claude-3-sonnet-20240229-v1:0 \\
    --body file://payload.json \\
    output.txt`
  };

  const privateCloudCode = {
    rust: `// Private Cloud Auth
let secure_cloud = PrivateCloudAdapter::with_auth(
    "https://internal-ai.corp.local",
    AuthConfig::mtls("client.crt", "client.key")
        .add_bearer_token(env::var("CORP_TOKEN").unwrap())
);
router.register(secure_cloud);`,
    go: `// Private Cloud mTLS via Go
cert, err := tls.LoadX509KeyPair("client.crt", "client.key")
tlsConfig := &tls.Config{ Certificates: []tls.Certificate{cert} }
transport := &http.Transport{ TLSClientConfig: tlsConfig }
client := &http.Client{ Transport: transport }`,
    swift: `// URLSession with mTLS
let configuration = URLSessionConfiguration.default
// Attach client certificates and Bearer tokens
let session = URLSession(configuration: configuration, delegate: MTLSDDelegate(), delegateQueue: nil)`,
    bash: `# cURL with mTLS & Bearer Token
curl -X POST "https://internal-ai.corp.local/api/generate" \\
    --cert client.crt --key client.key \\
    -H "Authorization: Bearer $CORP_TOKEN"`
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="section-header">
        <h1 className="section-title">Enterprise Cloud APIs</h1>
        <p className="section-subtitle">
          Scale your agentic workflows instantly. BATON provides seamless, optimized bridges to world-class foundational models via official SDKs and high-throughput REST APIs.
        </p>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div >
            <h2 style={{ marginTop: 0 }}>Gemini Enterprise & Google AI Studio</h2>
            <p>Integrate natively with Google's state-of-the-art Gemini ecosystem. Purpose-built for massive context windows, complex reasoning, and multimodal data ingestion.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={geminiCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div >
            <h2>Azure OpenAI</h2>
            <p>Engineered for strict enterprise compliance. BATON routes traffic securely to Azure's enterprise-grade OpenAI endpoints, ensuring maximum data sovereignty.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={azureCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div >
            <h2>AWS Bedrock & Hugging Face</h2>
            <p>Achieve unparalleled flexibility. Leverage Claude 3 via AWS Bedrock or connect directly to Hugging Face Inference Endpoints via the AWS adapter.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={bedrockCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div >
            <h2>Private Cloud Identity Access</h2>
            <p>BATON features first-class support for Zero Trust architectures. Securely pass Mutual TLS (mTLS) and Bearer credentials to air-gapped, private environments.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={privateCloudCode} />
        </div>
      </div>
    </div>
  );
}


