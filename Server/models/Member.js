const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true
    },
    domain: {
        type: String
    },
    imageUrl: {
        type: String
    },
    cloudinaryId: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
