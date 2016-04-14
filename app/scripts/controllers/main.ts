/// <reference path="../app.ts" />

'use strict';

module iplApp {
  export interface IMainScope extends ng.IScope {
   team1: string;
   team2 : string;
   onTeam1Click: Function;
   onTeam2Click: Function;
  }
  
  var team1 = "MI";
  var team2 = "RCB";

  export class MainCtrl {
// Kolkata Knight Riders [KKR]
// Mumbai Indians [MI]
// Delhi Daredevils [DD]
// Kings XI Punjab [KXIP]
// Sunrisers Hyderabad [SRH]
// Royal Challengers Bangalore [RCB]
// Rising Pune Supergiants [RPS]
// Gujarat Lions [GL]
    constructor (private $scope: IMainScope,private $http: ng.IHttpService, private $location: ng.ILocationService) {
     $scope.team1 = team1;
     $scope.team2 = team2;
     
     $scope.onTeam1Click = function(){
         onTeamClick(true,$http,$location);
     }
     
     $scope.onTeam2Click = function(){
          onTeamClick(false,$http,$location);
     }
    }
  }
  
  function onTeamClick(IsTeam1,$http,$location){
      bootbox.dialog({
        message: "Please make sure before you proceed!",
        title: "Confirm",
        buttons: {
        success: {
        label: "I confirm",
        className: "btn-success",
        callback: ()=> {
        // call api
        
        $http.post("/api/products", {
        Team1: team1,
        Team2: team2,
        Name: "",
        IsVoted: true,
        IsTeam1: IsTeam1,
        IsTeam2: !IsTeam1
        }).success((res)=>{
           $location.path("/confirmation");
        }).error((res)=>{
            $location.path("/error");
        });
        }
        },
        danger: {
        label: "I will wait",
        className: "btn-danger",
        callback: function() {
        // descard
        }
        },
        main: {
        label: "I am neutral",
        className: "btn-primary",
        callback: function() {
        // tie / neutral
        }
        }
        }
        });
  }
  
  export class LiveCtrl {

    constructor (private $scope: IMainScope,private $http: ng.IHttpService, private $location: ng.ILocationService) {
     $scope.team1 = team1;
     $scope.team2 = team2;
     
     $http.get("/api/products").success(function(res){
         $scope.betters = res.data;
     });
    }
  }
  
  export class ResultCtrl {

    constructor (private $scope: IMainScope,private $http: ng.IHttpService, private $location: ng.ILocationService) {
     $scope.team1 = team1;
     $scope.team2 = team2;
    }
  }
}

var ipl_app = angular.module('iplApp',["ngRoute"])
  .controller('MainCtrl', iplApp.MainCtrl);

ipl_app.controller('LiveCtrl', iplApp.LiveCtrl);
  
  ipl_app.controller('ResultCtrl', iplApp.ResultCtrl);
  
  ipl_app.controller('MainCtrl', iplApp.MainCtrl);

ipl_app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/today-match', {
        templateUrl: '../../views/today-match.html',
        controller: 'MainCtrl'
      }).
      when('/live-bet', {
        templateUrl: '../../views/live-bet.html',
        controller: 'LiveCtrl'
      }).
      when('/result', {
        templateUrl: '../../views/result.html',
        controller: 'ResultCtrl'       
      }).
      when('/confirmation', {
        templateUrl: '../../views/confirmation.html',
        controller: 'MainCtrl'       
      }).
      when('/error', {
        templateUrl: '../../views/error.html',
        controller: 'MainCtrl'       
      }).
      otherwise({
        redirectTo: '/today-match'
      });
  }]);
  