const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: [true, 'Username field is required'] },
    password: { type: String, required: [true, 'Password field is required'] },
    email: { type: String, required: [true, 'Email field is required'] },
    phone: { type: String, required: [true, 'Phone field is required'] },
    favbooks: { type: Array },
    favauthors: { type: Array },
    favgenres: { type: Array },
    favpublishers: { type: Array },
    favseries: { type: Array },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
module.exports.userSchema = userSchema;