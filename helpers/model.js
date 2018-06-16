const mongoose = require('mongoose');
let newsSchema = mongoose.Schema({
    type: {type:String, required:true},
    name: {type:String, unique : true, required:true},
    tagName: {type: String, unique : true},
    description: {type:String, required:true},
    date: {type:String, required:true}
});


let News = mongoose.model('News', newsSchema);

module.exports = {
    News
};