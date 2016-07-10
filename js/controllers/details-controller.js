/*******************************
* Add Dog Form Controller
*
********************************/

module.exports = function(app) {

  app.controller('DetailsController', ['$scope', 'DogService', function( $scope, DogService ){
      $scope.dog = DogService.dogD;

      $scope.upDawg = function () {
        console.log("dogD", $scope.dog);
        DogService.setUps($scope.dog);
      }

      $scope.back = function () {
        location.href = '#/feed'
      }
  }])

}
