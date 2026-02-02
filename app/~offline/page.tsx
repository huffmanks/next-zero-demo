"use client";

export default function OfflinePage() {
  return (
    <div>
      <h1>Youre Offline</h1>
      <p>But dont worry! You can still edit your data and it will sync when youre back.</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );
}
