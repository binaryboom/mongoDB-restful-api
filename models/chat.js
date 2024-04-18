const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    created_At: {
        type: Date,
        required: true
    },
    msg: {
        type: String,
        maxLength: 50
    }
});

const chat = mongoose.model("chat", chatSchema);

module.exports = chat;