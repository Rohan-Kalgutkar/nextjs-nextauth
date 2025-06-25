import mongoose from "mongoose";

const userScehma = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Username is required"],
        unique: [true,"Username must be unique"],
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: [true,"Email must be unique"],
    },
    password: {
        type: String,
        required: [true,"Password is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: {
        type: String,
        default: "",
    },
    forgotPasswordExpiry: {
        type: Date,
        default: null,
    },
    verifyToken: {
        type: String,
        default: "",
    },
    verifyTokenExpiry: {
        type: Date,
        default: null,
    },
})

const User = mongoose.models.users || mongoose.model("users", userScehma);


// const User = mongoose.model("users", userScehma);


export default User;