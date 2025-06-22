import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { cartStorage, getCartWithTotal,  updateCartItem } from "../controllers/cart_Controllers.js";

export const cartRoute = Router();

cartRoute.post('/cart', authenticate,cartStorage)
cartRoute.post('/cart/:id', authenticate,updateCartItem)
cartRoute.get('/cart', authenticate,getCartWithTotal)