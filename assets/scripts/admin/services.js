(function() {
  "use strict";
  var App = angular.module("Plugins");
  App.service("SpeedTestService", ["$http", "toastr", "CatchHttpError", "$q", function($http, toastr, CatchHttpError, $q) {
    this.get = function() {
      return $http.get("/speedtest-plugin").catch(CatchHttpError)
    };
    this.start = function(server_id) {
      return $http.post("/speedtest-plugin/start", {
        server_id: server_id
      }).catch(CatchHttpError)
    }
  }])
})();