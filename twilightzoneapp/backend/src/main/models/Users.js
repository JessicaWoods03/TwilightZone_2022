let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema( {
    //Updating User model to have unique and required fields
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    user_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
    //adding changes to user login Jan 31st, 2022, added changes to Mongo as well
    email: {
        type: String,
        required: true,
        unique: true

    }

});
module.exports = mongoose.model('Users', UserSchema, "users");