(function () {
  'use strict';

  var App = angular.module('Plugins')

  App.service('SpeedTestService', [
    '$http',
    'toastr',
    'CatchHttpError',
    '$q',
    function($http, toastr, CatchHttpError, $q) {

      this.get = function () {
        return $http.get('/speedtest-plugin').catch(CatchHttpError);
      }

      this.start = function(){
        return $http.post('/speedtest-plugin/start').catch(CatchHttpError);
      }
    }
  ])

})();
