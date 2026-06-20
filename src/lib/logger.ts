const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export async function logEvent(event: string, data?: Record<string, unknown>) {
  try {
    await fetch(`${BASE}/api/log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, data }),
    });
  } catch {
    // silently ignore
  }
}
