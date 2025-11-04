// import jwt from "jsonwebtoken"
// const isAuth=async (req,res,next) => {
//     try {
//         const {token}=req.cookies;
//         console.log("Hii"+req.cookies)
//         if(!token)
//         {
//             return  res.status(400).json({message:"User does not have tokrn"});

//         }
//       let verifytoken=await jwt.verify(token,process.env.JWT_SECRET);
//       if(!verifytoken)
//       {
//      return  res.status(400).json({message:"User does not have tokrn"});
//       }

//       req.userId=verifytoken.userId;
//       next()
//     } catch (error) {
//         console.log(error)
// return  res.status(500).json({message:"isAuth error"});
//     }
// }
// export default isAuth
import jwt from "jsonwebtoken";

const isAuth =async (req, res, next) => {
  try {
    const { token } = req.cookies;

    console.log("Cookies:", req.cookies);

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: "User does not have token" });
    }

    // Verify token
    const decoded =await jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default isAuth;
