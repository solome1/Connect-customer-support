const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');
// const authController = require('../controllers/auth.controller');

router.post('/api/customers', customerController.create);
router.get('/api/customers', customerController.getAllCustomers);
router.get('/api/customers/:id', customerController.getCustomerById);
router.put('/api/customers/:id', customerController.updateCustomer);
router.delete('/api/customers/:id', customerController.deleteCustomer);
router.delete('/api/customers', customerController.deleteAllCustomers);

// router.post('/customers/login', authController.customerLogin);
// //Create an Account Deletion Route
// router.delete('/customers/:id', customerController.deleteCustomer);
module.exports = router;