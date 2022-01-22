const express = require('express')
const backend = express()
const cors = require('cors')
const ghost_service = require('./src/main/services/GhostReport/GhostReportService')
const user_repo = require("./src/main/database/repository/UserRepository")

//building login and sessions with cookies
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
//const bcrypt = require("bcrypt")
const saltrounds = 10
const session = require("express-session")
const bodyParser = require("body-parser")

require('dotenv').config()
backend.use(express.json({limit:'10MB'}))
backend.use(cors({
    //building a session
    origin: ["http://localhost:3000", "localhost"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
backend.use(express.json())
//backend.use(cookieParser);
backend.use(bodyParser.urlencoded({extended: true}));
//building session
// backend.use(
//     session({
//         key:"userId",
//         secret: "subscribed",
//         resave: false,
//         cookie: {
//             expires: 60 * 60 * 24,
//         },
//     })
// );

//working on login

backend.get('/ghostReports', async function (req, res) {
    let reps = await ghost_service.process_get_all(req.query);
    res.status(200).send({
        "reports": reps
    });
})

// added to support both routes if drew is using a different one 
backend.get('/ghostSightings', async function (req, res) {
    let reps = await ghost_service.process_get_all(req.query);
    res.status(200).send({
        "reports": reps
    });
})

// added to support both routes if Evans is using a different one 
backend.post('/search', async function (req, res) {
    let reps = await ghost_service.process_get_all(req.query);
    res.status(200).send({
        "reports": reps
    });
})

backend.post('/ghostReports', async function(req, res){
    res.status(200).send({
        "result": await ghost_service.process_save(req.body)
    }); 
})

backend.put('/ghostReports', async function(req, res){
    res.status(200).send({
        "result": await ghost_service.process_put_by_username(req.body)
    })
})

backend.delete('/ghostReports', async function(req, res){
    res.status(200).send({
        "result": await ghost_service.process_delete_by_id(req.body.id)
    })
})

//integrated from Drews_branch Nov.12th
backend.post('/users', async function (req, res) {
    res.status(200).send({
        "user":await user_repo.get_one_by_username(req.query.username)
    });
})

backend.post('/saveuser', async function (req, res) {
    let create_response = await user_repo.create_user(req.body.user)
    if(typeof create_response == String)
        res.status(200).send({
            "saved_user": await user_repo.create_user(req.body.user)
        });
    else
        res.status(400).send({
            "saved_user": await user_repo.create_user(req.body.user)
        });
})

backend.post('/updateuser', async function (req, res) {
    res.status(200).send({
        "saved_user": await user_repo.update_user(req.body.user)
    });
})

backend.post('/saveSighting', async function (req, res) {
    res.status(200).send({
        "saved_sighting": await ghost_repo.save(req.body.sighting)
    });
})

backend.get('/cities', ghost_service.get_repo().get_all_report_cities(), (req, res) => {
    res.json(res.paginatedResults).send();
})

backend.get('/states', ghost_service.get_repo().get_all_report_states(), (req, res) => {
    res.status(res.response_status).send(res.states)
})

backend.post('/login', async function (req, res) {
    //add login function
    console.log(req.body);
})

backend.post('/register', async function (req, res) {
    //add register function
    console.log(req.body);
})

const PORT = process.env.PORT || 5000
backend.listen(PORT, ()=>{
    console.log(`Successfully served on port: ${PORT}.`);
})
