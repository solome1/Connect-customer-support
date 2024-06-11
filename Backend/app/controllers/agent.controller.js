const Agent = require('../models/agent.model');
const {sendRegistrationEmail} = require("../middlewares/sendEmailRegistration")


// Create and save a new agent
exports.create = (req, res) => {
    // Validate request
    if (!req.body.agentName) {
        return res.status(400).json({ message: 'Agent Name is  required.' });
    }

    // Create a Agent object
    const agent = new Agent({
        agentName: req.body.agentName,
        companyId: req.body.companyId,
        agentEmail: req.body.agentEmail,
        password: req.body.password,
        agentStatus: true,
        agentPhoneNumber: req.body.agentPhoneNumber,
        profileImage: req.body.profileImage,
    });

    

    // Save the Company object in the database
    agent.save(agent)
        .then((data) => {
            res.status(201).json(data);
            sendRegistrationEmail(agent.agentEmail, agent.password)
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message || 'Some error occurred while creating the Agent.',
            });
        });
};


// Retrieve all agents
exports.getAllAgents = (req, res) => {
    const companyId = req.params.id
    Agent.find({companyId:companyId})
        .then((agents) => {
            res.status(200).json(agents);
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message || 'Some error occurred while retrieving agents.',
            });
        });
};


// Retrieve all agents
exports.getAll = (req, res) => {
    Agent.find()
        .then((agents) => {
            res.status(200).json(agents);
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message || 'Some error occurred while retrieving agents.',
            });
        });
};





// Retrieve a specific agent by ID
exports.getAgentById = (req, res) => {
    const agentId = req.params.id;

    Agent.findById(agentId)
        .then((agent) => {
            if (!agent) {
                return res.status(404).json({ message: 'Agent not found.' });
            }
            res.status(200).json(agent);
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message || 'Some error occurred while retrieving the agent.',
            });
        });
};





// Update a agent by ID
exports.updateAgent = (req, res) => {
    const agentId = req.params.id;
    if (!req.body.agentName) {
        return res.status(400).json({ message: 'Agent Name is required.' });
    }
    Agent.findByIdAndUpdate(
        agentId,
        req.body,
        { new: true }
    )
        .then((updatedAgent) => {
            if (!updatedAgent) {
                return res.status(404).json({ message: 'Agent not found.' });
            }

            res.status(200).json(updatedAgent);
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message || 'Some error occurred while updating the agent.',
            });
        });
};


// Delete a agent by ID
exports.deleteAgent = (req, res) => {
    const agentId = req.params.id;

    Agent.findByIdAndDelete(agentId)
        .then((deletedAgent) => {
            if (!deletedAgent) {
                return res.status(404).json({ message: 'Agent not found.' });
            }

            res.status(200).json({ message: 'Agent deleted successfully.' });
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message || 'Some error occurred while deleting the agent.',
            });
        });
};

// Delete all agents
exports.deleteAllAgents = (req, res) => {
    Agent.deleteMany({})
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'No agents found to delete.' });
            }

            res.status(200).json({ message: `${result.deletedCount} agents deleted successfully.` });
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message || 'Some error occurred while deleting the agents.',
            });
        });
};
