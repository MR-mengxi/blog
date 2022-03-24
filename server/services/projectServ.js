const Project = require("../models/Project");

exports.getProjects = async function () {
    const result = await Project.find({}, { __v: 0 }).sort("order");
    return result;
}

exports.addProject = async function (data){
    const result = await Project.create(data);
    return result;
}

exports.setProject = async function (id, projectInfo) {
    const result = await Project.findByIdAndUpdate(id, { $set: projectInfo },{new:true});
    return result;
}

exports.deleteProject = async function(id){
    const result = await Project.deleteOne({_id:id});
    return null;
}