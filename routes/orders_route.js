import { Router } from "express";
import { getOneOrder, getOrders, newOrder } from "../controllers/order_controller.js";
import { authenticate } from "../middleware/auth.js";



export const ordersRoute = Router();

ordersRoute.post('/order',authenticate, newOrder);
ordersRoute.get('/order',authenticate, getOrders);
ordersRoute.get('/order/:id',authenticate, getOneOrder); 
