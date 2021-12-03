const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  id: Number,
  firstName: String,
  lastName: String,
  emailId: String,
});

module.exports = mongoose.model('Employee', EmployeeSchema);
