import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Pause, Play, Cpu, Wifi } from 'lucide-react';

const TELEMETRY_STREAM = [
  { channel: 'CRYPTO', event: 'X25519_ECDH', detail: 'Ephemeral keypair negotiated with Mobile Client', latency: '0.6ms', hash: 'e2f9...84a1' },
  { channel: 'ROUTER', event: 'RELAY_RACE', detail: 'Direct LAN preferred over cloud TURN (sub-millisecond)', latency: '0.8ms', hash: 'c81b...3f90' },
  { channel: 'MCP', event: 'STDIO_SPAWN', detail: 'FastMCP process "local-tools" initialized (PID 4892)', latency: '12ms', hash: '4a1d...00c7' },
  { channel: 'CIPHER', event: 'AES_GCM_SEAL', detail: 'User prompt sealed with hardware IV (zero cloud plaintext)', latency: '0.2ms', hash: '7b5e...91da' },
  { channel: 'INFERENCE', event: 'OLLAMA_BRIDGE', detail: 'Streaming payload to http://127.0.0.1:11434/api/generate', latency: '1.1ms', hash: '3d62...5e4f' },
  { channel: 'AUDIT', event: 'MERKLE_APPEND', detail: 'Evidence block committed (ISO/IEC 27037 compliant)', latency: '0.4ms', hash: '90ea...218c' },
  { channel: 'MOBILE', event: 'HARDWARE_KEYSTORE', detail: 'Biometric Android StrongBox session confirmed', latency: '1.4ms', hash: '1f84...b902' },
  { channel: 'MCP', event: 'TOOL_DISPATCH', detail: 'Tool call "search_notes" executed inside sandbox', latency: '4.8ms', hash: '6c39...8d5b' },
  { channel: 'CIPHER', event: 'PAYLOAD_BURST', detail: '248 tokens encrypted and delivered to smartphone', latency: '0.9ms', hash: 'a52c...47ef' },
];

export default function AuditLogFeed() {
  const [logs, setLogs] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [activeCount, setActiveCount] = useState(148);
  const scrollRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    // Initial batch of realistic logs
    const initial = TELEMETRY_STREAM.slice(0, 4).map((item, idx) => ({
      id: idx,
      time: getTimestamp(idx * 2),
      ...item,
    }));
    setLogs(initial);
    indexRef.current = 4;

    const interval = setInterval(() => {
      if (isPaused) return;

      const template = TELEMETRY_STREAM[indexRef.current % TELEMETRY_STREAM.length];
      const newEntry = {
        id: Date.now() + Math.random(),
        time: getTimestamp(0),
        ...template,
      };

      setLogs((prev) => {
        const next = [...prev, newEntry];
        return next.slice(-14); // Keep last 14 logs for high performance
      });

      setActiveCount((c) => c + Math.floor(Math.random() * 3 + 1));
      indexRef.current += 1;
    }, 2200);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (scrollRef.current && !isPaused) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isPaused]);

  return (
    <div className="telemetry-card" aria-label="Live Cryptographic Telemetry">
      {/* Top Header */}
      <div className="telemetry-header">
        <div className="telemetry-title-group">
          <span className="telemetry-live-dot" />
          <span className="telemetry-title">LIVE CRYPTOGRAPHIC TELEMETRY</span>
        </div>
        <div className="telemetry-actions">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="telemetry-btn"
            title={isPaused ? 'Resume stream' : 'Pause stream'}
            aria-label={isPaused ? 'Resume' : 'Pause'}
          >
            {isPaused ? <Play size={12} /> : <Pause size={12} />}
            <span>{isPaused ? 'Paused' : 'Live'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="telemetry-metrics-bar">
        <div className="metric-chip">
          <Wifi size={12} className="metric-icon" />
          <span className="metric-label">Route:</span>
          <span className="metric-value">Direct LAN (0.8ms)</span>
        </div>
        <div className="metric-chip">
          <ShieldCheck size={12} className="metric-icon" />
          <span className="metric-label">Cipher:</span>
          <span className="metric-value">AES-256-GCM</span>
        </div>
        <div className="metric-chip">
          <Cpu size={12} className="metric-icon" />
          <span className="metric-label">Bridge:</span>
          <span className="metric-value">FastMCP Stdio</span>
        </div>
      </div>

      {/* Log Feed Terminal */}
      <div className="telemetry-feed" ref={scrollRef}>
        {logs.map((log) => (
          <div key={log.id} className="telemetry-row">
            <span className="telemetry-time">{log.time}</span>
            <span className={`telemetry-badge tag-${log.channel.toLowerCase()}`}>
              {log.channel}
            </span>
            <span className="telemetry-event">{log.event}</span>
            <span className="telemetry-detail">{log.detail}</span>
            <span className="telemetry-hash">{log.hash}</span>
          </div>
        ))}
      </div>

      {/* Footer Status Bar */}
      <div className="telemetry-footer">
        <span>X25519 E2EE Tunnels Verified</span>
        <span className="telemetry-counter">{activeCount.toLocaleString()} envelopes sealed</span>
      </div>
    </div>
  );
}

function getTimestamp(offsetSeconds = 0) {
  const d = new Date();
  if (offsetSeconds > 0) {
    d.setSeconds(d.getSeconds() - offsetSeconds);
  }
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  const s = d.getSeconds().toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}
