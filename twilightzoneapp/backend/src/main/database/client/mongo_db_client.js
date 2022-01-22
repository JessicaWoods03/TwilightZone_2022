const mongoose = require('mongoose')
const mongo_db_url = process.env.ATLAS_CONNECTION;

//use this as main client connection piece
async function open_connection() {
    try{
        return await mongoose.connect(process.env.ATLAS_CONNECTION);
    } catch(e){
        console.log(e);
    }
}

//close the clients connection
async function close_connection() {
    await mongoose.disconnect();
}


//create model and then do these functions on them
module.exports.open_connection = open_connection
module.exports.close_connection = close_connection
module.exports.mongoose = mongoose