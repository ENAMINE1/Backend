// returning the querry regardint the details of the book the user want to search for by its name or by the author name from the database on mongodb
//image,name,author,format,book_depository_stars,price,currency,old_price,isbn,category,img_paths
const { default: mongoose } = require('mongoose');
const Schema = mongoose.Schema;

/*creating book schema and model */

const bookSchema = new Schema({
    image: { type: String, required: [true, 'Image field is required'] },
    name: { type: String, required: [true, 'Name field is required'] },
    author: { type: String, required: [true, 'Author field is required'] },
    format: { type: String, required: [true, 'Format field is required'] },
    price: { type: Number, required: [true, 'Price field is required'] },
    category: { type: String, required: [true, 'Category field is required'] },
    book_depository_stars: { type: String, required: [true, 'Book Depository Stars field is required'] },
    isbn: { type: String, required: [true, 'ISBN field is required'] },
    total:{type:Number,required:[true,'total required']},
    owned:{type:Number,required:[true,'owned required']},
    sold:{type:Number,required:[true,'sold required']},
    past:{type:Array,required:[true,'past required']},
    rack_no:{type:Number,required:[true,'rack_no required']},
    publisher:{type:String,required:[true,'publishers required']},
    request:{type:Number,required:[true,'requests required']},
    threshold:{type:Number,required:[true,'threshold required']},
    vendor:{type:String,required:[true,'vendor required']},
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;
module.exports.bookSchema = bookSchema;

