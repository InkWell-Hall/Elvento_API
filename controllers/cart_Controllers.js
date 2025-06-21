import { Cart } from "../models/cart_model.js"
import { cartSchema } from "../schemas/cart_Schema.js"

export const cartStorage = async (req, res) => {
    try {
        const { error, value } = cartSchema.validate(req.body)
        console.log('value', value)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        const cart = await Cart.create(value)
        const populatedCart = await Cart.findById(cart._id)
            .populate('items.advert')
            .populate('user');

        res.status(201).json(populatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



export const getCartWithTotal = async (userId) => {
  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.advert");

    if (!cart) {
      return { message: "Cart not found", totalAmount: 0 };
    }

    let total = 0;

    cart.items.forEach(item => {
      if (item.advert && item.advert.price) {
        total += item.quantity * item.advert.price;
      }
    });

    cart.totalAmount = parseFloat(total.toFixed(2)); // optional: update cart
    await cart.save();

    return {
      cart,
      totalAmount: cart.totalAmount
    };

  } catch (err) {
    console.error("Error calculating cart total:", err);
    throw err;
  }
};