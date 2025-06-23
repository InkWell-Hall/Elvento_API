import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { cartStorage, deleteCartItem, getAllcarts, getUserCart,  updateCartItem } from "../controllers/cart_Controllers.js";

export const cartRoute = Router();

cartRoute.post('/cart', authenticate,cartStorage)
cartRoute.patch('/cart/:id', authenticate,updateCartItem)
cartRoute.delete('/cart/:id', authenticate,deleteCartItem)
cartRoute.get('/cart/:id', authenticate,getUserCart)
cartRoute.get('/cart', authenticate,getAllcarts)