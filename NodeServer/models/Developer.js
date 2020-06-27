const mongoose = require('mongoose');

const DeveloperSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        required: true
    },
    onlyGameDev: {
        type: Boolean,
        required: true
    },
    games: {
        type: Array,
        ref: 'Game',
        default: []
    }
});

module.exports = mongoose.model('Developers', DeveloperSchema);
