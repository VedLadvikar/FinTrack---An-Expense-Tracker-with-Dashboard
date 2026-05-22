import User from "../models/userModel.js"
import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" })
}


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All Fields are Required",
            success: false
        })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Email"
        })
    }
    if (password.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Password length must be at least 8 characters"
        })
    }

    try {
        if (await User.findOne({ email })) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            })
        }


        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashed
        })
        const token = createToken(user._id);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: { token, user: { id: user._id, name: user.name, email: user.email } }
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Both fields are required"
        })
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const token = createToken(user._id);
        res.json({
            success: true,
            message: "Login successful",
            data: { token, user: { id: user.id, name: user.name, email: user.email } }
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("name email")
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }
        res.json({
            success: true,
            data: { user }
        })

    }
    catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const updateProfile = async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email || !validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Enter Valid Email or Name"
        })
    }

    try {
        const exists = await User.findOne({ email, _id: { $ne: req.user.id } })
        if (exists) {
            return res.status(409).json({
                success: false,
                message: "Email is already in use"
            })
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name, email },
            { new: true, runValidators: true, select: "name email" }
        )

        res.json({
            success: true,
            message: "Profile updated successfully",
            data: { user }
        })

    }

    catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}

const updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body
    if (!currentPassword || !newPassword || newPassword.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Invalid Password or too short"
        })
    }

    try {
        const user = await User.findById(req.user.id).select("password")
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }

        const match = await bcrypt.compare(currentPassword, user.password)
        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Current Password is incorrect"
            })
        }
        user.password = await bcrypt.hash(newPassword, 10)
        await user.save()
        res.json({
            success: true,
            message: "Password Changed Successfully!"
        })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export { registerUser, loginUser, getCurrentUser, updateProfile, updatePassword }