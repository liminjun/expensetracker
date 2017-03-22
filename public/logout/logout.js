angular.module('app')
    .controller('LogoutController', ['auth', '$location', '$timeout', function (auth, $location, $timeout) {

        auth.$signOut();
        $timeout(function () {
            $location.path("/login");
        }, 0);

    }]);