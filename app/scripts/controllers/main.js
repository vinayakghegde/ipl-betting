/// <reference path="../app.ts" />
'use strict';
var iplApp;
(function (iplApp) {
    var team1 = "MI";
    var team2 = "RCB";
    var MainCtrl = (function () {
        // Kolkata Knight Riders [KKR]
        // Mumbai Indians [MI]
        // Delhi Daredevils [DD]
        // Kings XI Punjab [KXIP]
        // Sunrisers Hyderabad [SRH]
        // Royal Challengers Bangalore [RCB]
        // Rising Pune Supergiants [RPS]
        // Gujarat Lions [GL]
        function MainCtrl($scope, $http, $location) {
            this.$scope = $scope;
            this.$http = $http;
            this.$location = $location;
            $scope.team1 = team1;
            $scope.team2 = team2;
            $http.get("/api/products").success(function () {
                // already voted
                // redirect to confirmation
                //else
                //  $scope.team1 = team1;
                //  $scope.team2 = team2;
            })
                .error(function () {
                // redirect to error page
            });
            $scope.onTeam1Click = function () {
                onTeamClick(true, $http, $location);
            };
            $scope.onTeam2Click = function () {
                onTeamClick(false, $http, $location);
            };
        }
        return MainCtrl;
    }());
    iplApp.MainCtrl = MainCtrl;
    function onTeamClick(IsTeam1, $http, $location) {
        bootbox.dialog({
            message: "Please make sure before you proceed!",
            title: "Confirmation",
            buttons: {
                success: {
                    label: "I confirm",
                    className: "btn-success",
                    callback: function () {
                        // call api
                        $http.post("/api/products", {
                            Team1: team1,
                            Team2: team2,
                            Name: "",
                            IsVoted: true,
                            IsTeam1: IsTeam1,
                            IsTeam2: !IsTeam1
                        }).success(function (res) {
                            $location.path("/confirmation");
                        }).error(function (res) {
                            $location.path("/error");
                        });
                    }
                },
                danger: {
                    label: "I will wait",
                    className: "btn-danger",
                    callback: function () {
                        // descard
                    }
                },
                main: {
                    label: "I will not participate",
                    className: "btn-primary",
                    callback: function () {
                        $location.path("/live-bet");
                    }
                }
            }
        });
    }
    var LiveCtrl = (function () {
        function LiveCtrl($scope, $http, $location) {
            this.$scope = $scope;
            this.$http = $http;
            this.$location = $location;
            $scope.team1 = team1;
            $scope.team2 = team2;
            $http.get("/api/products").success(function (res) {
                // divide the response into team1 / team2 supporters
            })
                .error(function (res) {
                // $scope.IsError = error occurred
            });
        }
        return LiveCtrl;
    }());
    iplApp.LiveCtrl = LiveCtrl;
    var ResultCtrl = (function () {
        function ResultCtrl($scope, $http, $location) {
            this.$scope = $scope;
            this.$http = $http;
            this.$location = $location;
            $scope.team1 = team1;
            $scope.team2 = team2;
            // use previous schema
            // http get
            // divide winners / loosers by IsTeam1Won field
        }
        return ResultCtrl;
    }());
    iplApp.ResultCtrl = ResultCtrl;
})(iplApp || (iplApp = {}));
var ipl_app = angular.module('iplApp', ["ngRoute"])
    .controller('MainCtrl', iplApp.MainCtrl);
ipl_app.controller('LiveCtrl', iplApp.LiveCtrl);
ipl_app.controller('ResultCtrl', iplApp.ResultCtrl);
ipl_app.controller('MainCtrl', iplApp.MainCtrl);
ipl_app.config(['$routeProvider',
    function ($routeProvider) {
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
