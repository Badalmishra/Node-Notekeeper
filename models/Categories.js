const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Notes', {useNewUrlParser: true});
const categoryStruct = {
    name: String,
    subject: { type : mongoose.Schema.Types.ObjectId, ref: 'subjects'}
}
const Categories = mongoose.model('categories', categoryStruct);
module.exports = Categories;