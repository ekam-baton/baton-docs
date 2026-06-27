import React from 'react';
import CodeTabs from '../components/CodeTabs';

export default function Workspaces() {
  const sheetsCode = {
    javascript: `// Google Apps Script Add-on
function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const prompt = e.value;
  
  // Call BATON Cloud Router
  const response = UrlFetchApp.fetch("https://baton-router.local/api/generate", {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({ prompt: prompt })
  });
  
  e.range.offset(0, 1).setValue(response.getContentText());
}`,
    go: `// Go Service updating Sheets via API
import "google.golang.org/api/sheets/v4"

req := &sheets.ValueRange{Values: [][]interface{}{{batonResponse}}}
_, err := srv.Spreadsheets.Values.Update(spreadsheetId, range2, req).ValueInputOption("USER_ENTERED").Do()`,
    swift: `// macOS Numbers App integration via AppleScript bridge
import Foundation
// Send BATON response to AppleScript to edit Numbers cell
let script = "tell application \\"Numbers\\" to set value of cell 2 to \\"\\(response)\\""`
  };

  const slackCode = {
    rust: `// Slack Webhook Integration
let slack = WebhookAdapter::new(
    "<YOUR_SLACK_WEBHOOK_URL>"
);
router.register(slack);`,
    python: `# Python Webhook Post
import requests

requests.post(
    "https://baton-router.local/v1/webhook",
    json={"target": "slack", "message": "Task complete!"}
)`,
    go: `// Slack Webhook via Go
payload := map[string]string{"target": "slack", "message": "Task complete!"}
jsonValue, _ := json.Marshal(payload)
http.Post("https://baton-router.local/v1/webhook", "application/json", bytes.NewBuffer(jsonValue))`,
    swift: `// Slack Webhook via iOS/macOS
var request = URLRequest(url: URL(string: "https://baton-router.local/v1/webhook")!)
request.httpMethod = "POST"
request.httpBody = try! JSONEncoder().encode(["target": "slack", "message": "Task complete!"])`,
    bash: `# cURL to Slack Webhook
curl -X POST -H 'Content-type: application/json' \\
  --data '{"target": "slack", "message": "Task complete!"}' \\
  https://baton-router.local/v1/webhook`
  };

  const notionCode = {
    javascript: `// Notion API Integration
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY });
const response = await notion.pages.create({
  parent: { database_id: process.env.DATABASE_ID },
  properties: {
    Name: { title: [{ text: { content: "BATON Report" } }] }
  }
});`,
    go: `// Notion API via Go
import "github.com/jomei/notionapi"

client := notionapi.NewClient(notionapi.Token(os.Getenv("NOTION_KEY")))
page, err := client.Page.Create(ctx, &notionapi.PageCreateRequest{
    Parent: notionapi.Parent{DatabaseID: notionapi.DatabaseID(os.Getenv("DATABASE_ID"))},
    Properties: notionapi.Properties{"Name": notionapi.TitleProperty{}},
})`,
    swift: `// Notion API via Swift
let url = URL(string: "https://api.notion.com/v1/pages")!
var req = URLRequest(url: url)
req.addValue("Bearer \\(notionKey)", forHTTPHeaderField: "Authorization")`
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="section-header">
        <h1 className="section-title">Enterprise Workspaces</h1>
        <p className="section-subtitle">
          Inject Agentic Intelligence directly into your team's workflow. BATON bridges your background agents to the frontend productivity tools your enterprise relies on.
        </p>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div >
            <h2>Google Workspace (Sheets)</h2>
            <p>Trigger complex data analysis workflows in BATON directly from cell edits in Google Sheets using a custom Google Apps Script bridge.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={sheetsCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div >
            <h2>Slack & Teams</h2>
            <p>Configure agents to report their status, throw errors, or request human-in-the-loop permission via secure webhooks injected into your communication channels.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={slackCode} />
        </div>
      </div>

      <div className="z-block">
        <div className="z-text">
          <div >
            <h2>Notion API</h2>
            <p>Automatically document agent discoveries and research findings into structured Notion databases utilizing the official Notion REST API.</p>
          </div>
        </div>
        <div className="z-code">
          <CodeTabs codeBlocks={notionCode} />
        </div>
      </div>
    </div>
  );
}


