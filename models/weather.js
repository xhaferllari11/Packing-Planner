const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
    high_temp: Number,
    low_temp: Number,
    precip: Number,
    icon: String,
    description: String,
    snow_depth: Number,
    clouds: Number,
    datetime: String,
    ts: Date
},{
    timestamps: true
});

module.exports = mongoose.model('Weather',weatherSchema);