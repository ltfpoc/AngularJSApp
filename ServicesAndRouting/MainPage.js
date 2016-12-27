var app = angular.module('myApp', ['ngRoute']);

app.controller('WatchCtrl', ['$scope', function ($scope) {
    var vm = this;
    vm.name = '';
    vm.specialName = 'Raja';
    vm.message = '';
    $scope.$watch('wtch.name', function (newValue, oldValue) {
        console.log(newValue);
        if(newValue == vm.specialName )
        {
            vm.message = 'Hello, u are welcome' + vm.specialName ;
        }
        else { vm.message = '';}


    })



}]);





app.filter('dashes', function () {
    return function (value) {
        value = value.replace(/\s/g,' - ')
        return value;
    };
});

app.controller('filterController', ['$filter',  function ($filter) {
    //var dashFilter = $filter('dashes');
    this.testValue ='My name is khan';
    this.getFilterText = function () {
        alert('This is new baba');
        this.testValue = 'This is new baba';
    };
}])

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