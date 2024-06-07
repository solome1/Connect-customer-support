const Customer = require('../models/customer.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



exports.customerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email }).exec();
    if (!customer) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isValidPassword = await bcrypt.compare(password, customer.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ customerId: customer._id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
    res.json({ token, customer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Register a new user
exports.register = (req, res) => {
  const { username, password } = req.body;

  // Validate request
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Check if the username is already taken
  User.findOne({ username })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ message: 'Username is already taken.' });
      }

      // Create a new user
      const user = new User({ username, password });

      // Hash the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) {
            res.status(500).json({ message: 'Failed to hash password.' });
          }

          user.password = hash;

          // Save the user in the database
          user
            .save()
            .then(() => {
              res.status(201).json({ message: 'User registered successfully.' });
            })
            .catch((error) => {
              res.status(500).json({
                message:
                  error.message || 'Some error occurred while registering the user.',
              });
            });
        });
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message || 'Some error occurred while registering the user.',
      });
    });
};