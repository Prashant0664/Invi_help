const mongoose = require('mongoose');

const inviadmin = new mongoose.Schema({
    mail: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model("Admin", inviadmin);