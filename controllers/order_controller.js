import { Cart } from "../models/cart_model.js";
import { Order } from "../models/order_model.js"
import { orderSchema } from "../schemas/orders_Schema.js"


export const newOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        // Validate the request body against the order schema
        const { error, value } = orderSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        if (!value || !value.cart) {
            return res.status(400).json({ message: 'Cart ID is required' });
        }

        // Check if the cart exists and belongs to the authenticated user
        const cart = await Cart.findById(value.cart);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        if (cart.user.toString() !== userId) {
            return res.status(401).json({ message: 'Unauthorized to order from this cart' });
        }

        // Create the order
        const order = await Order.create({
            ...value,
            user: userId,
            date: Date.now(),
            amount: cart.totalAmount // assign totalAmount to amount field
        });
        const populatedOrder = await Order.findById(order._id)
            .populate('user', '-password -otp') // exclude password, otp field
            .populate({
                path: 'cart',
                populate: {
                    path: 'items.advert',
                }
            });
        return res.status(201).json({ message: 'Order Made Successful', order: populatedOrder });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};




export const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ user: userId })
            .populate('user', '-password -otp') // exclude password, otp field
            .populate({
                path: 'cart',
                populate: {
                    path: 'items.advert',
                }
            });
        return res.status(200).json({ orders });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getOneOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(400).json({ message: 'order ID is required' })
        }
        const order = await Order.findOne({ _id: orderId, user: userId })
            .populate('user', '-password -otp')
            .populate({
                path: 'cart',
                populate: {
                    path: 'items.advert',
                },
            });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).json({ order });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};