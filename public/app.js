(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*******************************
* Add Dog Form Controller
*
********************************/

module.exports = function(app) {

  app.controller('AddDogFormController', ['$scope', 'DogService', function( $scope, DogService ){



  }])

}

},{}],2:[function(require,module,exports){
'use strict';
/*******************************
 * Dog In Controller
 *
 ********************************/

module.exports = function(app) {

    app.controller('DawgInController', ['$scope', '$rootScope', 'PawthenticationService', function($scope, $rootScope, PawthenticationService) {
        PawthenticationService.ClearCredentials();

        $scope.logIn = function() {
            PawthenticationService.LogIn($scope.username, $scope.password, function(response) {
                if (response.success) {
                    PawthenticationService.SetCredentials($scope.username, $scope.password);
                }//end if******
            })//end PawthenticationService call
        }; //end $scope.logIn***************************
    }]); //end controller******************
}; //***********end MODULE*************

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
'use strict';

/*******************************
* UpDawwg App
* Date: 7-7-2016
********************************/

(function () {

  var app = angular.module('UpDawwgApp', ['ngRoute', 'ngAnimate', 'ngCookies']);

  //router
  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'dogIn.html',
      controller: 'DawgInController'
    }).when('/feed', {
      templateUrl: 'feed.html',
      controller: 'FeedController'
    }).when('/details', {
      templateUrl: 'details.html',
      controller: 'DetailsController'
    }).when('/add-dog-form', {
      templateUrl: 'add-dog-form.html',
      controller: 'AddDogFormController'
    }).when('/logout', {
      templateUrl: 'dogIn.html',
      controller: 'DawgInController'
    }).when('/about', {
      templateUrl: 'about.html'
    }).otherwise({
      redirectTo: '/404'
    });
  }]);

  // Services
  require('./services/dog-service')(app);
  require('./services/pawthentication-service')(app);

  // Controllers
  require('./controllers/add-dog-form-controller')(app);
  require('./controllers/details-controller')(app);
  require('./controllers/feed-controller')(app);
  require('./controllers/nav-controller')(app);
  require('./controllers/dawgIn-controller')(app);

  // Filters

  // Directives
})();
},{"./controllers/add-dog-form-controller":1,"./controllers/dawgIn-controller":2,"./controllers/details-controller":3,"./controllers/feed-controller":4,"./controllers/nav-controller":5,"./services/dog-service":7,"./services/pawthentication-service":8}],7:[function(require,module,exports){
/*******************************
* Dog Service
*
********************************/

module.exports = function(app) {

  app.factory('DogService', ['$http', function($http) {

      let dawgz = [];

      let dog = {
        name: '',
        image: '',
        breed:'',
        age: '',
        description: '',
        ups: 0,
      };



      /*******************************
      * return object
      ********************************/
      return {
        getDawgz() {
          $http({
            url: './mock/dogs.json',
            method: 'GET'
          }).then(function(response){
            dawgz = response.data;
            console.log("before promise",dawgz);
            return dawgz;
          })
          return dawgz;
        },

        getDog(name) {
          //filter: find dog by name

        },

        //adds new dog to database
        setDog(data) {
          $http({
            url: '/dogs',
            method: 'POST',
            data: data,
          })

        },

        // increment UPs (addition happens in the back end)
        setUps(dogObj){
          $http({
            url: '/ups',
            method: 'POST',
            data: dogObj,
          })
        },

      } //********************************//

  }])//end DogService**********************//

}

},{}],8:[function(require,module,exports){
'use strict'
module.exports = function(app) {
    app.factory('PawthenticationService', ['$http', '$rootScope', '$cookies', function($http, $rootScope,$cookies) {
        let service = {};
        //Service functions*******************************
        service.LogIn = function(username, password, callback) {
            $http.post('/users', {
                    username: username,
                    password: password
                })
                .success(function(response) {
                    callback(response);
                });
        }; //service.LogIn ends***********************
        service.SetCredentials = function(username, password) {

            $rootScope.globals = {
                currentUser: {
                    // this is what you had but it was throwing errors in my gulp.
                    // this.username: username,
                    // this.password: password
                    username: username,
                    password: password
                }
            };
        $cookies.put('globals', $rootScope.globals)
        }; //service.SetCredentials ends******************

        service.ClearCredentials = function () {
          $rootScope.globals = {};
          $cookies.remove('globals');
      };
        return service;
    }]);
}

},{}]},{},[6])