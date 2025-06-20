import express from 'express';
import mongoose from 'mongoose';
import { MONGOURI, PORT } from './config/env.js';
import { userRoute } from './routes/user_route.js';



const app = express();

app.use(express.json());
app.use('/api/advert/V1/user',userRoute);

await mongoose.connect(MONGOURI);

app.listen(PORT, ()=> {
    console.log(`server is running on PORT: ${PORT}`);
})