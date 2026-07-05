import React from 'react';

export default function Terms() {
  return (
    <div className="page-header" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Terms</h1>
      <div  style={{ padding: '2rem', lineHeight: '1.8' }}>
        <p className="legal-text">Last Updated: June 20, 2026</p>
<div style={{height: "1.5rem"}}></div>
<p className="legal-text">Please read these Terms of Service (&quot;Terms&quot;) carefully before using the BATON mobile application (&quot;Application&quot;). By installing or using the Application, you agree to be bound by these Terms.</p>
<div style={{height: "1.5rem"}}></div>
<h2 className="legal-header">1. SCOPE OF SERVICE</h2>
<p className="legal-text">BATON is an orchestration client interface that allows users to communicate with local and remote AI models via Model Context Protocol (MCP) tunnels. The Application does not host or operate the AI models or endpoints themselves.</p>
<div style={{height: "1.5rem"}}></div>
<h2 className="legal-header">2. ELIGIBILITY &amp; REGISTRATION</h2>
<p className="legal-text">To use the Application, you must complete the onboarding profile setup by providing a valid Email Address and Phone Number. You are responsible for configuring secure biometric authentication on your device to protect access to the Application.</p>
<div style={{height: "1.5rem"}}></div>
<h2 className="legal-header">3. USER-CONFIGURED ENDPOINTS (MCP)</h2>
<ul className="legal-list">
<li className="legal-list-item">Responsibility: You are solely responsible for the configuration, hosting, safety, and security of any Model Context Protocol (MCP) endpoints or tunnels connected to the Application.</li>
<li className="legal-list-item">Network Usage: Connecting the Application to third-party endpoints may consume mobile data or broadband network bandwidth. You are responsible for all carrier and network charges.</li>
</ul>
<div style={{height: "1.5rem"}}></div>
<h2 className="legal-header">4. DISCLAIMER OF WARRANTIES</h2>
<ul className="legal-list">
<li className="legal-list-item">THE APPLICATION IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</li>
<li className="legal-list-item">WE DO NOT GUARANTEE THE ACCURACY, RELIABILITY, SECURITY, OR AVAILABILITY OF THE APPLICATION OR ANY AI RESPONSES SECURED FROM EXTERNAL MCP SERVICES.</li>
</ul>
<div style={{height: "1.5rem"}}></div>
<h2 className="legal-header">5. LIMITATION OF LIABILITY</h2>
<ul className="legal-list">
<li className="legal-list-item">TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL THE DEVELOPERS, MAINTAINERS, OR DISTRIBUTORS OF BATON BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR USE arising out of your use or inability to use the Application.</li>
<li className="legal-list-item">ALL ACTIONS TAKEN AND DECISIONS MADE BASED ON AI GENERATED MESSAGES WITHIN THE CHAT INTERFACE ARE SOLELY AT YOUR OWN RISK.</li>
</ul>
<div style={{height: "1.5rem"}}></div>
<h2 className="legal-header">6. EVIDENTIARY USE & FORENSIC AUDITING</h2>
<p className="legal-text">BATON incorporates a local cryptographic ledger, Merkle Tree hashing, and hardware-backed digital signatures (AES/QES) designed to comply with global evidentiary standards (including ISO/IEC 27037, eIDAS, and CISA).</p>
<ul className="legal-list">
<li className="legal-list-item"><b>No Legal Advice:</b> We provide the cryptographic tools to secure your data, but we do not provide legal advice. You are solely responsible for ensuring that the exported `.baton_evidence` zip and detached `.sig` files meet the specific legal, procedural, and evidentiary requirements of your local jurisdiction before submitting them to any court, tribunal, or regulatory body.</li>
<li className="legal-list-item"><b>Third-Party QTSP Certificates:</b> If you utilize the `EnterpriseCertificateManager` to inject a Qualified Trust Service Provider (QTSP) certificate for eIDAS QES compliance, you are solely responsible for maintaining the validity, revocation status, and security of that certificate.</li>
<li className="legal-list-item"><b>Indemnity:</b> We shall not be held liable for the rejection of BATON cryptographic logs or exported archives by any court of law or auditor.</li>
</ul>
<div style={{height: "1.5rem"}}></div>
<h2 className="legal-header">7. GOVERNING LAW</h2>
<p className="legal-text">These Terms shall be governed and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law provisions.</p>
<div style={{height: "1.5rem"}}></div>
<h2 className="legal-header">8. CHANGES TO TERMS</h2>
<p className="legal-text">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. Continued use of the Application constitutes acceptance of the new Terms.</p>
<div style={{height: "1.5rem"}}></div>
      </div>
    </div>
  );
}

