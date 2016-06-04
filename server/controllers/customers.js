var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

module.exports = (function() {
 return {
 		create: function(req, res){
 			var customer = new Customer({name: req.body.name, phone: req.body.phone, mobile:req.body.mobile, dob:req.body.dob, address:req.body.address,email:req.body.email, created_at: req.body.created_at});
 			customer.save(function (err){
 				if(err){
 					console.log('Something went wrong');
 				} else{
 					console.log("Succesfully added Customer");
 					res.json(customer);
 				}
 			})
 		},
 		show: function(req, res){
 			Customer.find(function (err,customer) {
 				if(err){
 					console.log("Customers not found");
 				}else{
 					res.json(customer);
 				}
 			})
 		},
 		find: function(req, res){
 			Customer.findOne({_id: req.body.id}, function (err, customer){
 				if(err){
 					console.log("Customer not found");
 				}else{
 					res.json(customer);
 				}
 			})
 		},
 		update: function(req, res){
 			Customer.update({_id: req.body.id}, {name: req.body.name, phone: req.body.phone, mobile:req.body.mobile, dob:req.body.dob, address:req.body.address,email:req.body.email}, function (err, customer){
 				if(err){
 					console.log('Something went wrong');
 				} else{
 					console.log("Succesfully Updated Customer");
 					res.json(customer);
 				}
 			})
 		},
 		delete : function(req, res){
 			Customer.remove({_id: req.body.id}, function (err, customer){
    			if(err){
 					console.log('Customer not Found');
 				} else{
 					console.log("Succesfully Deleted Customer");
 					res.json(customer);
 				}
 			})
 		}
 	} 		
})();