const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        require : true
    },

    lastName : {
        type : String,
        require : true
    },

    email :{
        type : String,
        require : true,
    },
    image:{
        type: String,

    },

    password : {
        type : String,
        require : true
    }
});

const userModel = new mongoose.model('Users',userSchema);

module.exports = userModel