import { Router } from "express";
import { newOrder } from "../controllers/order_controller.js";
import { authenticate } from "../middleware/auth.js";



export const ordersRoute = Router();

ordersRoute.post('/order',authenticate, newOrder);