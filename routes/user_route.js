import { Router } from "express";
import { allUser, aUser, loginUser, signUp } from "../controllers/user_controller.js";


export const userRoute = Router();

userRoute.post('/auth/signUp',signUp);
userRoute.post('/auth/login',loginUser);
userRoute.get('/auth/allUsers',allUser);
userRoute.get('/auth/aUser/:id',aUser);