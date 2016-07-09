/*******************************
* Nav Controller
*
********************************/

module.exports = function(app) {

  app.controller('NavController', ['$scope', 'DogService', function($scope, DogService){

    /*******************************
    * menu collapse
    ********************************/


    $scope.isCollapsed = false;


  }])
}
