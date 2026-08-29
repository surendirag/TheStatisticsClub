const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    imageUrl: {
        type: String
    },
    cloudinaryId: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);
