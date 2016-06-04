var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BillSchema = new mongoose.Schema({
 billNumber: Number,
 billDate: Date,
 items: [],
 discount: Number,
 tax: Number,
 customerId: String,
 created_at: Date,
 total: Number
})

mongoose.model('Bill', BillSchema);