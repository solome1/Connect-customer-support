const Customer = require('../models/customer.model');

exports.create = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    const result = await customer.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const customers = await Customer.find().exec();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findById(id).exec();
    if (!customer) {
      res.status(404).json({ message: 'Customer not found' });
    } else {
      res.json(customer);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findByIdAndUpdate(id, req.body, { new: true }).exec();
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Customer.findByIdAndRemove(id).exec();
    res.status(204).json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(req.body.password, salt);
    const result = await customer.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//Create an Account Deletion Function
exports.deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndRemove(id).exec();
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};