var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/about',   { templateUrl: 'views/About.html' })
        .when('/contact', { templateUrl: 'views/Contact.html' })
        .when('/welcome', { templateUrl: 'views/Welcome.html' })
}])

app.controller('MainCtrl', function ($scope) {
    
});


app.controller('ProductCtrl', function ($scope) {

});