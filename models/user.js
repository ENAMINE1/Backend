const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: [true, 'Username field is required'] },
    password: { type: String, required: [true, 'Password field is required'] },
    email: { type: String, required: [true, 'Email field is required'] },
    phone: { type: String, required: [true, 'Phone field is required'] },
    favbooks: { type: Array },
    favauthors: { type: Array },
    favpublishers: { type: Array },
    purchases:{type:Array}
});

const User = mongoose.model('user', userSchema);

module.exports = User;
module.exports.userSchema = userSchema;