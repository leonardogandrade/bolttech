const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    projectName: {
        type: String,
        required: true,
    },
    tasks: []
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
