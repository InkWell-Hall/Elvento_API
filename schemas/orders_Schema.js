
import Joi from 'joi';

export const orderSchema = Joi.object({
    cart: Joi.string().required(),

    address: Joi.string().required(),

    status: Joi.string().valid('order placed').default('order placed'),

    paymentMethod: Joi.string()
        .valid('cash on delivery', 'online payment', 'stripe')
        .required(),

    payment: Joi.boolean().default(false),

    user: Joi.string().required(),

    date: Joi.number().required()
});
