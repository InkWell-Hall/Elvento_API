
import { model, Schema } from "mongoose";
import normalize from 'normalize-mongoose';

export const orderModel = new Schema({
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'order placed'
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['cash on delivery', 'online payment', 'stripe']
    },
    payment: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Number,
        required: true
    }
    
},{timestamps: true});

orderModel.plugin(normalize)
export const Order = model('Order', orderModel);