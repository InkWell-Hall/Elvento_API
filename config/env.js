
import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 7600;

export const MONGOURI = process.env.MONGO_URI

export const secret = process.env.JWT_SECRET


export const SMTP_USER = process.env.SMTP_USER
export const SMTP_PASS = process.env.SMTP_PASS