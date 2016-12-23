var app = angular.module('myApp', []);


//working with browser events

app.controller('RolloverCtrl', function ($scope) {

});
app.directive('tstRolloverBrowserEvents', function () {
    return {
        scope: { label : '@' },
        templateUrl: 'template/TestRollover.html',
        //replace : true,
        link: function (scope, elems, attrs) {
            var originalColor = elems.css('background-color');

            elems.bind('mouseover', function () {
                elems.css('color', 'red');

            });
            elems.bind('mouseout', function () {
                elems.css('color', originalColor);
            });
            
        }

    };

});
//working with attribute changes
app.controller('ThermoCtrl', function ($scope) {
    this.currTemp = "60";
});
app.directive('tstThermo', function () {
    return {
        scope: { temprature: '@'},
        templateUrl: 'template/Thermo.html',
        link: function (scope, elems, attrs) {

            attrs.$observe('temprature', function (newValue) {
                var val = attrs.temprature;
                console.log(val);
                if (val < 40)
                {
                    elems.removeClass('normal');
                    elems.removeClass('hot');
                    elems.addClass('freezing');
                    
                }
                else if (val >= 40 && val <= 80) {
                    elems.removeClass('freezing');
                    elems.removeClass('hot');
                    elems.addClass('normal');
                    
                }
                else {
                    elems.removeClass('normal');
                    elems.removeClass('freezing');
                    elems.addClass('hot');
                   
                }
            })
        }
            
    };

});


//nested directives
app.controller('NestedCtrl', function () {


});
app.directive('tstSchoolViewNested', function () {
    return {
        templateUrl: 'template/SchoolNested.html',
        transclude: true,
        restrict: 'E',
        controller: function ($scope) {
            $scope.students = [];
            this.register = function (name, id) {
                $scope.students.push ({ name : name, id : id})
            };
        }
    };
});
app.directive('tstStudentViewNested', function () {
    return {
        templateUrl: 'template/StudentNested.html',
        restrict: 'E',
        require: '^tstSchoolViewNested',
        scope: { name : '@', id : '@'},
        link: function (scope, element, attrs, schoolController) {
            schoolController.register(scope.name, scope.id);
            console.log('student registered')
        }
    };

});



app.directive('tstSchoolView', function () {
    return {
        templateUrl: 'template/School.html',
        restrict: 'E',
        controller: function ($scope) {
            $scope.courses = [];
            this.addCourse = function (courseName) {
                $scope.courses.push(courseName);
                console.log(courseName + ' added to curriculam.')
            };
        }
    };
});

app.directive('tstPhysics', function () {
    return {
        require: 'tst-school-view',
        restrict: 'A',
        link: function (scope, elems, attrs, SchoolController) {
            SchoolController.addCourse('Physics');
            console.log('Physics course created');

        }
    };

});
app.controller('SchoolCtrl', function () {


});


app.directive('tstTransDir', function () {
    return {
        scope: { item: '=' },
        restrict: 'AE',
        transclude: true,
        templateUrl: 'template/TransclusionUser.html'
    };
});

app.controller('TranscludeCtrl', function () {
    this.user = { firstName: 'Mr. Koushik' };
});
//dynamic controller in directive
app.directive('tstGenerateAnimals', function () {
    return {
        templateUrl: 'template/DynamicController.html',
        scope: { item: '=' },
        controller: '@',
        name: 'controllerName'
    };


});
app.controller('BirdCtrl', function ($scope) {
    $scope.state = 'waiting';
    $scope.move = function () { $scope.state = 'flying' };
});
app.controller('HorseCtrl', function ($scope) {
    $scope.state = 'resting';
    $scope.move = function () { $scope.state = 'galloping' };
});
app.controller('SnakeCtrl', function ($scope) {
    $scope.state = 'sleeping';
    $scope.move = function () { $scope.state = 'crawling' };
});

app.controller('DynamicCtrl', function ($scope) {
    this.id = { name: '101' }
    $scope.bird = { name: 'Tia' };
    $scope.horse = { name: 'Chetak' };
    $scope.snake = { name: 'Anakonda' };


})

app.directive('tstGenerateNumbers', function () {

    return {

        scope: { generatorFunction: '&', onSave: '&', count: '=?' },
        templateUrl: 'template/GenerateNumbers.html',
        restrict: 'E',
        controller: function ($scope) {

            if ($scope.generatorFunction) {
                $scope.items = $scope.generatorFunction({ count: $scope.count });
            }
            $scope._onSave = function () {
                if ($scope.onSave) {
                    $scope.onSave();
                }
            };

        }
    };
});

app.controller('NumberCtrl', function ($scope) {

    this.GenerateRandomNumbers = function (count) {
        var results = [];
        count = count || 10;
        for (var i = 0; i < count; i++) {
            var item = Math.round(Math.random() * 1000);
            results.push(item);
        }
        return results;
    };
    this.GenerateSequenceNumbers = function (count) {
        var results = [];
        count = count || 10;
        for (var i = 0; i < count; i++) {
            results.push(i);
        }
        return results;
    };
    this.SaveFirst = function () { alert('First Item Saved'); };
    this.SaveSecond = function () { alert('Second Item Saved'); };
});

app.directive('tstVehicleDisp', function () {

    return {
        scope: { holder: '=' },
        templateUrl: 'template/Vehicle.html',
        restrict: 'EA'
    };

});

app.controller('HomeCtrl', ['$scope', function ($scope) {
    $scope.firstItem = { model: "Honda", year: '2015', price: '8 lakhs' };
    $scope.secondItem = { model: "BMW", year: '2014', price: '40 lakhs' };
}]);