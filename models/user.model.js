const mongoose = require('mongoose');
const User = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    year: { type: Number, required: false },
    gender: { type: String, required: true, trim: true },
});
module.exports = mongoose.model('User', User);