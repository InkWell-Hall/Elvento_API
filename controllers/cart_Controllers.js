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

export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartId = req.params.id;
    const { advert, quantity } = req.body;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    if (cart.user.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const itemIndex = cart.items.findIndex(
      item => item.advert.toString() === advert
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    if (quantity !== undefined) {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    const updatedCart = await Cart.findById(cartId).populate('items.advert');

    return res.status(200).json({ message: 'Cart item updated', updatedCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const getCartWithTotal = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      throw new Error("User ID is required");
    }
    const cart = await Cart.findOne({ user: userId }).populate("items.advert");
    if (!cart) {
      return res.status(400).json({ message: "Cart not found", totalAmount: 0, itemCount: 0 });
    }

    // calculate number of items

    let total = 0;
    const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
    console.log("itemCount", itemCount);

    // calculate total of items

    cart.items.forEach(item => {
      if (item.advert && item.advert.price) {
        total += item.quantity * item.advert.price;
      }
    });

    cart.totalAmount = parseFloat(total.toFixed(2));

    return res.status(200).json ({ cart, totalAmount: cart.totalAmount, itemCount });
  } catch (err) {
    console.error("Error calculating cart total:", err);
    throw err;
  }
};
