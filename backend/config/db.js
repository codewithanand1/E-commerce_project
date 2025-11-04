import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const connectdb=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connnect successfuly")
    } catch (error) {
        console.log("Db not connect "+error);
    }

}
export default connectdb;