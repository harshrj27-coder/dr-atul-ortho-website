// Shared helper for the admin auth cookie. Works in both the Node runtime
// (API routes) and the Edge runtime (middleware) because it only uses the
// Web Crypto API (crypto.subtle), which both support.

export const ADMIN_COOKIE_NAME = "admin_session";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "changeme123";
}

export async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function getExpectedAdminToken(): Promise<string> {
  return sha256(`admin-session:${getAdminPassword()}`);
}
