// https://mongoosejs.com/docs/validation.html#built-in-validators

import { Schema, model } from "mongoose";

const linkSchema = new Schema(
    {
        _id: Number,
        title: {
            type: String,
            required: true,
        },
        used:{
            type: Boolean,
            required: true,
        }
    },
    { versionKey: false },
);

const onesideModel = model("pages", linkSchema, "Card");

export default onesideModel;
