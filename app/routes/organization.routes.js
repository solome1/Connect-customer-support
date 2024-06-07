const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organization.controller.js');

// Create a new organization
router.post('/organizations', organizationController.create);

// Get all organizations
router.get('/organizations', organizationController.findAll);

// Get a single organization by ID
router.get('/organizations/:id', organizationController.findById);

// Update an organization
router.put('/organizations/:id', organizationController.update);

// Delete an organization
router.delete('/organizations/:id', organizationController.delete);

module.exports = router;