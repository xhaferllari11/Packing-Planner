const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    location: String,
    date: Date,
    duration: Number,
    packing: [{
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }],
    weather: [{
        type: Schema.Types.ObjectId,
        ref: 'Weather'
    }]
},{
    timestamps: true
});

module.exports = mongoose.model('Trip', tripSchema);