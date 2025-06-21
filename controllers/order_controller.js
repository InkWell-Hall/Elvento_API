import { Order } from "../models/order_model.js"
import { orderSchema } from "../schemas/orders_Schema.js"



export const newOrder = async (req,res) => {
    try {
        const {error,value} = orderSchema.validate(req.body)
        console.log('value',value)
        if(error) {
            return res.status(400).json({message: error.details[0].message})
        }

        if(value){
            const order = (await Order.create(value)).populate('advert')
            return res.status(201).json({message:'Order Made Successful', order})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}