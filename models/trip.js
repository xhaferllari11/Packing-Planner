const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    destination: String,
    date: Date,
    duration: Number,
    suggestedItems: [{
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }],
    weather: [{
        type: Schema.Types.ObjectId,
        ref: 'Weather'
    }],
    datetime: String
},{
    timestamps: true
});

module.exports = mongoose.model('Trip', tripSchema);