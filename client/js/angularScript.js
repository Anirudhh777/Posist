myapp.factory('mainFactory', function($http) {
        var factory = {};
        factory.addCustomer = function(info, callback){
            $http.post('/create', info).success(function (output){
                callback(output);
            })
        }
        factory.showCustomers = function(callback){
            $http.get('/customers').success(function (output){
                callback(output);
            })
        }
        factory.addDummyData = function(callback){
            $http.get('/dummyData').success(function (output){
                callback(output);
            })
        }
        factory.getCustomer = function(info, callback){
            $http.post('/getCustomer', info).success(function (output){
                callback(output);
            })
        }
        factory.updateCustomer = function(info, callback){
            $http.post('/updateCustomer', info).success(function (output){
                callback(output);
            })
        }
        factory.deleteCustomer = function(info, callback){
            $http.post('/deleteCustomer', info).success(function (output){
                callback(output);
            })
        }
        factory.showBills = function(callback){
             $http.get('/showBills').success(function (output){
                callback(output);
            })
        }
        factory.addDummyBills = function (callback){
            $http.get('/addDummyBills').success(function (output){
                callback(output);
            })
        }
        factory.findBills = function (info, callback){
            $http.post('/findBills', info).success(function (output){
                callback(output);
            })
        }
        return factory;
    });

myapp.controller('mainController', function($scope, mainFactory) {
    mainFactory.showCustomers(function (data){
        if(data.length < 50){
            mainFactory.addDummyData(function (data){
                mainFactory.showCustomers(function (data){
                    $scope.customerData = data
                })
            })
        }else{
            $scope.customerData = data;
        }
    })
    mainFactory.showBills(function (data){
            $scope.billsData = data;
    })
    $scope.addCustomer = function(){
        console.log($scope.dob)
        var address = [];
        var addressFormat = $scope.street + "," + $scope.city + "," + $scope.state + "," + $scope.pin + "," + $scope.country;
        address.push(addressFormat);
        if($scope.altStreet != undefined){
            var addressFormat = $scope.altStreet + "," + $scope.altCity + "," + $scope.altState + "," + $scope.altPin + "," + $scope.altCountry;
            console.log("Inside Alt")
                address.push(addressFormat);
        }
        console.log(address);
        var customer_repack = {
            name: $scope.name,
            address: address,
            mobile: $scope.mobile,
            phone: $scope.phone,
            dob: $scope.dob,
            email: $scope.email,
            created_at: new Date()
        }
        console.log(customer_repack);
        mainFactory.addCustomer(customer_repack, function (){
            mainFactory.showCustomers(function (data){
                $scope.customerData = data;
            })

        })
    } 
    $scope.editCustomer = function(data){
        var info = {
            id: data
        };
        mainFactory.getCustomer(info, function (data){
            $scope.editButton = true;
            $scope.id = data._id;
            $scope.name = data.name;
            var phone = data.phone;
            $scope.phone = parseInt(phone.replace(/[- )(]/g,''));
            var mobile = data.mobile;
            $scope.mobile = parseInt(mobile.replace(/[- )(]/g,''));
            $scope.email = data.email;
            var address = data.address[0].toString();
            var addressArray = address.split(",");
            $scope.street = addressArray[0];
            $scope.city = addressArray[1];
            $scope.state = addressArray[2];
            $scope.pin = addressArray[3];
            $scope.country = addressArray[4]
            if(data.address.length > 1){
                $scope.altStreet = data.address[1];
                var address = data.address[1].toString();
                var addressArray = address.split(",");
                $scope.altStreet = addressArray[0];
                $scope.altCity = addressArray[1];
                $scope.altState = addressArray[2];
                $scope.altPin = addressArray[3];
                $scope.altCountry = addressArray[4]
            }
        })
    }
    $scope.updateCustomer = function(data){
        var address = [];
        var addressFormat = $scope.street + "," + $scope.city + "," + $scope.state + "," + $scope.pin + "," + $scope.country;
        address.push(addressFormat);
        if($scope.altStreet != undefined){
            var addressFormat = $scope.altStreet + "," + $scope.altCity + "," + $scope.altState + "," + $scope.altPin + "," + $scope.altCountry;
            console.log("Inside Alt")
                address.push(addressFormat);
        }
        var info = {
            id: data,
            name: $scope.name,
            address: address,
            mobile: $scope.mobile,
            phone: $scope.phone,
            dob: $scope.dob,
            email: $scope.email
        }
        mainFactory.updateCustomer(info, function (data1){
            mainFactory.showCustomers(function (data){
                $scope.customerData = data;
            })
        })
    }

    $scope.deleteCustomer = function(data){
        var info = {
            id: data
        }
        mainFactory.deleteCustomer(info, function (data1){
            mainFactory.showCustomers(function (data){
                $scope.customerData = data;
            })
        })
    }

    $scope.findBills = function(data){
        var info = {
            id: data
        }
        mainFactory.findBills(info, function (data){
            $scope.noOfBills = data.length;
            var amount = 0;
            for (var i=0;i<data.length;i++){
                    amount += data[i].total;
            }
            $scope.amount = Math.round(amount * 100) / 100
            var avgAmount = $scope.amount / $scope.noOfBills;
            $scope.avgAmount = Math.round(avgAmount * 100) / 100           
        })
    }
})