import jwt from "jsonwebtoken"

 export const genToken=(userId) => {
    try {
        const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"});
        console.log(token)
        return token;

    } catch (error) {
    console.log("Token error"+error)
    }
}



 export const genToken1=(email) => {
    try {
        const token=jwt.sign({email},process.env.JWT_SECRET,{expiresIn:"1d"});
        console.log(token)
        return token;

    } catch (error) {
    console.log("Token error"+error)
    }
}


