import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// This client works in "mock mode" until you set NEXT_PUBLIC_SUPABASE_URL /
// NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local. API routes check
// isSupabaseConfigured() and fall back to logging + an in-memory response so
// the booking / newsletter forms remain fully usable during development.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey && !url.includes("your-project"));
}

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!client) {
    client = createClient(url as string, anonKey as string);
  }
  return client;
}

// Server-only admin client (uses the service role key — bypasses RLS).
// Only import this from API routes / server code, never from client
// components.
let adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey || url.includes("your-project")) return null;
  if (!adminClient) {
    adminClient = createClient(url, serviceKey);
  }
  return adminClient;
}
