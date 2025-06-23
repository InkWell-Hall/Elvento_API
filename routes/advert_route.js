import { Router } from "express";
import { createAdvert, deluserAdverts, getallAdverts, getalluserAdverts, getAuserAdverts, updateUserAdverts } from "../controllers/advert_controller.js";
import { authenticate } from "../middleware/auth.js";
import { multipleImages } from "../middleware/uploadfiles.js";


export const advertRoute = Router();

advertRoute.post('/advert',authenticate,multipleImages,createAdvert)
advertRoute.get('/allAdvert', getallAdverts)
advertRoute.get('/myAdvert',authenticate, getalluserAdverts) 
advertRoute.get('/user-advert/:id',authenticate, getAuserAdverts)
advertRoute.get('/user-advert/',authenticate, getAuserAdverts) // search adverts by name,category etc
advertRoute.delete('/delAdvert/:id',authenticate, deluserAdverts)
advertRoute.patch('/upAdvert/:id',authenticate, updateUserAdverts) 