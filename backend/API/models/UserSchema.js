import mongoose from "mongoose"
import { user_collection } from "../config.js";

const ACCOUNT_ENUM = ['email', 'google'];

//Create Schema
const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    account: {type: String, required: true, enum: ACCOUNT_ENUM, default: 'email'},
    password: {type: String},
    lastAccessed: {type: Date, default: Date.now},
}, {
    collection: user_collection,
    timestamps: { createdAt: 'createdAt' },
});

UserSchema.pre('save', function (next) {
    if (this.account === 'email' && !this.password) {
      throw new Error("Password is required for email accounts");
    }
    next();
});

//Create Model
export const User = mongoose.model(user_collection, UserSchema);