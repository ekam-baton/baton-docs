import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

const LOG_TEMPLATES = [
  { event: 'CONNECTION_SECURED', detail: 'X25519 Handshake complete', severity: 'success' },
  { event: 'AGENT_ROUTED', detail: 'Payload delivered to Local Hermes', severity: 'info' },
  { event: 'KEY_EXCHANGE', detail: 'Ephemeral key generated', severity: 'info' },
  { event: 'SIGNATURE_VERIFIED', detail: 'Client signature valid', severity: 'success' },
  { event: 'ENCLAVE_READY', detail: 'Hardware backed keys active', severity: 'info' },
  { event: 'DATA_ENCRYPTED', detail: 'AES-256-GCM encryption applied', severity: 'success' },
  { event: 'ROUTER_PING', detail: 'Latency 14ms', severity: 'info' },
  { event: 'AUTH_CHALLENGE', detail: 'Biometric verification required', severity: 'warning' },
  { event: 'MCP_BRIDGE_UP', detail: 'Model Context Protocol active', severity: 'success' }
];

export default function AuditLogFeed() {
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    // Initial logs to not be empty
    const initialLogs = Array.from({ length: 4 }).map((_, i) => createLog(i));
    setLogs(initialLogs);

    let counter = 4;
    const interval = setInterval(() => {
      setLogs(prev => {
        const newLog = createLog(counter++);
        const newLogs = [newLog, ...prev];
        // keep only the last 15 logs to prevent memory leak
        if (newLogs.length > 15) {
          newLogs.pop();
        }
        return newLogs;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const createLog = (id) => {
    const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    return {
      id,
      time: timeString,
      event_type: template.event,
      detail: template.detail,
      severity: template.severity
    };
  };

  return (
    <div className="audit-feed-card">
      <div className="audit-feed-header">
        <Activity size={14} className="text-muted" />
        <span>Activity Audit Log</span>
      </div>
      <div className="audit-feed-content">
        {logs.map(log => (
          <div key={log.id} className="audit-log-line">
            <span className="log-time">[{log.time}]</span>
            <span className={`log-event ${log.severity}`}>{log.event_type}</span>
            <span className="log-detail">- {log.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
