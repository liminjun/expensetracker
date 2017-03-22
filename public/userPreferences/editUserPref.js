angular.module('app').component('editUserPref', {
    templateUrl: '/userPreferences/editUserPref.html',
    bindings: {
        userPrefData: '=userPreferences'
    },
    controller: function (fbRef, $scope, $location) {
        var ctrl = this;
        ctrl.themes = [
            "light",
            "dark"
        ];

        ctrl.userPrefData.$bindTo($scope,"$ctrl.userPreferences").then(function(){
            if(!ctrl.userPreferences.theme){
                ctrl.userPreferences.theme=ctrl.themes[0];
            }
        });

        ctrl.save = function () {
            ctrl.userPreferences.$save();
        };
        ctrl.cancel = function () {
            $location.path('/home');
        }
    }
});