import Joi from 'joi'

export const advertSchema = Joi.object ({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.string().required(),
    size: Joi.string().valid('s', 'm', 'l', 'xl').required(),
    category: Joi.string().valid('matchingSet', 'top', 'kids', 'beauty').required(), 
    subCategory: Joi.string().valid('topwear', 'bottomwear', 'dresses', 'jewellery', 'cosmetics').required(),
    bestSeller: Joi.boolean(),
    date: Joi.number().required(),
    // images: Joi.array()
    // .items(Joi.string().uri().required()) // if each string is a URL
    // .min(1)
    // .required(),
    user: Joi.string().required() 
});