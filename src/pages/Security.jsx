import React from 'react';

export default function Security() {
  return (
    <div className="animate-fade-in inner-page">
      <h1>Security</h1>
      <p className="page-intro">
        How BATON encrypts your conversations and why the relay server can't read them.
      </p>

      <h2>The short version</h2>
      <p>
        Your phone and your computer exchange cryptographic keys when they pair. After that, every
        message is encrypted on the sending device and decrypted on the receiving device. The relay
        server in between handles routing — it sees encrypted packets go from point A to point B,
        but it cannot decrypt them. We don't have the keys. We don't want the keys.
      </p>

      <h2>Key exchange and encryption</h2>
      <p>
        BATON uses the same fundamental primitives as Signal and WireGuard. During pairing,
        both devices perform an X25519 Diffie-Hellman key agreement to establish a shared secret.
        All subsequent messages are encrypted with AES-256-GCM using unique initialization
        vectors per frame.
      </p>

      <table className="specs-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Implementation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Key agreement</td>
            <td>Elliptic-curve Diffie-Hellman over Curve25519 (X25519)</td>
          </tr>
          <tr>
            <td>Symmetric cipher</td>
            <td>AES-256-GCM with unique non-repeating IVs</td>
          </tr>
          <tr>
            <td>Signatures</td>
            <td>Ed25519 / ECDSA (secp256r1), hardware-backed</td>
          </tr>
          <tr>
            <td>Message authentication</td>
            <td>HMAC-SHA256</td>
          </tr>
          <tr>
            <td>Local database</td>
            <td>SQLCipher with 256-bit AES page encryption</td>
          </tr>
        </tbody>
      </table>

      <h2>Hardware keystore</h2>
      <p>
        Private keys are generated inside your phone's hardware security module — Android Keystore
        (TEE or StrongBox) on Android, Secure Enclave on iOS. The key material never leaves the
        chip. Accessing it requires biometric authentication (fingerprint or face).
      </p>
      <p>
        On the desktop side, keys are stored in the OS credential manager (Windows DPAPI / macOS Keychain).
        The BATON connector binary runs under your user account and never requests elevated permissions.
      </p>

      <h2>What the relay server sees</h2>
      <p>
        The relay server is a Rust WebSocket process that inspects exactly one field in each
        incoming packet: the <code>destination_id</code> header. It uses this to route the
        encrypted envelope to the correct recipient. It does not — and structurally cannot —
        decrypt the payload.
      </p>
      <p>
        We designed it this way on purpose. The simplest way to protect data is to never have it.
        Even if the relay server were compromised, the attacker would get encrypted blobs and
        no keys.
      </p>

      <h2>Local storage</h2>
      <p>
        Chat history is stored on-device in a SQLCipher-encrypted database. The encryption key
        is derived from your biometric-gated hardware keystore credential. On Android,
        <code>allowBackup="false"</code> prevents the encrypted database from leaking
        through cloud backup services.
      </p>

      <h2>Audit trail (optional)</h2>
      <p>
        For teams that need verifiable records, BATON can maintain a Merkle tree hash chain
        of system actions. Each log entry includes the cryptographic hash of the previous entry,
        making any tampering immediately detectable. The resulting archive is compatible with
        ISO/IEC 27037 evidence handling and can be exported as a signed <code>.zip</code> package.
      </p>
      <p>
        This feature is off by default for personal use and can be enabled through the enterprise
        configuration.
      </p>
    </div>
  );
}
