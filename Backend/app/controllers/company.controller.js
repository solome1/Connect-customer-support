const db = require('../models');
const Company = db.company;

// Create and save a new company
exports.create = (req, res) => {
  // Validate request
  if (!req.body.companyName) {
    return res.status(400).json({ message: 'Company Name is  required.' });
  }

  // Create a Company object
  const company = new Company({
    companyName: req.body.companyName,
    companyEmail:req.body.companyEmail,
    password:req.body.password,
    companyDescription:req.body.companyDescription,
    companyLink:req.body.companyLink,
    employeeCount:req.body.employeeCount,
    companyWebsite:req.body.companyWebsite,
    primaryContact:req.body.primaryContact,
    country: req.body.country,
    state: req.body.state,
    city:req.body.city
  });

  // Save the Company object in the database
  company
    .save(company)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message || 'Some error occurred while creating the Company.',
      });
    });
};


// Retrieve all companies
exports.getAllCompanies = (req, res) => {
  Company.find()
    .then((companies) => {
      res.status(200).json(companies);
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message || 'Some error occurred while retrieving companies.',
      });
    });
};

// Retrieve a specific company by ID
exports.getCompanyById = (req, res) => {
  const companyId = req.params.id;

  Company.findById(companyId)
    .then((company) => {
      if (!company) {
        return res.status(404).json({ message: 'Company not found.' });
      }

      res.status(200).json(company);
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message || 'Some error occurred while retrieving the company.',
      });
    });
};

// Update a company by ID
exports.updateCompany = (req, res) => {
  const companyId = req.params.id;

  if (!req.body.companyName) {
    return res.status(400).json({ message: 'Company Name is required.' });
  }

  Company.findByIdAndUpdate(
    companyId,
    req.body,
    { new: true }
  )
    .then((updatedCompany) => {
      if (!updatedCompany) {
        return res.status(404).json({ message: 'Company not found.' });
      }

      res.status(200).json(updatedCompany);
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message || 'Some error occurred while updating the company.',
      });
    });
};

// Delete a company by ID
exports.deleteCompany = (req, res) => {
  const companyId = req.params.id;

  Company.findByIdAndDelete(companyId)
    .then((deletedCompany) => {
      if (!deletedCompany) {
        return res.status(404).json({ message: 'Company not found.' });
      }

      res.status(200).json({ message: 'Company deleted successfully.' });
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message || 'Some error occurred while deleting the company.',
      });
    });
};


const { formatResponse } = require('../utils/response');

// ...

// Register a new user
exports.register = (req, res, next) => {
  // ...

  // Save the user in the database
  user
    .save()
    .then(() => {
      const response = formatResponse(201, null, 'User registered successfully.');
      res.status(201).json(response);
    })
    .catch((error) => {
      const response = formatResponse(500, null, 'Failed to register the user.');
      res.status(500).json(response);
    });
};



// Example of throwing an error in a controller function
exports.getCompanyById = (req, res, next) => {
  const { id } = req.params;

  Company.findById(id)
    .then((company) => {
      if (!company) {
        const error = new Error('Company not found');
        error.statusCode = 404;
        throw error;
      }

      res.json(formatResponse(200, company));
    })
    .catch((error) => {
      next(error); // Pass the error to the error handling middleware
    });
};






