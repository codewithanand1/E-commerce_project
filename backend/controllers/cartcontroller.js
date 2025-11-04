import User from "../model/user.model.js";


export const addTocart=async (req,res) => {
    try {
        const{itemId,size}=req.body;
        const userData=await User.findById(req.userId);

        //check if user exist
        if(!userData)
        {
            return res.status(404).json({message:"User Not Found"})
        }
        //Ensure cartData is initilized
        let cartData=userData.cartData||{};

        if(cartData[itemId])
        {
            if(cartData[itemId][size])
            {
                cartData[itemId][size]+=1
            }
            else{
                cartData[itemId][size]=1;
            }
        }
        else{
            cartData[itemId]={}
            cartData[itemId][size]=1
        }
        await User.findByIdAndUpdate(req.userId,{cartData});

        return res.status(201).json({message:"added to cart"});
    } catch (error) {
        return res.status(500).json({message:"addtocart error"})
    }
}

export const UpdateCart=async (req,res) => {
    try {
        const {itemId,size,quantity}=req.body;
        const userdata=await User.findById(req.userId);
        let cartData=await userdata.cartData;
        cartData[itemId][size]=quantity;

        await User.findByIdAndUpdate(req.userId,{cartData})

        return res.status(201).json({message:"cart updated"})
    } catch (error) {
        return res.status(500).json({message:"updateCart error"})
    }
}


export const getUsercart=async (req,res) => {
    try {
        const userData=await User.findById(req.userId);
        let cartData=await userData.cartData;

        return res.status(200).json(cartData)
    } catch (error) {
       return res.status(500).json({message:"getUserCart error"}) 
    }
}