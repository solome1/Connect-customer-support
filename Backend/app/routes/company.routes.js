const express = require('express');
const router = express.Router(); // Create a new router instance
const { Company, validate } = require("./../models/company.model.js")
const bcrypt = require("bcrypt");

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
router.post('/api/company/auth/register',  async (req, res) => {

  try {
    console.log("Reached here")
    const company = await Company.findOne({ companyEmail: req.body.companyEmail});
    if (company)
      return res
        .status(409)
        .send({ message: "Company with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new Company({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "Company  created successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
