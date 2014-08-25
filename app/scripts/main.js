

var app = angular.module('capraShop',['ngRoute']);

app.controller("CapraController", function($scope){
   $scope.message = "Hola!";
});


app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'app/templates/message.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
