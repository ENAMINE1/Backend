const { default: mongoose } = require('mongoose');
const Schema = mongoose.Schema;

/*creating book schema and model */
const RequestSchema = new Schema({
    name: { type: String, required: [true, 'Name field is required'] },
    author: { type: String, required: [true, 'Author field is required'] },
    publisher: { type: String, required: [true, 'Publisher field is required'] },
})