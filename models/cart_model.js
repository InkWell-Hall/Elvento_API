import { model, Schema } from "mongoose";
import normalize from 'normalize-mongoose'

export const cartModel = new Schema({
    items: [
        {
            advert: {
                type: Schema.Types.ObjectId,
                ref: 'Advert',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateAdded: {
        type: Number,
        required: true
    }
});

cartModel.plugin(normalize);

export const Cart = model('Cart', cartModel);