const Organization = require('../models/organization.model');

exports.create = (req, res) => {
  const { companyName, description, employeeCount, companyWebsite, primaryContact, companyPhoneNumber, country, state, city, street } = req.body;

  const newOrganization = new Organization({
    companyName,
    description,
    employeeCount,
    companyWebsite,
    primaryContact,
    companyPhoneNumber,
    address: {
      country,
      state,
      city,
      street,
    },
  });

  newOrganization.save((err, data) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      res.send(data);
    }
  });
};

// Get all organizations
exports.findAll = (req, res) => {
  Organization.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Get a single organization by ID
exports.findById = (req, res) => {
  Organization.findById(req.params.id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: 'Organization not found' });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Update an organization
exports.update = (req, res) => {
  Organization.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Delete an organization
exports.delete = (req, res) => {
  Organization.findByIdAndRemove(req.params.id)
    .then(data => {
      res.send({ message: 'Organization deleted successfully' });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getDashboard = (req, res) => {
  const organizationId = req.params.id; // assume you're passing the organization ID as a route parameter

  Organization.findById(organizationId, (err, organization) => {
    if (err) {
      res.status(404).json({ message: 'Organization not found.' });
    } else {
      res.json(organization);
    }
  });
};