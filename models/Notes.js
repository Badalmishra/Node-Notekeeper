const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Notes', {useNewUrlParser: true});
const notesStruct = {
    name: String,
    body: String,
    category: { type : mongoose.Schema.Types.ObjectId, ref: 'categories'}
}
const Notes = mongoose.model('Notes', notesStruct);
module.exports = Notes;