const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleID: {
    type: String,
  },
  displayName: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('User', UserSchema);
