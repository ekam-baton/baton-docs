import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function CodeTabs({ tabs, codeBlocks }) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  // Support both the old 'tabs' array format and the new 'codeBlocks' object format
  let normalizedTabs = [];
  if (tabs) {
    normalizedTabs = tabs;
  } else if (codeBlocks) {
    normalizedTabs = Object.entries(codeBlocks).map(([lang, code]) => ({
      // Capitalize the language name for the tab title
      name: lang === 'curl' ? 'cURL' : lang.charAt(0).toUpperCase() + lang.slice(1),
      language: lang,
      code: code
    }));
  }

  if (normalizedTabs.length === 0) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(normalizedTabs[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-window">
      <div className="code-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', height: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* macOS Window Controls */}
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginLeft: '2rem', flex: 1, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          {normalizedTabs.map((tab, index) => (
            <button 
              key={tab.name}
              className={`code-tab ${activeTab === index ? 'active' : ''}`}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: `2px solid ${activeTab === index ? 'var(--accent-blue)' : 'transparent'}`,
                color: activeTab === index ? '#fff' : 'var(--text-muted)',
                padding: '0 0.5rem',
                height: '48px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => setActiveTab(index)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <button 
          onClick={handleCopy} 
          aria-label="Copy code"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          {copied ? <Check size={16} color="#27c93f" /> : <Copy size={16} />}
        </button>
      </div>
      <div className="code-content" style={{ margin: 0, overflowX: 'auto' }}>
        <pre className={`language-${normalizedTabs[activeTab].language}`} style={{ margin: 0, background: 'transparent' }}>
          <code style={{ fontFamily: '"Fira Code", "JetBrains Mono", Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace', color: '#e5e7eb' }}>
            {normalizedTabs[activeTab].code}
          </code>
        </pre>
      </div>
    </div>
  );
}
