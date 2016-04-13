/// <reference path="../app.ts" />
'use strict';
var iplApp;
(function (iplApp) {
    var MainCtrl = (function () {
        function MainCtrl($scope) {
            this.$scope = $scope;
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
        }
        return MainCtrl;
    }());
    iplApp.MainCtrl = MainCtrl;
})(iplApp || (iplApp = {}));
angular.module('iplApp')
    .controller('MainCtrl', iplApp.MainCtrl);
