var customers = require('../controllers/customers.js');
var customerScript = require('../scripts/customerData.js');
var bills = require('../controllers/bills.js');

module.exports = function(app) {
    app.post('/create', function (req,res){
      customers.create(req, res)
    }),
    app.get('/customers', function (req,res){
    	customers.show(req, res)
    }),
    app.get('/dummyData', function (req, res){
    	customerScript.add(req, res)
    }),
    app.post('/getCustomer', function (req, res){
    	customers.find(req,res)
    }),
    app.post('/updateCustomer', function (req, res){
    	customers.update(req,res)
    }),
    app.post('/deleteCustomer', function (req, res){
    	customers.delete(req,res)
    }),
    app.get('/showBills', function (req, res){
    	bills.show(req,res)
    }),
   	app.get('/addDummyBills', function (req, res){
    	bills.addBills(req,res)
    }),
    app.post('/findBills', function (req, res){
    	bills.findBills(req,res)
    })
};