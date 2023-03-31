const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: [true, 'Username field is required'] },
    password: { type: String, required: [true, 'Password field is required'] },
    email: { type: String, required: [true, 'Email field is required'] },
    phone: { type: String, required: [true, 'Phone field is required'] },
    favbooks: { type: Array, required: [true, 'Favbooks field is required'] },
    favauthors: { type: Array, required: [true, 'Favauthors field is required'] },
    favgenres: { type: Array, required: [true, 'Favgenres field is required'] },
    favpublishers: { type: Array, required: [true, 'Favpublishers field is required'] },
    favseries: { type: Array, required: [true, 'Favseries field is required'] },
});

const User = mongoose.model('user', userSchema);

module.exports = User;