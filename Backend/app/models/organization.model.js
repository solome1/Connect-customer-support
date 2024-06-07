const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  employeeCount: {
    type: Number,
  },
  companyWebsite: {
    type: String,
  },
  primaryContact: {
    type: String,
  },
  companyPhoneNumber: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  street: {
    type: String,
  },
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;