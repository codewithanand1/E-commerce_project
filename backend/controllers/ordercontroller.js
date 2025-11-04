import Order from "../middleware/orderModel.js";
import User from "../model/user.model.js";
import razorpay from "razorpay"
import dotenv from "dotenv"
dotenv.config()
const currency="inr"
const razorpayInstance=new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
    
})




export const placeOrder=async (req,res) => {
    try {
        const {items,amount,address}=req.body;
        const userId=req.userId;
        const orderData={
            items,
            amount,
            userId,
            address,
            PaymentMethod:'COD',
            payment:false,
            date:Date.now()
        }
        const neworder=new Order(orderData);
        await neworder.save();
        await User.findByIdAndUpdate(userId,{cartData:{}});

        return res.status(201).json({message:'Order Place'})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'order Place error'})
    }
}


export const placeOrderRazorpay=async (req,res) => {
    try {
        const {items,amount,address}=req.body;
        const userId=req.userId;
        const orderData={
            items,
            amount,
            userId,
            address,
            PaymentMethod:'Razorpay',
            payment:false,
            date:Date.now()
        }
        const newOrder=new Order(orderData)
        await newOrder.save()

        const options={
            amount:amount*100,
            currency:currency.toUpperCase(),
            receipt:newOrder._id.toString()
        }
        await razorpayInstance.orders.create(options,(error,order)=>{
            if(error)
            {
                console.log(error)
                return res.status(500).json(error)
            }
            res.status(200).json(order)
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error razorpay"})
    }
}



export const verifyRazorpay=async (req,res) => {
    try {
        const userId=req.userId;
        const{razorpay_order_id}=req.body;
        const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id);
        if(orderInfo.status==="paid")
        {
            await Order.findByIdAndUpdate(orderInfo.receipt,{payment:true});
           return res.status(200).json({messaeg:"Payment Successfuly"})
        }
        else{
          return  res.json({message:"Payment Failed"});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Payment Error not payment successfuly"})
    }
}



export const userOrders=async (req,res) => {
    try {
        const userId=req.userId;
        const orders=await Order.find({userId});
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"userOrders error"});
    }
}



//for Admin
export const allOrders=async (req,res) => {
    try {
        const orders=await Order.find({});
        res.status(200).json(orders)
    } catch (error) {
       console.log(error);
       
       return res.status(500).json({message:"adminAllOrders Error"})
    }
}



export const updateStatus=async (req,res) => {
    try {
        const {orderId,status}=req.body;
        await Order.findByIdAndUpdate(orderId,{status})
        await res.status(201).json({message:"Status Upadted"});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}