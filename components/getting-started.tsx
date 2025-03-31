// src/components/docs/GettingStarted.jsx
import React from 'react';

function GettingStartedDocs() {
  // Placeholder URL for your actual API endpoint
  const API_ENDPOINT = 'https://api.alertnow.dev/v1/alert';
  // Placeholder URL for your dashboard/rules documentation
  const ALERT_RULES_DOC_URL = '/docs/alert-rules'; // Update with your actual route/URL

  return (
    <div className="documentation-page" style={{ fontFamily: 'sans-serif', lineHeight: '1.6', padding: '20px' }}>
      <h1>Getting Started with AlertNow.dev</h1>
      <p>This guide will walk you through the basic steps to start sending alerts using AlertNow.dev.</p>

      <hr style={{ margin: '20px 0' }} />

      <h2>1. Installation / Setup Method</h2>
      <p>You can integrate AlertNow.dev either by using our NPM package in your Node.js application or by calling our HTTP API directly from any language or system.</p>

      <h3>Option A: Using NPM (for Node.js)</h3>
      <p>Install the official AlertNow SDK into your Node.js project:</p>
      <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '5px', overflowX: 'auto' }}>
        <code className="language-bash">
          npm install alertnow
        </code>
      </pre>
      {/* Or using yarn:
      <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '5px', overflowX: 'auto' }}>
        <code className="language-bash">
          yarn add alertnow
        </code>
      </pre> */}


      <h3>Option B: Using the HTTP API (Curl Example)</h3>
      <p>If you're not using Node.js or prefer direct integration, you can send alerts via a simple POST request to our API endpoint. You'll need an API key (obtained from your dashboard) for authentication (details typically sent via headers, add clarification here).</p>
      <p>See Step 4 for the full Curl request example.</p>

      <hr style={{ margin: '20px 0' }} />

      <h2>2. Configure Alert Rules</h2>
      <p>Before sending alerts, you need to configure where they should go (e.g., which Discord channel, Slack workspace, or Telegram chat) based on criteria like the alert level or source.</p>
      <p>
        This is done through your AlertNow.dev dashboard. Please refer to the{' '}
        <a href={ALERT_RULES_DOC_URL} target="_blank" rel="noopener noreferrer">
          Alert Rules Setup Guide
        </a>{' '}
        for detailed instructions on creating and managing your routing rules.
      </p>
      <p><strong>Note:</strong> Alerts won't be delivered unless a matching rule is configured and active.</p>

      <hr style={{ margin: '20px 0' }} />

      <h2>3. Sending Your First Alert</h2>
      <p>Once installed and configured, you can trigger alerts from your application code or using tools like Curl.</p>

      <h3>Node.js Example (using SDK)</h3>
      <p>Import the package and use the `send` method:</p>
      <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '5px', overflowX: 'auto' }}>
        <code className="language-javascript">
          {`// Assuming you have initialized 'alertNow' with your API key
// const alertNow = require('alertnow')('YOUR_API_KEY'); or similar initialization

alertNow.send("critical", "Database Connection Lost", "Unable to connect to primary DB.", { serverId: "db-prod-1", attempt: 3 })
  .then(() => console.log('Alert sent successfully!'))
  .catch(err => console.error('Failed to send alert:', err));

// Example provided in prompt:
alertNow.send("critical", "title", "message", { userId: 1 });`}
        </code>
      </pre>
      <p>Parameters:</p>
      <ul>
        <li><code>level</code> (String): Severity level (e.g., "critical", "error", "warning", "info"). Used for routing rules.</li>
        <li><code>title</code> (String): A short summary of the alert.</li>
        <li><code>message</code> (String): A more detailed description of the issue.</li>
        <li><code>data</code> (Object, Optional): Any additional structured data you want to include (e.g., user ID, server name, trace ID). This data can often be used in rule conditions or displayed in the alert message template.</li>
      </ul>


      <h3>Curl Example (using HTTP API)</h3>
      <p>Send a POST request with a JSON body to the API endpoint. Remember to include your API key in the appropriate header (e.g., `Authorization: Bearer YOUR_API_KEY` or `X-Api-Key: YOUR_API_KEY` - **specify the correct method here**).</p>
       <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '5px', overflowX: 'auto' }}>
         <code className="language-bash">
           {`curl -X POST ${API_ENDPOINT} \\
 -H "Content-Type: application/json" \\
 -H "Authorization: Bearer YOUR_API_KEY" \\ # <-- Replace with your actual API Key and Auth method
 -d '{
   "level": "critical",
   "title": "runtime error!",
   "message": "nil pointer at line 35",
   "data": {
     "userId": 1,
     "fileName": "processor.go"
   }
 }'`}
        </code>
      </pre>
       <p>Request Body Fields:</p>
       <ul>
         <li><code>level</code> (String): Severity level.</li>
         <li><code>title</code> (String): Alert title.</li>
         <li><code>message</code> (String): Alert details.</li>
         <li><code>data</code> (Object, Optional): Additional structured data.</li>
       </ul>

      <hr style={{ margin: '20px 0' }} />

      <h2>4. Receiving the Alert</h2>
      <p>If your alert matches a configured rule (Step 2), it will be instantly delivered to the specified destination(s).</p>
      <p>For example, an alert sent with the "critical" level might appear in your designated Discord channel like this (formatting depends on your rule's message template):</p>
      <div style={{ background: '#36393f', color: 'white', padding: '15px', borderRadius: '8px', borderLeft: '5px solid #f04747', margin: '15px 0' }}> {/* Mimic Discord dark theme with red critical border */}
        <strong style={{ color: '#f04747' }}>[CRITICAL]</strong><br />
        <strong>Title:</strong> runtime error!<br />
        <strong>Message:</strong> nil pointer at line 35<br />
        {/* Optionally display data */}
        <span style={{ fontSize: '0.9em', color: '#b9bbbe' }}>Data: {JSON.stringify({ userId: 1, fileName: "processor.go" })}</span>
      </div>
      <p>Alerts will similarly appear in configured Slack channels, Telegram chats, etc.</p>

      <hr style={{ margin: '20px 0' }} />

      <p>That's it! You're now ready to integrate AlertNow.dev for robust, multi-channel alerting.</p>
    </div>
  );
}

export default GettingStartedDocs;