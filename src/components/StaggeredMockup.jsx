import React from 'react';
import './StaggeredMockup.css';
import { Mic, Phone, Server, Code, Bot, ShieldCheck, Activity } from 'lucide-react';
import batonLogo from '../assets/baton-logo.jpg';

export default function StaggeredMockup() {
  return (
    <div className="staggered-container">
      {/* Phone 1: Back Left */}
      <div className="phone-wrapper wrap-left">
        <div className="mockup-phone">
          <div className="phone-screen">
            <div className="phone-header">
              <Bot size={16} color="var(--accent-blue)" />
              <span>OpenAI Enterprise</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="chat-bubble user">Analyze Q3 metrics</div>
              <div className="chat-bubble ai">Securely querying Adapter...<br/><br/>Revenue is up 14% this quarter, driven by local agent integrations.</div>
              <div className="chat-bubble user">Graph it</div>
              <div className="chat-bubble ai" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={16} color="#ff9f0a" /> Generated Plot
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phone 2: Center Front */}
      <div className="phone-wrapper wrap-center">
        <div className="mockup-phone">
          <div className="phone-screen call-screen">
            <div className="call-header">
              <div className="call-time">02:45</div>
              <div className="call-status">Live</div>
            </div>
            <div className="avatar-container">
              <div className="pulse-ring"></div>
              <div className="pulse-ring delay"></div>
              <img src={batonLogo} alt="Agent" className="agent-avatar" />
            </div>
            <div className="call-actions">
              <div className="action-btn"><Mic size={20} /></div>
              <div className="action-btn end-call"><Phone size={20} style={{ transform: 'rotate(135deg)' }} /></div>
            </div>
          </div>
        </div>
      </div>

      {/* Phone 3: Back Right */}
      <div className="phone-wrapper wrap-right">
        <div className="mockup-phone">
          <div className="phone-screen">
            <div className="phone-header">
              <Server size={16} color="#ff9f0a" />
              <span>Adapter Network</span>
            </div>
            <div style={{ marginTop: '10px' }}>
              <div className="route-item">
                <ShieldCheck size={14} color="#32d74b" /> 
                <span style={{ fontWeight: 500 }}>Zero Trust Active</span>
              </div>
              <div className="route-item">
                <Code size={14} /> 
                <span>Local Router Connected</span>
              </div>
              <div className="route-item">
                <Server size={14} color="var(--accent-blue)" /> 
                <span>Streaming via SSE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
