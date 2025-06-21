
import Joi from 'joi';

export const orderSchema = Joi.object({
    items: Joi.array().min(1).required(),

    amount: Joi.string().required(),

    address: Joi.string().required(),

    status: Joi.string().valid('order placed').default('order placed'),

    paymentMethod: Joi.string()
        .valid('cash on delivery', 'online payment', 'stripe')
        .required(),

    payment: Joi.boolean().default(false),

    date: Joi.number().required(),

    advert: Joi.string().required()
});
