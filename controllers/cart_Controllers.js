// import { Cart } from "../models/cart_model.js"
// import { cartSchema } from "../schemas/cart_Schema.js"
// import { calculateCartSummary } from "../utils/help.js";

import { User } from "../models/user_model.js";


// export const getAllcarts = async(req, res) => {
//   try {
//     const userId = req.user.id;
//     if (!userId){
//       return res.status(400).json({message:'User ID is required'})
//     }
//     const carts = await Cart.find({ user: userId })
//       .populate({
//         path: "items.advert"})
//       .populate('user', '-password -otp'); // exclude password, otp field;
//     console.log('carts', carts);
//     res.status(200).json(carts);
//   } catch (error) {
//     return res.status(500).json({message: error.message});
//   }
// }

// export const cartStorage = async (req, res) => {
//   try {
//     const { error, value } = cartSchema.validate(req.body);
//     console.log('value', value);
//     if (error) {
//       return res.status(400).json({ message: error.details[0].message });
//     }

//     const cart = await Cart.create(value);
//     const populatedCart = await Cart.findById(cart._id)
//       .populate('items.advert')
//       .populate('user', '-password -otp'); // exclude password, otp field

//     const { itemCount, totalAmount } = calculateCartSummary(populatedCart);

//     await populatedCart.save(); // save the updated cart

//      res.status(201).json({
//       message: 'Cart created successfully',
//       cart: populatedCart,
//       itemCount,
//       totalAmount
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const updateCartItem = async (req, res) => {
//   try {
//     // the req.user.id is the id of the user that is logged in(meaning gotten from the token provided)
//     const userId = req.user.id;
//     // the req.params.id is the id of the cart that is being updated(this is placed in the url when the user wants to update a cart item eg:// /cart/:id)
//     const cartId = req.params.id;
//     // the req.body is the body of the request that is being sent to the server, it contains the advert id and the quantity of the item in the cart
//     const { advert, quantity } = req.body;

//     const cart = await Cart.findById(cartId);
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     // checks if the user that is trying to update the cart is the same user that created the cart(checks if the user id of the cart to be changed matches that in the token provided)
//     if (cart.user.toString() !== userId) {
//       return res.status(403).json({ message: 'Unauthorized' });
//     }

//     // checks for the adverts available in the cart, the ones that do not match it are saved and the ones that match are updated
//     const itemIndex = cart.items.findIndex(
//       item => item.advert.toString() === advert
//     );

//     // if the item index is -1, it means the item is not found in the cart....we all no that an array start from 0, so if the item index is -1, it means the item is not found in the cart
//     if (itemIndex === -1) {
//       return res.status(404).json({ message: 'Cart item not found' });
//     }
//     // if the quantity is not undefined, it means the user wants to update the quantity of the item in the cart
//     if (quantity !== undefined) {
//       cart.items[itemIndex].quantity = quantity;
//     }

//     // if the advert is not undefined, it means the user wants to update the advert of the item in the cart...undefined means the user does not want to update the advert of the item in the cart
//     await cart.save();
    
//     // ✅ Populate and calculate summary
//     const updatedCart = await Cart.findById(cartId)
//       .populate('items.advert')
//       .populate('user', '-password -otp');

//     const { itemCount, totalAmount } = calculateCartSummary(updatedCart);

//     await updatedCart.save(); // optional: if totalAmount is part of the model

//     return res.status(200).json({
//       message: 'Cart item updated',
//       cart: updatedCart,
//       itemCount,
//       totalAmount
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const deleteCartItem = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const cartId = req.params.id;
//     const { advert } = req.body;

//     const cart = await Cart.findById(cartId);
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     if (cart.user.toString() !== userId) {
//       return res.status(403).json({ message: 'Unauthorized' });
//     }

//     // checks for the adverts available in the cart, the ones that do not match it are saved and the ones that match are deleted
//     cart.items = cart.items.filter(item => item.advert.toString() !== advert);

//     await cart.save();

//     // ✅ Populate and calculate summary
//     const updatedCart = await Cart.findById(cartId)
//       .populate('items.advert')
//       .populate('user', '-password -otp');

//     const { itemCount, totalAmount } = calculateCartSummary(updatedCart);

//     await updatedCart.save(); // optional: if totalAmount is part of the model

//     return res.status(200).json({
//       message: 'Cart item deleted',
//       cart: updatedCart,
//       itemCount,
//       totalAmount
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// export const getUserCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const cartId = req.params.id;

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized access" });
//     }

//     if (!cartId) {
//       return res.status(400).json({ message: "Cart ID is required" });
//     }

//     const cart = await Cart.findOne({ _id: cartId, user: userId })
//       .populate("items.advert")
//       .populate("user", "-password -otp");

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     return res.status(200).json({ cart });
//   } catch (err) {
//     console.error("Error fetching cart by ID:", err);
//     return res.status(500).json({ message: err.message });
//   }
// };



//add products to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    if (!userId || !itemId || !size) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Fallback if undefined

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (!cartData[itemId][size]) {
      cartData[itemId][size] = 0;
    }

    cartData[itemId][size] += 1;

    await User.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


//update user cart
const updateCart = async (req,res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await User.findById(userId);
    let cartData = await userData.cartData;


    cartData[itemId][size] = quantity;

    await User.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//add products to user cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.user.id;
    const cartID = req.params.id;

    const userData = await User.findById(cartID);
    let cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };