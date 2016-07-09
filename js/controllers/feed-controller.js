/*******************************
* Feed Controller
*
********************************/

module.exports = function(app) {

  app.controller('FeedController', ['$scope', 'DogService', function($scope, DogService){

    /*******************************
    * get dog data from service
    ********************************/
    $scope.dawgz = DogService.getDawgz();
    $scope.dog = {};


    //probably need to add dog id and stuff
    $scope.dogDeets = function() {
      console.log('hello trying to get deets');
      let dogObj = {};
      location.href = '#/details';


    };

    ($scope.showDogs = function() {
      console.log('show dogs');
      $scope.dawgz = DogService.getDawgz();
    })();

  }])
}
