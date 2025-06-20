
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
        required: true
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
    }

});

userModel.plugin(normalize)
export const User = model('User',userModel);