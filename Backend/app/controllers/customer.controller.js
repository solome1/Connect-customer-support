const Customer = require('../models/customer.model');


// Create and save a new customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.customerName) {
    return res.status(400).json({ message: 'Customer Name is  required.' });
  }

  // Create a Company object
  const customer = new Customer({
    customerName: req.body.customerName,
    customerEmail:req.body.customerEmail,
    password:req.body.password,
    customerContact:req.body.customerContact,
    profileImage:req.body.profileImage,
  });

  // Save the Company object in the database
  customer
    .save(customer)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message || 'Some error occurred while creating the Customer.',
      });
    });
};

// Retrieve all customers
exports.getAllCustomers = (req, res) => {
  Customer.find()
    .then((customers) => {
      res.status(200).json(customers);
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message || 'Some error occurred while retrieving customers.',
      });
    });
};




// Retrieve a specific customer by ID
exports.getCustomerById = (req, res) => {
  const customerId = req.params.id;

  Customer.findById(customerId)
    .then((customer) => {
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found.' });
      }

      res.status(200).json(customer);
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message || 'Some error occurred while retrieving the customer.',
      });
    });
};





// Update a customer by ID
exports.updateCustomer = (req, res) => {
  const customerId = req.params.id;

  if (!req.body.customerName) {
    return res.status(400).json({ message: 'Customer Name is required.' });
  }

  Customer.findByIdAndUpdate(
    customerId,
    req.body,
    { new: true }
  )
    .then((updatedCustomer) => {
      if (!updatedCustomer) {
        return res.status(404).json({ message: 'Customer not found.' });
      }

      res.status(200).json(updatedCustomer);
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message || 'Some error occurred while updating the customer.',
      });
    });
};

// Delete a customer by ID
exports.deleteCustomer = (req, res) => {
  const customerId = req.params.id;

  Customer.findByIdAndDelete(customerId)
    .then((deletedCustomer) => {
      if (!deletedCustomer) {
        return res.status(404).json({ message: 'Customer not found.' });
      }

      res.status(200).json({ message: 'Customer deleted successfully.' });
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message || 'Some error occurred while deleting the customer.',
      });
    });
};

// Delete all customers
exports.deleteAllCustomers = (req, res) => {
  Customer.deleteMany({})
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'No customers found to delete.' });
      }

      res.status(200).json({ message: `${result.deletedCount} customers deleted successfully.` });
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message || 'Some error occurred while deleting the customers.',
      });
    });
};


// Example of throwing an error in a controller function
exports.getCustomerById = (req, res, next) => {
  const { id } = req.params;

  Customer.findById(id)
    .then((customer) => {
      if (!customer) {
        const error = new Error('Customer not found');
        error.statusCode = 404;
        throw error;
      }

      res.json(formatResponse(200, customer));
    })
    .catch((error) => {
      next(error); // Pass the error to the error handling middleware
    });
};