import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { MONGOURI} from './config/env.js';
import { userRoute } from './routes/user_route.js';
import { productRouter } from './routes/advert_route.js';
import { ordersRoute } from './routes/orders_route.js';
import { cartRoute } from './routes/cart_route.js';
import connectCloudinary from './utils/cloudinary.js';



const app = express();

app.use(express.json());
app.use(cors());
connectCloudinary();
app.use('/api/V1/user',userRoute);
// app.use('/api/V1/user',advertRoute);
app.use('/api/V1/user',productRouter);
app.use('/api/V1/user',ordersRoute);
app.use('/api/V1/user',cartRoute);

const PORT = process.env.PORT || 7600;
await mongoose.connect(MONGOURI);

app.listen(PORT, ()=> {
    console.log(`server is running on PORT: ${PORT}`);
})