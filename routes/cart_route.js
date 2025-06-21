import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { cartStorage } from "../controllers/cart_Controllers.js";

export const cartRoute = Router();

cartRoute.post('/cart', authenticate,cartStorage)