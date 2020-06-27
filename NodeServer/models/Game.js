const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    estPlayTime: {
        type: Number,
        min: 0,
        required: true
    },
    developer: {
        type: String,
        ref: 'Developers',
        required: true
    },
    sponsoredBy: {
        type: String,
        ref: 'Sponsors',
        required: true
    }
});

module.exports = mongoose.model('Game', GameSchema);
