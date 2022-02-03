(function() {
  "use strict";
  var App = angular.module("Plugins");
  App.controller("SpeedTestCtrl", function($scope, SpeedTestService, toastr, Socket) {
    var socket = Socket.getSocket();
    socket.on("terminal:output:end", function() {
      $scope.running = false
    });
    socket.on("terminal:output:error", function(err) {
      toastr.error(err);
      $scope.running = false
    });
    $scope.running = false;
    $scope.show_terminal = false;
    $scope.payload = {};
    $scope.loading = true;
    SpeedTestService.get().then(function(res) {
      var data = res.data || {};
      $scope.servers = data.servers;
      $scope.payload.server_id = ($scope.servers[0] || {}).id;
      $scope.running = data.running;
      $scope.show_terminal = $scope.running
      $scope.loading = false;
    });
    $scope.speedtest = function() {
      $scope.show_terminal = true;
      $scope.running = true;
      SpeedTestService.start($scope.payload.server_id).then(function() {})
    }
  })
})();