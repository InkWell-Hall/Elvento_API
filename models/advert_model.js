

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
        type: [String],
        enum: ['S', 'M', 'L', 'XL', 'XXL'],
        required: true
    },
    category: {
        type: String,
        enum: ['matchingSet', 'top', 'kids', 'beauty'],
        required: true
    },
    subCategory: {
        type: String,
        enum: ['topwear', 'bottomwear', "dresses", "jewellery", "cosmetics"],
        required: true
    },
    bestSeller: {
        type: Boolean,
    },
    date: {
        type: Number,
    },
    images: {
        type: [String],
        default: [],
        required: true
    }


}, { timestamps: true });

advertModel.plugin(normalize)
export const Advert = model('Advert', advertModel);