(function () {
  'use strict';
  var App = angular.module('Plugins')

  App.controller('SpeedTestCtrl', function($scope, SpeedTestService, toastr, Socket){
    var socket = Socket.getSocket();
    socket.on('terminal:output:end', function(){
      $scope.running = false;
    })
    socket.on('terminal:output:error', function(err){
      toastr.error(err)
      $scope.running = false;
    })
    $scope.running = false;
    $scope.show_terminal = false
    SpeedTestService.get().then(function(res){
      var data = res.data || {}
      $scope.running = data.running
      $scope.show_terminal = $scope.running
    })
    $scope.speedtest = function(){
      $scope.show_terminal = true
      $scope.running = true
      SpeedTestService.start().then(function(){

      })
    }
  })
})();
