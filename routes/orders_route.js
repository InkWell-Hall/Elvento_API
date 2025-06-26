import { Router } from "express";
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders, verifyStripe } from "../controllers/order_controller.js";
import { authenticate, hasPermission } from "../middleware/auth.js";



export const ordersRoute = Router();

// ordersRoute.post('/order',authenticate,hasPermission("newOrder"),newOrder);
// ordersRoute.get('/order',authenticate,hasPermission("getOrders"),getOrders);
// ordersRoute.get('/order/:id',authenticate,hasPermission("getOneOrder"),getOneOrder);

//Admin Features
ordersRoute.post("/order/list",allOrders);
ordersRoute.post("/status",updateStatus);

// Payment Routes
ordersRoute.post("/place", placeOrder);
ordersRoute.post("/razorpay", placeOrderRazorpay);
ordersRoute.post("/stripe", placeOrderStripe);

//user feature
ordersRoute.post("/userorders", userOrders);

//verify payment
ordersRoute.post("/verifyStripe", verifyStripe)