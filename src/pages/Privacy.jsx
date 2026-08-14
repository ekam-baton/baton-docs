import React from 'react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="inner-page">
      <h1>Privacy Policy</h1>
      <p className="page-intro">
        <strong>Effective Date:</strong> August 2026 <br />
        <strong>Last Updated:</strong> August 2026
      </p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to BATON. This Privacy Policy explains how Ekam Baton ("we", "us", or "our") collects, uses, and protects your information when you use the BATON mobile application and associated services (the "Service").
      </p>
      <p>
        BATON is a privacy-first mobile chat application designed to securely connect your device to AI models running on your local computer. We operate on a zero-knowledge architecture, ensuring that your prompts, responses, and personal communications are strictly confidential and inaccessible to us.
      </p>

      <h2>2. Information We Collect</h2>
      <p>
        We strongly believe in data minimization. We only collect the absolute minimum data required to facilitate the connection between your mobile device and your local computer.
      </p>
      <ul>
        <li><strong>Profile Identifier:</strong> A randomly generated UUID used to route messages.</li>
        <li><strong>Public Keys:</strong> An X25519 public key required for establishing End-to-End Encryption (E2EE).</li>
        <li><strong>Device Platform:</strong> Basic platform information (Android or iOS) necessary for routing and notification delivery.</li>
        <li><strong>IP Address:</strong> IP addresses are collected transiently during the relay connection process and are <strong>never stored</strong>.</li>
      </ul>
      <p>
        <strong>What we do NOT collect:</strong> We do not collect names, email addresses, phone numbers, or any traditional personally identifiable information (PII). We do not use cookies, and we implement zero telemetry, analytics, or tracking mechanisms within the application.
      </p>

      <h2>3. How We Secure Your Data</h2>
      <p>
        Security is the foundation of BATON. Your data is protected using state-of-the-art cryptographic protocols:
      </p>
      <ul>
        <li><strong>End-to-End Encryption (E2EE):</strong> All communications, including your prompts and AI responses, are encrypted using X25519 key exchange and AES-256-GCM. Our relay server cannot inspect, read, or alter your plaintext data.</li>
        <li><strong>Hardware-Backed Security:</strong> Private keys are securely generated and stored exclusively within your device's hardware enclaves (Android Keystore TEE/StrongBox or iOS Secure Enclave).</li>
        <li><strong>Local Storage Encryption:</strong> Your chat history is stored locally on your device and protected by an encrypted SQLCipher database.</li>
      </ul>

      <h2>4. Data Retention Policy</h2>
      <p>
        Because we operate a zero-knowledge relay server, we do not retain your messages. The minimal metadata required for routing (such as public keys and UUIDs) is retained solely for the duration of your active session. Once the session is terminated, transient connection data is immediately discarded.
      </p>

      <h2>5. Third-Party Services</h2>
      <p>
        BATON operates independently. We do not integrate with third-party analytics providers, advertising networks, or third-party SDKs that track user behavior. Your data remains strictly between your device and your local AI environment.
      </p>

      <h2>6. Jurisdiction-Specific Rights</h2>

      <h3>6.1 India - Digital Personal Data Protection Act 2023 (DPDPA)</h3>
      <p>
        Under the DPDPA, Ekam Baton acts as a Data Fiduciary. By using BATON, you provide explicit consent for the processing of the minimal data points outlined in Section 2 for the sole purpose of providing the Service.
      </p>
      <ul>
        <li><strong>Data Principal Rights:</strong> You have the right to access, correct, and request the erasure of your data, as well as the right to grievance redressal.</li>
        <li><strong>Grievance Officer:</strong> For any privacy-related concerns or to exercise your rights, please contact our designated Grievance Officer at ekam.baton@gmail.com.</li>
        <li><strong>Data Breaches:</strong> In the highly unlikely event of a data breach affecting your personal data, we will notify you and the Data Protection Board of India in accordance with the law, recognizing the potential penalties up to ₹250 crore.</li>
        <li><strong>Children's Data:</strong> We do not process the data of children under 18. If you are under 18, you must have verifiable parental consent to use the Service.</li>
      </ul>

      <h3>6.2 United States - California CCPA/CPRA</h3>
      <p>
        If you are a resident of California, you are granted specific rights regarding your personal information under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA).
      </p>
      <ul>
        <li><strong>Categories Collected:</strong> We collect only the limited categories of information described in Section 2 (Identifiers).</li>
        <li><strong>Your Rights:</strong> You have the right to know what personal information is collected, the right to request deletion or correction of your data, and the right to opt-out of the sale or sharing of your data.</li>
        <li><strong>No Sale or Sharing:</strong> BATON <strong>does not</strong> sell or share your personal information with third parties.</li>
        <li><strong>Non-Discrimination:</strong> We will not discriminate against you for exercising any of your CCPA/CPRA rights.</li>
        <li><strong>COPPA:</strong> In compliance with the Children's Online Privacy Protection Act, BATON is not directed at children under 13, and we do not knowingly collect personal information from children under 13.</li>
      </ul>

      <h3>6.3 United Kingdom - UK GDPR & Data Protection Act 2018</h3>
      <p>
        For users in the UK, we process your data in compliance with the UK General Data Protection Regulation (UK GDPR).
      </p>
      <ul>
        <li><strong>Lawful Basis:</strong> Our lawful basis for processing the minimal data required is the performance of a contract (providing the BATON Service to you).</li>
        <li><strong>Data Minimization:</strong> We adhere strictly to the principles of data minimization and purpose limitation.</li>
        <li><strong>Data Subject Rights:</strong> You retain the right to access, rectify, erase, restrict processing, and request portability of your data, as well as the right to object to processing.</li>
        <li><strong>International Transfers:</strong> Any cross-border data transfers are safeguarded by appropriate mechanisms compliant with UK data protection laws.</li>
        <li><strong>Supervisory Authority:</strong> You have the right to lodge a complaint with the Information Commissioner's Office (ICO).</li>
        <li><strong>Impact Assessment:</strong> A Data Protection Impact Assessment (DPIA) has been conducted to ensure the structural privacy of our zero-knowledge architecture.</li>
      </ul>

      <h3>6.4 United Arab Emirates - Personal Data Protection Law (PDPL)</h3>
      <p>
        For users in the UAE, our data practices comply with the Federal Decree-Law No. 45 of 2021 regarding the Protection of Personal Data.
      </p>
      <ul>
        <li><strong>Lawful Basis:</strong> Processing is based on the necessity of performing the contract with you to deliver the Service.</li>
        <li><strong>Your Rights:</strong> You possess rights under the UAE PDPL, including the right to access, correct, and erase your personal data.</li>
        <li><strong>Cross-Border Transfers:</strong> We employ required safeguards for any international transfer of data, ensuring compliance with UAE regulations.</li>
        <li><strong>Supervisory Authority:</strong> Concerns can be directed to the UAE Data Office.</li>
      </ul>

      <h2>7. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy periodically. If we make material changes, we will notify you by updating the "Last Updated" date at the top of this policy and, if necessary, provide a prominent notice within the BATON app before the changes take effect.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
      </p>
      <p>
        <strong>Ekam Baton</strong><br />
        Email: <a href="mailto:ekam.baton@gmail.com">ekam.baton@gmail.com</a><br />
        Website: <a href="https://ekam-baton.github.io/baton-docs/" target="_blank" rel="noopener noreferrer">https://ekam-baton.github.io/baton-docs/</a>
      </p>

    </div>
  );
};

export default Privacy;
