var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var Bill = mongoose.model('Bill');
var Chance = require('chance');
var chance = new Chance();


module.exports = (function() {
 return {
 		add: function(req, res){
 			for(var i=0; i<50;i++){
 				var address = chance.address();
 				var name = chance.name();
 				var phone = chance.phone();
 				var mobile = chance.phone();
 				var email = chance.email();
 				var dob = chance.date();
 				var created_at = new Date();

 				var customer = new Customer({name:name, phone:phone, address:address, mobile:mobile, dob:dob, email:email, created_at:created_at});
 				customer.save(function(err, customer){
 				if(err){
 					console.log("Error");
 				} else{
 					console.log("Succesfully added Customer");
 				}
 			})
 			}
 			var billNumber = 1;
 			for (var i=1;i<=3000;i++){
		 				Customer.find(function (err,customer) {
		 				if(err){
		 					console.log("Customers not found");
		 				}else{
		 					var random = Math.floor((Math.random() * 10) + 1);
		 					var items = [];
		 					var total = 0;
		 					for(var j=1;j<=random;j++){
		 						var singleItem = []
		 						var itemName = chance.word();
			 					singleItem.push(itemName);
			 					var quantity = chance.integer({min:1, max: 10});
			 					singleItem.push(quantity);
			 					var rate = chance.floating({min: 1, max: 1000, fixed:2});
			 					singleItem.push(rate);
			 					items.push(singleItem)
			 					var price = quantity * rate;
			 					total += price;
			 				}
		 					var discount = chance.integer({min:10, max: 30});
		 					var tax = chance.integer({min:1, max: 20});
		 					var finalAmount = total - ((total * discount) / 100) + ((total * tax) / 100);
		 					var roundUp = Math.round(finalAmount * 100) / 100
		 					var customers = customer;
		 					var date = new Date();
		 					var random = [Math.floor(Math.random() * customers.length)]
		 					customerId = customers[random]._id
							// console.log(customers[random]._id);
							var bill = new Bill({billNumber: billNumber, billDate: date, items: items, discount: discount, tax: tax, created_at: date, customerId: customerId, total: roundUp});
							billNumber += 1;
							bill.save(function (err){
				 				if(err){
				 					console.log(err);
				 				} else{
				 					console.log("Succesfully added Bill");
				 				}
				 			})
		 				}
		 			})
		 		}
		 		res.json(customer)
 		}
 } 		
})();