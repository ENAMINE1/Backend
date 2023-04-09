const { default: mongoose } = require('mongoose');
const Book = require('./book');
const User = require('./user');
const Schema = mongoose.Schema;


/*creating book schema and model */

const TempSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, required: [true, 'User ID field is required'] },
    book_id: { type: Schema.Types.ObjectId, required: [true, 'Book ID field is required'] },
    name:{type:String,required:[true,'book name is required']},
    author:{type:String,required:[true,'author name is required']},
    username:{type:String,required:[true,'username  is required']},
});

const Temp = mongoose.model('temp', TempSchema);

module.exports = Temp;