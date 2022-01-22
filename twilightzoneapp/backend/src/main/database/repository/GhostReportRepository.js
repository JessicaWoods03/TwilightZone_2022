//Integrating Andrew_T new changes to Repository (Nov.2, 2021)
const GhostReport = require('../../models/GhostReport')
const mongo_client = require('../client/mongo_db_client')
const mongoose = require('mongoose');

async function get_all_by_params(params) {
  await mongo_client.open_connection();
  return await GhostReport.find(params)
  .then((reports) => {
    return reports;
  })
  .catch(err => console.error(`Failed to find documents: ${err}`))
}

async function save_report(request){
  //I think you forgot this part-"await"...so I added it (Nov 6th, 2021)
  await mongo_client.open_connection();
  let report = build_report(request);
  return report.save();
}

/* Added from Drews branch, modified to make it work correctly - 11/16/2021 Andrew T*/
async function save(sighting) {
  await mongo_client.open_connection();
  let saveSighting = new GhostReport(sighting);
  let result = await saveSighting.updateOne(sighting);
  await mongo_client.close_connection();
  return result;
}

async function delete_all_by_username(username){
  await mongo_client.open_connection();
  return GhostReport.deleteMany({user_name: username})
  .then((reports) => {
    console.log(reports);
  })
  .catch(err => console.error(`Failed to delete documents: ${err}`))
}

async function delete_by_id(id){
  await mongo_client.open_connection();
  return GhostReport.deleteOne({_id: id})
  .then((reports) => {
    console.log(reports);
  })
  .catch(err => console.error(`Failed to delete documents: ${err}`))
}

async function delete_one_report_by_params(params){
  await mongo_client.open_connection();
  return GhostReport.deleteOne(params)
  .then((reports) => {
    console.log(reports);
    return reports;
  })
  .catch(err => console.error(`Failed to delete documents: ${err}`))
}


async function update_one_by_id(request_body){
  await mongo_client.open_connection();
  return GhostReport.findByIdAndUpdate(request_body.id, request_body.updated_report)
    .then((reports) => {
      console.log(reports);
    })
    .catch(err => console.error(`Failed to update documents: ${err}`))
}


async function update_all_by_username(request_body){
  await mongo_client.open_connection()
  return GhostReport.updateMany({user_name: request_body.user_name}, request_body.updated_report)
  .then((reports) => {
    console.log(reports);
  })
  .catch(err => console.error(`Failed to update documents: ${err}`))
}

// paginated method to get all distinct cities in the db - Andrew T 11/17/2021 
function get_all_report_cities(){
  return async (req, res, next) => {
    await mongo_client.open_connection();
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skipIndex = (page - 1) * limit;
    const results = {};

    try {
      results.cities = await GhostReport.find()
        .sort({ _id: 1 })
        .limit(limit)
        .skip(skipIndex)
        .distinct("city")
        .exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
        console.log("ERROR!!!!")
        console.log(e)
        res.status(500).json({ message: "Error Occured" });
    }
  };
}

// method to get all states - Andrew T 11/17/2021
function get_all_report_states(){
  return async (req, res, next) => {
    try {
      await mongo_client.open_connection();
      let state_arr = await GhostReport.distinct('state');
      res.status(200).json({states: state_arr});
    } catch(e) {
      console.log(`ERROR!!!! ${e}`)
      res.status(500).json({ message: "Error Occured" });
    }
  }
}

function build_report(request){
  let preped_obj = {
    city: request.body.city,
    description: request.body.description,
    location: request.body.location,
    state: request.body.state,
    state_abbrev: request.body.state_abbrev,
    longitude: request.body.longitude,
    latitude: request.body.latitude,
    city_longitude: request.body.city_longitude,
    city_latitude: request.body.city_latitude,
    media: request.body.media,
    report_date: request.body.date,
    picture: request.body.picture,
    video: request.body.video,
    emp: request.body.emp,
    ghost_box: request.body.ghostBox,
    thermo: request.body.thermoImaging,
    user_name: request.body.username,
  }

  return new GhostReport(preped_obj);
}

/* Update all module exports - Andrew T 11/16/2021 */
module.exports.save_report = save_report
module.exports.save = save
module.exports.get_all_by_params = get_all_by_params
module.exports.get_all_report_cities = get_all_report_cities
module.exports.get_all_report_states = get_all_report_states
module.exports.update_all_by_username = update_all_by_username
module.exports.update_one_by_id = update_one_by_id
module.exports.delete_all_by_username = delete_all_by_username
module.exports.delete_one_by_params = delete_one_report_by_params
module.exports.delete_by_id = delete_by_id