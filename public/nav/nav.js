angular.module('app').component('nav', {
    templateUrl: '/nav/nav.html',
    controller: function ($firebaseObject,auth) {
        var ctrl = this;

        ctrl.loaded = false;

        var rootRef = firebase.database().ref();



        ctrl.userPreferences = $firebaseObject(rootRef.child('preferences').child(auth.$getAuth().uid));

        ctrl.userPreferences.$loaded().then(function (data) {
            ctrl.loaded = true;
            ctrl.darkTheme = ctrl.userPreferences.theme === 'dark';
        });

    }
});