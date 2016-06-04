var mongoose = require('mongoose');
var Bill = mongoose.model('Bill');
var Customer = mongoose.model('Customer');
var Chance = require('chance');
var chance = new Chance();


module.exports = (function() {
 return {
 		show: function(req, res){
 			Bill.find(function (err,bill) {
 				if(err){
 					console.log("Customers not found");
 				}else{
 					res.json(bill);
 				}
 			})
 		},
 		findBills: function(req, res){
 			Bill.find({customerId: req.body.id}, function (err, bills){
 				if(err){
 					console.log("No Bills found");
 				}else{
 					res.json(bills);
 				}
 			})
 		}
 	} 		
})();