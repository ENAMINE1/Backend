const { default: mongoose } = require('mongoose');
const Book = require('./book');
const User = require('./user');
const Schema = mongoose.Schema;


/*creating book schema and model */

const PurchaseSchema = new Schema({
    user_id: { type: String, required: [true, 'User ID field is required'] },
    book_id: { type: String, required: [true, 'Book ID field is required'] },
    image: { type: String, required: [true, 'Image field is required'] },
    name: { type: String, required: [true, 'Name field is required'] },
    author: { type: String, required: [true, 'Author field is required'] },
    format: { type: String, required: [true, 'Format field is required'] },
    price: { type: String, required: [true, 'Price field is required'] },
    category: { type: String, required: [true, 'Category field is required'] },
    isbn: { type: String, required: [true, 'ISBN field is required'] },
    username: { type: String, required: [true, 'Username field is required'] },
    email: { type: String, required: [true, 'Email field is required'] },
    phone: { type: String, required: [true, 'Phone field is required'] },
});

const Purchase = mongoose.model('purchase', PurchaseSchema);

module.exports = Purchase;
