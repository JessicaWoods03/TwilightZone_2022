//I got to collaberate this repository because I know me and Drew have a UserRepository
//Integrated from Drew branch(Nov.1st, 2021)
const User = require('../../models/Users')
const mongo_client = require('../client/mongo_db_client')
const mongo_db_url = process.env.ATLAS_CONNECTION;


//added this to make sure usernames entered are unique without updating an entry - Andrew T 11/16/2021
async function create_user(user){
  await mongo_client.open_connection();
  find = await User.findOne({user_name:user.user_name});
  if (find != null) {
    console.log("not available username")
    return "Invalid username. Username Unavailable"
  } else {
    let saveUser = User(user);
    savedUser = await saveUser.save(saveUser);
    await mongo_client.close_connection();
    return savedUser;
  }
}


//This is Drews functions for user
//updating functions with async and await connections (Nov.2, 2021) keeping assemetry 
//Updated this function to actually save and upsert - Andrew T 11/16/2021
//Modified this to update user to update a created user from the UI - Andrew T 11/16/2021
async function update_user(user) {
  await mongo_client.open_connection();
  return await User.updateOne({user_name: user.user_name}, user, {
    new: true,
  });
}

//commenting out for the meeting to see where we are at to see if we will use it or not
/* async function update_user(user) {
  await mongo_client.open_connection();
  return await User.findOneAndUpdate({user_name: user.user_name}, user, {
    new: true,
    upsert: true // Make this update into an upsert
  });
} */

async function get_one_by_username(uname){
    await mongo_client.open_connection();
    return await User.findOne({user_name : uname}).lean()
    //catch the errors
    .then((report) => {
      return report;
    })
    .catch(err => console.error(`Failed to find documents: ${err}`))
    .finally(() => {
      mongo_client.close_connection();
    });
}

//ok I have the same thing sortive for create new user
function create_one(user) {
  // assumes user.username has already been verified as unique
  mongo_client.open_connection();
  let saveUser = new User();
  saveUser.first_name = user.first_name;
  saveUser.last_name = user.last_name;
  saveUser.username = user.username;
  return saveUser.updateOne(user);
}


//This is my functions for login_branch Jessi (Nov.1, 2021) integrated
async function get_user_by_username_and_password(user_name, password){
  await mongo_client.open_connection();
  return User.findOne({user_name: user_name, password: password})
  //check for errors
  .then((report) => {
    console.log("user read successfully");
    return report;
  })
  .catch(err => console.error(`Failed to find documents: ${err}`))
  .finally(() => {
    mongo_client.close_connection();
  });
}

//Jessi login_branch 
async function delete_user_by_username_and_password(user_name, password){
  await mongo_client.open_connection();
  User.deleteOne({user_name: user_name, password: password})
  //check for errors
  .then((report) => {
    console.log("user deleted successfully");
    return report;
  })
  .catch(err => console.error(`Failed to find documents: ${err}`))
  .finally(() => {
    mongo_client.close_connection();
  });
  
}



async function close_db_connection(){
    await mongo_client.close_connection();
}


//kinda don't think we need that for user?
/*function create_report(report){
  mongo_client.open_connection();
  report = build_report(report);
  report.save(function(err,result){
    if (err){
        console.log(err);
    }
    else{
        console.log(result)
        return result;
    }
  });
}*/


/*function build_report(report){
  return mongoose.model('UserModel',{
    //add all the satuff
    name: { type: String },
    age: { type: Number }
  });
}*/


//will implement this later

module.exports.close_db_connection = close_db_connection;
module.exports.get_one_by_username = get_one_by_username;
module.exports.create_user = create_user;
module.exports.update_user = update_user;
module.exports.create_one = create_one;
module.exports.delete_user_by_username_and_password = delete_user_by_username_and_password;
module.exports.get_user_by_username_and_password = get_user_by_username_and_password;