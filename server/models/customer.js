var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new mongoose.Schema({
 name: String,
 mobile: String,
 phone: String,
 email: String,
 dob: Date,
 address: [],
 created_at: Date
})

mongoose.model('Customer', CustomerSchema);