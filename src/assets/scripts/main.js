var app = angular.module("alfred", []);

app.controller('feedController', function($rootScope, $element) {

  // při route change: volat tento řádek
  salvattore.recreateColumns($element[0]);

});


app.run(function($rootScope, $location) {

});
