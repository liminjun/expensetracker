angular.module('app').controller('LoginController', ['$location', 'auth', 'currentAuth', function ($location,auth,currentAuth) {
    var ctrl = this;
    debugger;

    ctrl.loggedIn = !!currentAuth;
    if(ctrl.loggedIn){
        debugger;
        $location.path('/home');
    }
    // ctrl.anonLogin=function(){
    //     auth.$authAnonymously()
    //     .then(function(){
    //         $location.path('/home');
    //     })
    //     .catch(function(error){
    //         ctrl.errorMessage=error.code;
    //     });
    // };

    ctrl.googlePlusLogin = function () {
        auth.$signInWithPopup('google')
            .then(function () {
                $location.path('/categories');
            })
            .catch(function (error) {
                ctrl.errorMessage = error.code;
            });
    };

    ctrl.twitterLogin = function () {
        auth.$signInWithPopup('twitter')
            .then(function () {
                $location.path('/home');
            })
            .catch(function (error) {
                ctrl.errorMessage = error.code;
            });
    };

    ctrl.fbLogin = function () {
        auth.$signInWithPopup('facebook')
            .then(function () {
                $location.path('/home');
            })
            .catch(function (error) {
                ctrl.errorMessage = error.code;
            });
    };

    ctrl.githubLogin = function () {
        auth.$signInWithRedirect('github')
            .then(function () {
                debugger;
                $location.path('/home');
            })
            .catch(function (error) {
                debugger;
                ctrl.errorMessage = error.code;
            });
    }
}]);