
import { model, Schema } from "mongoose";
import normalize from 'normalize-mongoose';

export const orderModel = new Schema({
    items: {
        type: Array,
        required: true
    },
    amount: {
        type: String,
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
        enum: ['cash on delivery', 'online payment']
    },
    payment: {
        type: Boolean,
        required: true,
        default: false
    },
    date:{
        type: Number,
        required: true
    },
    // user:{
    //     type: Schema.Types.ObjectId,
    //     ref:'User',
    //     required: true
    // },
    advert:{
        type: Schema.Types.ObjectId,
        ref:'Advert',
        required: true
    }

});

orderModel.plugin(normalize)
export const Order = model('Order',orderModel);