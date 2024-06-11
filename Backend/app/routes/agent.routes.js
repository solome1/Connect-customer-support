const express = require('express');
const router = express.Router(); // Create a new router instance

const agents = require('../controllers/agent.controller.js');
// const auth = require('../controllers/auth.controller.js');
// const authMiddleware = require('../middlewares/auth.middleware');


// Create a new agent
router.post('/api/agents',  agents.create);

//authMiddleware.verifyToken,

// Retrieve all agents
router.get('/api/agents/all/:id', agents.getAllAgents);


// Retrieve all agents
router.get('/api/agents/', agents.getAll);

// Retrieve a specific agent by ID
router.get('/api/agents/:id',  agents.getAgentById);

// Update a agent by ID
router.put('/api/agents/:id',  agents.updateAgent);

// delete a agent by ID
router.delete('/api/agents/:id',  agents.deleteAgent);

// Delete a agent by ID
router.delete('/api/agents/',  agents.deleteAllAgents);


module.exports = router;