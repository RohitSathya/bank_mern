const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "User"
    },
    active: {
        type: String,
        default: "active"
    },
    accountno: {
        type: Number,
        unique: true // Ensure uniqueness of account numbers
    },
    address: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    type:{
        type:String,
        enum:["fd","rd"]
    }
}, {
    timestamps: true
});

userSchema.pre('save', function(next) {
    // Only generate account number if it's a new user
    if (!this.isNew) {
        return next();
    }
    // Generate random 10-digit number
    const randomAccountNo = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    this.accountno = randomAccountNo;
    next();
});
const usermodel = mongoose.model('User', userSchema);
module.exports = usermodel;
