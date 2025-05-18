const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(

    {
        // trim remove white space in letter
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            required: true,
            enum: ["admin", "manager", "user"]
        },
    },

    { timestamps: true, versionKey: false }
);

// model
const userModels = mongoose.model("users", userSchema);
module.exports = userModels;