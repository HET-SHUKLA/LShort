import mongoose from "mongoose"
import { url_collection } from "../config.js";

//Create Schema
const UrlSchema = new mongoose.Schema({
    short: {type: String, required: true, unique: true},
    long: {type: String, required: true},
    count: {type: Number, default: 0},
    userEmail: {type: String},
    analytics: {type: Array, default: []}
}, {
    collection: url_collection,
    timestamps: {createdAt: 'createdAt', updatedAt: 'lasteAccessed'}
});

UrlSchema.pre('save', function (next) {
    if (this.guestUser === false && !this.userEmail) {
      throw new Error("User email is required");
    }
    next();
});


//Create Model
export const Url = mongoose.model(url_collection, UrlSchema);