const mongoose = require('mongoose');
const Project = mongoose.model('Project');

module.exports = {
    async create(req, res) {
        const response = await Project.create(req.body);
        // Emit event
        req.io.emit('addProject', response);
        console.log(response)
        res.status(200).json({
            "_id": response._id,
        });
    },
    async update(req, res) {
        const projectId = req.params.projectId;
        const payload = req.body;
        const response = await Project.findByIdAndUpdate(projectId, payload)
        // Emit event
        req.io.emit('addProject', response);
        console.log(response)
        res.status(200).json({
            "_id": response._id,
        });
    },
    async remove(req, res) {
        const projectId = req.params.id;
        const response = await Project.findOneAndDelete(projectId);
        //Emit event
        req.io.emit('rmProject', response);

        if (response != null)
            res.status(200).json({
                "msg": "project deleted successfully"
            })
        else
            res.status(404).json({
                "msg": "Project not found."
            })
    },
    async getAll(req, res) {
        const userId = req.params.userId;
        const response = await Project.find({ userId });

        if (response != null)
            res.status(200).json(response)
        else
            res.status(404);
    }
}
