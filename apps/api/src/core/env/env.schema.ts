import { z } from 'zod';

export const schema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),

  API_HOST: z.string(),
  API_PORT: z.coerce.number(),
  API_PREFIX: z.string(),

  CORS_ORIGIN: z.string(),
  CORS_ALLOWED_METHODS: z.string(),
});
