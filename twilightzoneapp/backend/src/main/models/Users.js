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

});
module.exports = mongoose.model('Users', UserSchema, "users");