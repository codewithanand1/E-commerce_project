import jwt from "jsonwebtoken"

const adminAuth = async (req, res, next) => {


    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(400).json({ message: "NOt Authorized Login Again" })
        }

        let verifyToken = jwt.verify(token,process.env.JWT_SECRET)

        if (!verifyToken) {
            return res.status(400).json({ message: "NOT Authorized Login Again ,Invalid Token" })
        }

        req.adminEmail = process.env.ADMIN_EMAIL
        next()
    } catch (error) {
        console.error(" Admin Auth Middleware Error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export default adminAuth