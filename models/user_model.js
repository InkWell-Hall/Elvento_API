
import { model, Schema } from "mongoose";
import normalize  from 'normalize-mongoose';



export const userModel = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    accountNumber: {
        type: Number,
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ['Buyer', 'Vendor'],
        default: 'Buyer'
    },
    otp:{
        type: String,
        default: null
    },
    cartData: { type: Object, default: {} },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
    }

},{timestamps: true});

userModel.plugin(normalize)
export const User = model('User',userModel);