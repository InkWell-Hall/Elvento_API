import { Router } from "express";
import { createAdvert, deluserAdverts, getallAdverts, getalluserAdverts, updateUserAdverts } from "../controllers/advert_controller.js";
import { authenticate } from "../middleware/auth.js";


export const advertRoute = Router();

advertRoute.post('/advert',authenticate, createAdvert)
advertRoute.get('/allAdvert', getallAdverts)
advertRoute.get('/myAdvert',authenticate, getalluserAdverts)
advertRoute.delete('/delAdvert/:id',authenticate, deluserAdverts)
advertRoute.patch('/upAdvert/:id',authenticate, updateUserAdverts)