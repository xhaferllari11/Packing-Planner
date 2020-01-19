const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Image = require('./image');

const Schema = mongoose.Schema;

const SALT_ROUNDS = 6;

const userSchema = new Schema({
    name: String,
    email: { type: String, required: true, lowercase: true, unique: true },
    password: String,
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }]
}, {
    timestamps: true
});

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    // if user changed then hash the password
    bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function (tryPassword, cb) {
    bcrypt.compare(tryPassword, this.password, cb);
};

module.exports = mongoose.model('User', userSchema);