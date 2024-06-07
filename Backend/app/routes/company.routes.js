const express = require('express');
const router = express.Router(); // Create a new router instance

const companies = require('../controllers/company.controller.js');
const auth = require('../controllers/auth.controller.js');
// const authMiddleware = require('../middlewares/auth.middleware');


// Create a new company
router.post('/api/companies',  companies.create);

//authMiddleware.verifyToken,

// Retrieve all companies
router.get('/api/companies', companies.getAllCompanies);



// Retrieve a specific company by ID
router.get('/api/companies/:id',  companies.getCompanyById);

// Update a company by ID
router.put('/api/companies/:id',  companies.updateCompany);

// Delete a company by ID
router.delete('/api/companies/:id',  companies.deleteCompany);

// Register a new user
router.post('/api/auth/register', auth.register);


module.exports = router;