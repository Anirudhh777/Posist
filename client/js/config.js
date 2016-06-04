var myapp = angular.module('posist', ['ngRoute','ngMessages']);
	myapp.config(function ($routeProvider) {
		$routeProvider
		.when('/',{     
                templateUrl: 'partials/main.html'
            })
            .otherwise({
              redirectTo: '/'
            });
    });