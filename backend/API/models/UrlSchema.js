import mongoose from "mongoose"
import { url_collection } from "../config.js";

//Create Schema
const UrlSchema = new mongoose.Schema({
    short: {type: String, required: true, unique: true},
    long: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    lastAccessed: {type: Date, default: Date.now},
    count: {type: Number, default: 0}
});

//index to delete after 30 days if no clicks were made
UrlSchema.index({ lastAccessed: 1 }, { expireAfterSeconds: 2592000 }); // 30 days = 2592000 seconds

//Create Model
export const url = mongoose.model(url_collection, UrlSchema);