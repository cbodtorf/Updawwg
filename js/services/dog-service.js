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
