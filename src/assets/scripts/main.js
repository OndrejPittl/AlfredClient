var app = angular.module("alfred", []);

app.controller('feedController', function($rootScope, $element) {
  salvattore.recreateColumns($element[0]);

  $rootScope.$on("$routeChangeStart", function (event, current, previous, rejection) {
    console.log($scope, $rootScope, $route, $location);
  });

  $rootScope.$on("$routeChangeSuccess", function (event, current, previous, rejection) {
    console.log($scope, $rootScope, $route, $location);
  });
});



app.run(function($rootScope, $location) {
  $rootScope.$on( "$routeChangeStart", function(event, next, current) {
    console.log("xxxx1");
  });
});
