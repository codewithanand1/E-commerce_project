import { askAI } from "../services/ai.service.js";


export const chatWithAI = async (req,res)=>{
  try{
    const {message} = req.body;
    const reply = await askAI(message);
   return res.json({
      success:true,
      reply
    })
  }catch(err){
    console.log(err.message)
   return res.status(500).json({
      error:err.message
    })
  }
}