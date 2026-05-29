import dotenv from 'dotenv';

dotenv.config();

export const {
  NODE_ENV = 'development',
  PORT = 8000,
  MONGODB_URL,
  DB_NAME,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY = '15m',
  REFRESH_TOKEN_EXPIRY = '7d',
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CORS_ORIGIN = 'http://localhost:5173',
} = process.env;
