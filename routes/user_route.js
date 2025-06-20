import { Router } from "express";
import { loginUser, signUp } from "../controllers/user_controller.js";


export const userRoute = Router();

userRoute.post('/auth/signUp',signUp);
userRoute.post('/auth/login',loginUser);