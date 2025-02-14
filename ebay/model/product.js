const mongoose = require('mongoose');



const amazonSchema = new mongoose.Schema({
    id : {
        type: String
    },
    title: {
        type: String
    },
    category: {
        type: String
    },
    subcategory: {
        type: String
    },
    brand: {
        type: String
    },      
    price:{ 
        type: String,
        default:'Price unavailable'
    },
    rating: {
        type: String,
        default:'Rating unavailable'
    },
    description:{
        type: String,
        default:'Description unavailable'
    },
    image:{
        type:String
    },
    link:{
        type: String
    },
    status:{
        type: String,
        default:'inactive'
    }
},{
    timestamps : true
})

const Amazon = mongoose.model('amazonproduct', amazonSchema);
module.exports = Amazon;