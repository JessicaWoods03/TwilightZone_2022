//Require Mongoose
let mongoose = require('mongoose');

let GhostModelSchema = new mongoose.Schema(
    {
    city: {
        type: String,
        required: false,
        default: '',
        trim: true
    },
    description: {
        type: String,
        required: false,
        default: '',
        trim: true
    },
    location: {
        type: String,
        required: false,
        default: '',
        trim: true
    },
    state: {
        type: String,
        required: false,
        default: '',
        trim: true
    },
    state_abbrev: {
        type: String,
        required: false,
        default: '',
        trim: true
    },
    longitude: {
        type: Number,
        required: false,
        default: 0
    },
    latitude: {
        type: Number,
        required: false,
        default: 0.0,
    },
    city_longitude: {
        type: Number,
        required: false,
        default: 0.0,
    },
    city_latitude: {
        type: Number,
        required: false,
        default: 0.0,
    },
    media: {
        type: String,
        required: false,
        default: '',
        trim: true
    },
    report_date: {
        type: Date,
        required: false,
        default: '',
        trim: true
    },
    picture: {
        type: Boolean,
        required: false,
        default: false
    },
    video: {
        type: Boolean,
        required: false,
        default: false
    },
    emp: {
        type: Boolean,
        required: false,
        default: false
    },
    ghost_box: {
        type: Boolean,
        required: false,
        default: false
    },
    thermo: {
        type: Boolean,
        required: false,
        default: false
    },
    user_name: {
        type: String,
        required: false,
        default: '',
        trim: true
    }
});


module.exports = mongoose.model('GhostReport', GhostModelSchema, "ghosts");