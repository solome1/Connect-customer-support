const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');
const authController = require('../controllers/auth.controller');

router.post('/customers', customerController.create);
router.get('/customers', customerController.getAll);
router.get('/customers/:id', customerController.getById);
router.put('/customers/:id', customerController.update);
router.delete('/customers/:id', customerController.delete);

router.post('/customers/login', authController.customerLogin);
//Create an Account Deletion Route
router.delete('/customers/:id', customerController.deleteAccount);
module.exports = router;