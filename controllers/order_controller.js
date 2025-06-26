// import { Cart } from "../models/cart_model.js";
// import { Order } from "../models/order_model.js"
// import { orderSchema } from "../schemas/orders_Schema.js"


// export const newOrder = async (req, res) => {
//     try {
//         const userId = req.user.id;

//         // Validate the request body against the order schema
//         const { error, value } = orderSchema.validate(req.body);

//         if (error) {
//             return res.status(400).json({ message: error.details[0].message });
//         }

//         if (!value || !value.cart) {
//             return res.status(400).json({ message: 'Cart ID is required' });
//         }

//         // Check if the cart exists and belongs to the authenticated user
//         const cart = await Cart.findById(value.cart);
//         if (!cart) {
//             return res.status(404).json({ message: 'Cart not found' });
//         }
//         if (cart.user.toString() !== userId) {
//             return res.status(401).json({ message: 'Unauthorized to order from this cart' });
//         }

//         // Create the order
//         const order = await Order.create({
//             ...value,
//             user: userId,
//             date: Date.now(),
//             amount: cart.totalAmount // assign totalAmount to amount field
//         });
//         const populatedOrder = await Order.findById(order._id)
//             .populate('user', '-password -otp') // exclude password, otp field
//             .populate({
//                 path: 'cart',
//                 populate: {
//                     path: 'items.advert',
//                 }
//             });
//         return res.status(201).json({ message: 'Order Made Successful', order: populatedOrder });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };




// export const getOrders = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const orders = await Order.find({ user: userId })
//             .populate('user', '-password -otp') // exclude password, otp field
//             .populate({
//                 path: 'cart',
//                 populate: {
//                     path: 'items.advert',
//                 }
//             });
//         return res.status(200).json({ orders });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const getOneOrder = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const orderId = req.params.id;
//         if (!orderId) {
//             return res.status(400).json({ message: 'order ID is required' })
//         }
//         const order = await Order.findOne({ _id: orderId, user: userId })
//             .populate('user', '-password -otp')
//             .populate({
//                 path: 'cart',
//                 populate: {
//                     path: 'items.advert',
//                 },
//             });

//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }
//         return res.status(200).json({ order });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };


// import { currency } from "../../admin/src/App.jsx";
import { STRIPE_SECRET_KEY } from "../config/env.js";
import { Order } from "../models/order_model.js";
import { User } from "../models/user_model.js";
import Stripe from "stripe";

//Global variables
const currency = "usd"
const deliveryCharge = 10
//GATEWAY INITIALIZE
const stripe = new Stripe(STRIPE_SECRET_KEY)


//placing orders using COD method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//placing orders using Stripe method
const placeOrderStripe = async (req, res) => {
  try {
    
    const { userId, items, amount, address } = req.body;
    const {origin} = req.headers;

    
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();
    
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name
      },
      unit_amount: item.price * 100
      },
      quantity: item.quantity
    }))

    line_items.push({
    price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges"
      },
      unit_amount: deliveryCharge * 100
      },
      quantity:1
    });

    const session = await stripe.checkout.sessions.create({
          success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
          cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
          line_items,
          mode: "payment",
    })

    res.json({success:true, session_url:session.url})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Verify stripe
const verifyStripe = async (req,res) => {
  const {orderId, success, userId} = req.body
  try {
    if(success === "true") {
      await Order.findByIdAndUpdate(orderId, {payment:true});
      await User.findByIdAndUpdate(userId, {cartData: {}}) 
      res.json({success:true});
    } else {
      await Order.findByIdAndDelete(orderId)
      res.json({success:false})
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//placing orders using RazorPay method
const placeOrderRazorpay = async (req, res) => {};

//All orders data for admin panel
const allOrders = async (req, res) => {
  try {
    
    const orders = await Order.find({})
    res.json({success:true, orders})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//User Order data for frontend
const userOrders = async (req, res) => {
  try {
    const {userId} = req.body

    const orders = await Order.find({userId})
    res.json({success:true, orders})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//update order status for admin panel
const updateStatus = async (req, res) => {
  try {
    const {orderId, status } = req.body

    await Order.findByIdAndUpdate(orderId, {status })
    res.json({success:true, message:"Status Updated"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateStatus,
  userOrders,
  allOrders,
  verifyStripe
};