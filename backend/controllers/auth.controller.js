import User from "../model/user.model.js"
import validator from "validator"
import bcrypt from "bcryptjs"
import { genToken, genToken1 } from "../config/token.js"
export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existuser = await User.findOne({ email })
        if (existuser) {
            return res.status(400).json({ message: "User already exits" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Enter valid email" })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Enter strong password " })
        }

        const passwordhash = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: passwordhash
        })
        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure: false,
            httpOnly: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json(user);
    } catch (error) {
        console.log("Register error")
        return res.status(500).json({ message: "Registor error" })
    }


}









export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
        return res.status(404).json({ messge: "Email validator error" })
    }

    const user = await User.findOne({ email });

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
        return res.status(404).json({ message: "password invalid" });
    }
    if (!user) {
        return res.status(404).json({ message: "user not availaible" })
    }
    const token = genToken(user._id)
    console.log(token)
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(200).json(user);
}


export const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "Logout successfuly" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const googleauth = async (req, res) => {
    try {
        const { name, email } = req.body;
        let user = await User.findOne({ email });  // use let to reassign

        if (!user) {
            user = await User.create({ name, email }); // reassign outer variable
        }

        const token = await genToken(user._id); // token is a string

        res.cookie("token", token, {
            secure: false, // localhost me
            httpOnly: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json(user);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const adminLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = await genToken1(email); // token is a string                                
            res.cookie("token", token, {
                secure: false, // localhost me
                httpOnly: true,
                sameSite: "Strict",
                maxAge: 1 * 24 * 60 * 60 * 1000
            });

         return res.status(200).json(token)
        }
        return res.status(400).json({message:"Invalid Creditials"})
    } catch (error) {
     res.status(500).json({message:"Addmin Error"+error})
    }
}