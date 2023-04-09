import rateLimit from 'express-rate-limit';

const threeMinutes = 3 * 60 * 1000;

export const rateLimiter = rateLimit({
  windowMs: threeMinutes,
  max: 100,
  headers: false,
});
