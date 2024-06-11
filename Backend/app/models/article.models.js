const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);