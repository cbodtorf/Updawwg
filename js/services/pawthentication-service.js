'use strict'
module.exports = function(app) {
    app.factory('PawthenticationService', ['$http', '$rootScope', '$cookies', '$location', function($http, $rootScope, $cookies, $location) {
        let service = {};
        //Service functions*******************************
        service.LogIn = function(username, password, callback) {
            $http.post('/users', {
                    username: username,
                    password: password
                })
                .success(function(response) {
                    callback(response);
                }).then(function() {
                    $location.path('/about');
                });
        }; //service.LogIn ends***********************
        service.SetCredentials = function(username, password) {

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    password: password
                }
            };
            $cookies.put('globals', $rootScope.globals)
        }; //service.SetCredentials ends******************

        service.ClearCredentials = function() {
            $rootScope.globals = {};
            $cookies.remove('globals');
        };
        return service;
    }]);
}
