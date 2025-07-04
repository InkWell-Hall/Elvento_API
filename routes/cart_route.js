import { Router } from "express";
import { authenticate, hasPermission } from "../middleware/auth.js";
import { addToCart, delUserCart, getUserCart,  updateCart, } from "../controllers/cart_Controllers.js";

export const cartRoute = Router();

// cartRoute.post('/cart', authenticate,hasPermission("cartStorage"),cartStorage)
// cartRoute.patch('/cart/:id', authenticate,hasPermission("updateCartItem"),updateCartItem)
// cartRoute.delete('/cart/:id', authenticate,hasPermission("deleteCartItem"),deleteCartItem)
// cartRoute.get('/cart/:id', authenticate,hasPermission("getUserCart"),getUserCart)
// cartRoute.get('/cart', authenticate,hasPermission("getAllcarts"),getAllcarts)

cartRoute.get("/get/:id", authenticate, getUserCart);
cartRoute.post("/cart/add", authenticate, addToCart);
cartRoute.patch("/update", authenticate, updateCart);
cartRoute.delete("/delete/:itemId", authenticate, delUserCart);