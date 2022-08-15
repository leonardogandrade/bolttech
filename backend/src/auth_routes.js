const express = require('express');
const routes = express.Router();
const { create, remove, getAll, update } = require('./controller/project-controller');

const authenticate = require('./middleware/authenticate');

// routes.use(authenticate);

routes.post('/project', create);
routes.post('/project_rm::id', remove);
routes.get('/project::userId', getAll);
routes.post('/projectUpdate::projectId', update);


module.exports = routes;
