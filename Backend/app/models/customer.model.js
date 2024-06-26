const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const customerSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    unique: true
  },
  contact: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  password: {
    type: String,
  },},
  {
        timestamps: true,
  });

// customerSchema.methods.comparePassword = function (password) {
//   return bcrypt.compare(password, this.password);
// };

module.exports = mongoose.model('customer', customerSchema);