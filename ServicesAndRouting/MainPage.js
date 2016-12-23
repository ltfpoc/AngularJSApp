var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/about', { templateUrl: 'views/About.html' })
        .when('/contact', { templateUrl: 'views/Contact.html' })
        .when('/welcome',

                {
                    templateUrl: 'views/Welcome.html',
                    controller: 'ProductCtrl',
                    controllerAs: 'vm',
                    prodDetails: { name: 'Envision', domain: 'Tech Vision' }
                })
        .when('/product/:productid',
                {
                    templateUrl: 'views/Product.html',
                    controller: 'ProductCtrl',
                    controllerAs: 'vm',
                    prodDetails: { name: 'Fleetcor', domain: 'Fuel Cart' }
                })
    .otherwise({ redirectTo: '/about' })
}])

app.controller('NavCtrl', function ($location) {

    this.goto = function (path) {
        $location.replace();
        $location.path(path);
    };
});

app.controller('ProductCtrl', ['$route', function ($route) {
    var vm = this;
    vm.details = "Hello, from Product controller";
    vm.prodDetails = $route.current.prodDetails;
   

}]);

app.controller('WelcomeCtrl', function ($scope) {
    this.details = "Hello, from Welcome controller";
    vm.prodDetails = $route.current.prodDetails;
});