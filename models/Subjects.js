const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Notes', {useNewUrlParser: true});
const subStruct = {
    name: String,
}
const Subjects = mongoose.model('subjects', subStruct);
module.exports = Subjects;