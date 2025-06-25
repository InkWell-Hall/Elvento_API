// import { Router } from "express";
// import { createAdvert, deluserAdverts, getallAdverts, getalluserAdverts, getAuserAdverts, getOrderedAdvert, updateUserAdverts } from "../controllers/advert_controller.js";
// import { authenticate, hasPermission } from "../middleware/auth.js";
// import { multipleImages } from "../middleware/uploadfiles.js";


// export const advertRoute = Router();

// advertRoute.post('/advert',authenticate,hasPermission("createAdvert"),multipleImages,createAdvert)
// advertRoute.get('/allAdvert', getallAdverts)
// advertRoute.get('/myAdvert',authenticate,hasPermission("getalluserAdverts"),getalluserAdverts) 
// advertRoute.get('/user-advert/:id',authenticate,hasPermission("getAuserAdverts"),getAuserAdverts)
// advertRoute.get('/user-advert/',authenticate,hasPermission("getAuserAdverts"),getAuserAdverts) // search adverts by name,category etc
// advertRoute.delete('/delAdvert/:id',authenticate,hasPermission("deluserAdverts"),deluserAdverts)
// advertRoute.patch('/upAdvert/:id',authenticate,hasPermission("updateUserAdverts"),updateUserAdverts)
// advertRoute.get('/ordersAdevrt', authenticate,hasPermission("getOrderedAdvert"), getOrderedAdvert)

import express from "express"
import { listProducts, addProduct, removeProduct, singleProduct, updateUserproduct, getAuserProduct, getalluserProduct } from "../controllers/advert_controller.js"
import upload from "../middleware/multer.js";
import { authenticate, hasPermission } from "../middleware/auth.js";

export const productRouter = express.Router();


productRouter.post("/add",authenticate ,upload.fields([{name: "image1", maxCount:1}, {name: "image2", maxCount:1},{name: "image3", maxCount:1},{name: "image4", maxCount:1}]),hasPermission("addProduct"), addProduct)
productRouter.get("/list", listProducts)
productRouter.post("/remove", authenticate ,hasPermission("removeProduct"),removeProduct)
productRouter.post("/single", singleProduct)
productRouter.patch("/single/:id", authenticate ,hasPermission("updateUserproduct"),updateUserproduct)
productRouter.get("/single/:id", authenticate ,hasPermission("getAuserProduct"),getAuserProduct)
productRouter.get("/allProduct/", authenticate ,hasPermission("getalluserProduct"),getalluserProduct)
productRouter.get("/single", authenticate ,hasPermission("getAuserProduct"),getAuserProduct) // using query of categories, name etc.

