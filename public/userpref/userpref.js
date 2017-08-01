angular.module('app').
    controller('EditUserPrefController', ['fbRef', '$scope', '$location', 'userPreferences', function (fbRef, $scope, $location, userPreferences) {
        
        var ctrl = this;
        ctrl.themes = [
            "light",
            "dark"
        ];

        userPreferences.$bindTo($scope,"ctrl.userPreferences").then(function(){
            if(!ctrl.userPreferences.theme){
                ctrl.userPreferences.theme=ctrl.themes[0];
            }
        });

        ctrl.save = function () {
            debugger;
            userPreferences.$save();
        };
        ctrl.cancel = function () {
            $location.path('/home');
        }
    }]);