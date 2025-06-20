import Joi from "joi";

export const usermodel = Joi.object({
    userName: Joi.string().min(3).max(50).required(),
    email: Joi.string().required(),
    password: Joi.string().min(5).max(50).required(),
    ghanaCard: Joi.string().min(15).required(),
    location: Joi.string().required(),
    accountNumber: Joi.number().min(6).max(34).required(),
    phoneNumber: Joi.number().min(8).max(15).required(),
    role: Joi.string().valid('Buyer', 'Vendor').default('Buyer')
})
export const signUpSchema = Joi.object({
    userName: Joi.string().min(3).max(50).required(),
    email: Joi.string().required(),
    password: Joi.string().min(5).max(50).required(),
    confirmPassword: Joi.string().min(5).max(50).required().valid(Joi.ref('password')),
    ghanaCard: Joi.string().min(15).required(),
    location: Joi.string().required(),
    accountNumber: Joi.string().min(6).max(34).required(),
    phoneNumber: Joi.string().min(8).max(15).required(),
    role: Joi.string().valid('Buyer', 'Vendor').default('Buyer')
})
export const loginSchema = Joi.object({
    Email: Joi.string().required(),
    Password: Joi.string().min(5).max(50).required(),
})