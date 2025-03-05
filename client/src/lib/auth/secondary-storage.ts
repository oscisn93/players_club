import { Redis } from "@upstash/redis";
import type { SecondaryStorage } from "better-auth";
import { env } from "@/env";

/**
 * Secodary Storage is used by BetterAuth to
 * store Session data and Rate Limit counters
 */

const client = new Redis({
  url: env.UPSTASH_REDIS_URL,
  token: env.UPSTASH_AUTH_TOKEN,
});

async function getter(key: string) {
  const value = await client.get<string>(key);
  return value ? value : null;
}

async function setter(key: string, value: string, ttl?: number) {
  if (ttl) {
    await client.set(key, value, { ex: ttl });
  } else await client.set(key, value);
}

async function destroyer(key: string) {
  await client.del(key);
}

export const secondaryStorage = {
  get: getter,
  set: setter,
  delete: destroyer,
} satisfies SecondaryStorage;
