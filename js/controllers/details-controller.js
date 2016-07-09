/*******************************
* Add Dog Form Controller
*
********************************/

module.exports = function(app) {

  app.controller('DetailsController', ['$scope', 'DogService', function( $scope, DogService ){
      $scope.dog = {};

      $scope.upDawg = function () {
        DogService.setUps();
      }

      $scope.back = function () {
        location.href = '#/feed'
      }
  }])

}
