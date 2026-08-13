import React, { useState, useEffect, useRef } from 'react';

const CONNECTION_SEQUENCE = [
  { text: 'connector started on port 3000' },
  { text: 'loading baton.json — 2 MCP servers registered' },
  { text: 'spawning "my-tools" (python server.py)' },
  { text: 'spawning "dev-utils" (node server.js)' },
  { text: 'mDNS broadcast: _baton._tcp.local' },
  { text: 'mobile device discovered on LAN (192.168.1.42)' },
  { text: 'X25519 key exchange initiated' },
  { text: 'shared secret derived — session established' },
  { text: 'AES-256-GCM channel active' },
  { text: 'prompt received (247 bytes, encrypted)' },
  { text: 'decrypted — routing to ollama@127.0.0.1:11434' },
  { text: 'streaming response — 312 tokens' },
  { text: 'response encrypted and sent to mobile' },
  { text: 'tool call: my-tools.query_notes("project deadlines")' },
  { text: 'tool result returned (3 matches)' },
  { text: 'idle — waiting for next message' },
];

export default function ConnectionLog() {
  const [lines, setLines] = useState([]);
  const indexRef = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    // Start with a few lines
    const initial = CONNECTION_SEQUENCE.slice(0, 3).map((entry, i) => ({
      id: i,
      text: entry.text,
      time: formatTime(i),
    }));
    setLines(initial);
    indexRef.current = 3;

    const interval = setInterval(() => {
      const idx = indexRef.current % CONNECTION_SEQUENCE.length;
      const entry = CONNECTION_SEQUENCE[idx];

      setLines(prev => {
        const newLine = {
          id: Date.now(),
          text: entry.text,
          time: formatTime(indexRef.current),
        };
        const updated = [...prev, newLine];
        return updated.slice(-12); // keep last 12 lines
      });

      indexRef.current += 1;
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="conn-log">
      <div className="conn-log-bar">
        <div className="conn-log-dots">
          <span></span><span></span><span></span>
        </div>
        <span className="conn-log-title">baton-connector</span>
      </div>
      <div className="conn-log-body" ref={containerRef}>
        {lines.map(line => (
          <div key={line.id} className="conn-log-line">
            <span className="conn-log-time">{line.time}</span>
            <span className="conn-log-text">{line.text}</span>
          </div>
        ))}
        <div className="conn-log-cursor">▋</div>
      </div>
    </div>
  );
}

function formatTime(index) {
  const base = new Date();
  base.setSeconds(base.getSeconds() + index * 3);
  const h = base.getHours().toString().padStart(2, '0');
  const m = base.getMinutes().toString().padStart(2, '0');
  const s = base.getSeconds().toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}
