import { Redis } from "@upstash/redis";

class NoOpRedis {
  async get() {
    return null;
  }

  async set() {
    return true;
  }

  async del() {
    return true;
  }
}

const hasRedisConfig =
  Boolean(process.env.UPSTASH_REDIS_REST_URL) &&
  Boolean(process.env.UPSTASH_REDIS_REST_TOKEN);

export const redis = hasRedisConfig ? Redis.fromEnv() : new NoOpRedis();