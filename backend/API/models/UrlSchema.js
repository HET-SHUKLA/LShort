import mongoose from "mongoose"
import { url_collection } from "../config.js";

const USER_ENUM = ['user', 'guest'];

//Create Schema
const UrlSchema = new mongoose.Schema({
    short: {type: String, required: true, unique: true},
    long: {type: String, required: true},
    count: {type: Number, default: 0},
    userType: {type: String, enum: USER_ENUM, required: true, default: 'guest'},
    userId: {type: ObjectId}
}, {
    collection: url_collection,
    timestamps: {createdAt: 'createdAt', updatedAt: 'lasteAccessed'}
});

UrlSchema.pre('save', function (next) {
    if (this.userType === 'user' && !this.userId) {
      throw new Error("UserId is required");
    }
    next();
});


//Create Model
export const Url = mongoose.model(url_collection, UrlSchema);