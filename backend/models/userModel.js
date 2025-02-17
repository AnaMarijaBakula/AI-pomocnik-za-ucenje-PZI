const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    email: { type: String,
             unique: true
    },
    password: String,
    role: { type: String,
            enum: ["admin", "user", "guest"],
            required: true
    },
    expiresAt: Date,  // Vrijeme isteka za gosta
    projectsLeft: { type: Number,
                    default: 3 // Ograničenje projekata za gosta
    },
    guestToken: String, // Token za gosta
});

module.exports = mongoose.model("User", UserSchema);
