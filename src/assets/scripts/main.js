var app = angular.module("alfred", []);

app.controller('feedController', function($rootScope, $element) {

  // při route change: recall
  salvattore.recreateColumns($element[0]);
  

  // nefunguje
  $rootScope.$on("$routeChangeStart", function (event, current, previous, rejection) {
    console.log($scope, $rootScope, $route, $location);
  });

  // nefunguje
  $rootScope.$on("$routeChangeSuccess", function (event, current, previous, rejection) {
    console.log($scope, $rootScope, $route, $location);
  });
});


app.run(function($rootScope, $location) {

  // nefunguje
  $rootScope.$on( "$routeChangeStart", function(event, next, current) {
    console.log("xxxx1");
  });
});
