const mongoose = require('mongoose');



const amazonSchema = new mongoose.Schema({
    title : {
        type : String
    },
    price : {
        type : String
    },
    image : {
        type: String
    }
},{
    timestamps : true
})

const Flipkart = mongoose.model('comapredata', amazonSchema);
module.exports = Flipkart;