import React from 'react';

export default function Privacy() {
  return (
    <div className="page-header" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Privacy</h1>
      <div  style={{ padding: '2rem', lineHeight: '1.8' }}>
        <p className="legal-text">Last Updated: June 20, 2026</p>
<div style={{height: "1.5rem"}}></div>
<p className="legal-text">This Privacy Policy explains how BATON (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) handles user information. BATON is a secure, personal AI assistant interface designed with user privacy and local-first data storage as sovereign principles.</p>
<div style={{height: "1.5rem"}}></div>
<h2 className="legal-header">1. DATA WE COLLECT</h2>
<p className="legal-text">For onboarding, profile setup, and secure communication tracking, we collect the following information:</p>
<ul className="legal-list">
<li className="legal-list-item">Email Address</li>
<li className="legal-list-item">Phone Number</li>
</ul>
<p className="legal-text">No password is required, as the application relies on hardware-backed biometric authentication.</p>
<div style={{height: "1.5rem"}}></div>
<h2 className="legal-header">2. HOW YOUR DATA IS STORED &amp; PROTECTED</h2>
<ul className="legal-list">
<li className="legal-list-item">Encryption: All user profile data, settings, message logs, and memory storage are encrypted on-device using a high-security SQLCipher SQLite database.</li>
<li className="legal-list-item">Local-First Architecture: Your data is stored locally on your mobile device. It is not uploaded, stored, or synced to any centralized server owned or operated by us.</li>
</ul>
<div style={{height: "1.5rem"}}></div>
<h2 className="legal-header">3. EXTERNAL DATA TRANSIT &amp; THIRD-PARTY AI SERVICES</h2>
<ul className="legal-list">
<li className="legal-list-item">Model Context Protocol (MCP): BATON acts as a client that routes user messages to Model Context Protocol (MCP) servers or endpoints configured by you.</li>
<li className="legal-list-item">Data Shared with AI: When you interact with an agent, your message and relevant context (including local semantic and episodic memory fragments) are sent to the user-configured MCP endpoint.</li>
<li className="legal-list-item">Third-Party Policies: We do not control and are not responsible for the privacy practices of your custom MCP endpoints, hosting providers, or the AI models running on them. You must review the policies of those third-party providers.</li>
</ul>
<div style={{height: "1.5rem"}}></div>
<h2 className="legal-header">4. USER CONTROL AND DATA WIPE</h2>
<p className="legal-text">You have absolute control over your data:</p>
<ul className="legal-list">
<li className="legal-list-item">Memory Retention: You can configure the retention period of memory logs inside settings.</li>
<li className="legal-list-item">Wiping Data: You can immediately erase all database records, chat histories, agent definitions, and signup profile data at any time by navigating to Settings -&gt; Privacy &amp; Security -&gt; Clear all data.</li>
</ul>
<div style={{height: "1.5rem"}}></div>
<h2 className="legal-header">5. BIOMETRIC DATA</h2>
<p className="legal-text">BATON utilizes your device&#39;s biometric sensors to secure app access. We do not collect, store, or transmit your biometric records (fingerprints or face scans). Please refer to our Biometric Disclosure statement for more details.</p>
<div style={{height: "1.5rem"}}></div>
<h2 className="legal-header">6. DEVICE PERMISSIONS (CAMERA &amp; MEDIA)</h2>
<p className="legal-text">To provide advanced AI capabilities (such as computer vision and context awareness), BATON may request access to your device's Camera and Media Library.</p>
<ul className="legal-list">
<li className="legal-list-item"><b>Camera &amp; Images:</b> If you grant permission, images captured or selected by you are processed locally and securely transmitted *only* to your configured AI endpoint for the sole purpose of fulfilling your specific request (e.g., image analysis).</li>
<li className="legal-list-item"><b>No Background Capture:</b> We do not capture photos, videos, or access your media library in the background without your explicit instruction.</li>
<li className="legal-list-item"><b>Data Retention:</b> Images sent to AI endpoints are subject to the data retention policies of the specific AI provider you configure. BATON does not retain a centralized cloud copy of your media.</li>
</ul>
<div style={{height: "1.5rem"}}></div>
<h2 className="legal-header">7. FORENSIC AUDIT LOGS & GLOBAL GOVERNANCE</h2>
<p className="legal-text">BATON implements a cryptographic ledger designed for global evidentiary compliance (including ISO/IEC 27037, eIDAS, US CISA/DISA STIG, and India IT Act Sec 65B).</p>
<ul className="legal-list">
<li className="legal-list-item"><b>Local Cryptographic Signing:</b> All actions, system events, and captured screenshots are cryptographically hashed using a Merkle Tree and signed using a hardware-backed private key on your device.</li>
<li className="legal-list-item"><b>eIDAS Qualified Signatures:</b> If your organization uses an MDM to inject a Qualified Trust Service Provider (QTSP) certificate, BATON will use it for signing, establishing a Qualified Electronic Signature (QES) with the legal equivalency of a handwritten signature.</li>
<li className="legal-list-item"><b>No Cloud Evidence Storage:</b> The forensic audit ledger is stored strictly on-device. We do not transmit, analyze, or possess copies of your cryptographic logs. If you choose to export your logs for a legal proceeding or compliance audit, they are exported directly from your device to an ISO/IEC 27037 compliant `.zip` archive with a detached `.sig` file.</li>
</ul>
<div style={{height: "1.5rem"}}></div>
<h2 className="legal-header">8. CONTACT US</h2>
<p className="legal-text">For questions regarding this privacy policy or our local-first storage design, please contact the repository maintainers.</p>
<div style={{height: "1.5rem"}}></div>
      </div>
    </div>
  );
}

