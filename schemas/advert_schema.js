import Joi from 'joi'

export const advertSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    size: Joi.array()
        .items(Joi.string().valid('S', 'M', 'L', 'XL', 'XXL'))
        .min(1)
        .required(),
    category: Joi.string().valid('matchingSet', 'top', 'kids', 'beauty').required(),
    subCategory: Joi.string().valid('topwear', 'bottomwear', 'dresses', 'jewellery', 'cosmetics').required(),
    bestSeller: Joi.boolean(),
    date: Joi.number(),
});