const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    url: String,
    classification: [String],
    confidence: [Number],
    classIndex: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Image',imageSchema);