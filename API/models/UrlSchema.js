import mongoose from "mongoose"
import { url_collection } from "../config.js";

//Create Schema
const UrlSchema = new mongoose.Schema({
    short: {type: String, required: true, unique: true},
    long: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

//Create Model
export const url = mongoose.model(url_collection, UrlSchema);