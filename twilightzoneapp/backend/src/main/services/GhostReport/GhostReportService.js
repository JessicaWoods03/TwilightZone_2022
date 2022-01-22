const { MONGO_CLIENT_EVENTS } = require("mongodb");
const repo = require("../../database/repository/GhostReportRepository");
const GhostReport = require("../../models/GhostReport");

async function process_save(request){
    return await repo.save_report(request);
}

async function process_get_all(request_params){
    return await repo.get_all_by_params(request_params);
}

async function process_delete_all_by_username(username) {
    return await repo.delete_all_by_username(username);
}

async function process_delete_by_id(id) {
    return await repo.delete_by_id(id);
}

async function process_put_by_username(request_body){
    if(request_body.updateAll) {
        return await repo.update_all_by_username(request_body)
    } else {
        return await repo.update_one_by_id(request_body)
    }
}

function process_delete(params){
    //placeholder
}

function get_repo(){
    return repo
}

module.exports.process_save = process_save
module.exports.process_get_all = process_get_all
module.exports.process_delete = process_delete
module.exports.process_delete_all_by_username = process_delete_all_by_username
module.exports.process_put_by_username = process_put_by_username
module.exports.get_repo = get_repo
module.exports.process_delete_by_id = process_delete_by_id