const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const agentSchema = new mongoose.Schema({
  agentName: {
    type: String,
    required: true,
  },
  agentEmail: {
    type: String,
  },
  agentPhoneNumber: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  agentStatus: {
    type: Boolean,
  },
  companyId: {
    type: String,
  },
  password: {
    type: String,
  },},
  {
        timestamps: true,
  });

// agentSchema.methods.comparePassword = function (password) {
//   return bcrypt.compare(password, this.password);
// };

module.exports = mongoose.model('agent', agentSchema);