import { registerAs } from '@nestjs/config';

export default registerAs('security', () => ({
  throttle: {
    ttl: parseInt(process.env.THROTTLE_TTL, 10) || 60,
    limit: parseInt(process.env.THROTTLE_LIMIT, 10) || 10,
  },
  cors: {
    origins: process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(',')
      : ['http://localhost:5173', 'https://simple-mern-auth-alpha.vercel.app'],
    credentials: true,
  },
}));
