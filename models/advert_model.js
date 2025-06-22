

import { model, Schema } from "mongoose";
import normalize from 'normalize-mongoose';

export const advertModel = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    size: {
        type: String,
        enum:['s', 'm', 'l', 'xl','xxl'],
        required: true
    },
    category: {
        type: String,
        enum:['matchingSet', 'top', 'kids', 'beauty'],
        required: true
    },
    subCategory: {
        type: String,
        enum: ['topwear', 'bottomwear', "dresses", "jewellery","cosmetics"],
        required: true
    },
    bestSeller:{
        type: Boolean,
    },
    date:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    }

},{timestamps: true});

advertModel.plugin(normalize)
export const Advert = model('Advert',advertModel);