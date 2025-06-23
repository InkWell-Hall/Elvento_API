import { Router } from "express";
import { getOneOrder, getOrders, newOrder } from "../controllers/order_controller.js";
import { authenticate, hasPermission } from "../middleware/auth.js";



export const ordersRoute = Router();

ordersRoute.post('/order',authenticate,hasPermission("newOrder"),newOrder);
ordersRoute.get('/order',authenticate,hasPermission("getOrders"),getOrders);
ordersRoute.get('/order/:id',authenticate,hasPermission("getOneOrder"),getOneOrder); 
