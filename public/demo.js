'use strict';

var app = angular.module('app', ['ngRoute', 'firebase']);

app.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (e, next, prev, err) {
        if (err === "AUTH_REQUIRED") {
            $location.path("/login");
        }
    });
});

app.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: "categories/categories.html",
            controller: "CategoriesController",
            controllerAs: "ctrl",
            resolve: {
                categories: function (auth, $firebaseArray) {

                    return auth.$requireSignIn().then(function () {
                        var rootRef = firebase.database().ref();
                        var query = rootRef.child('categories').child(auth.$getAuth().uid);
                        return $firebaseArray(query).$loaded();
                            // .then(function (response) {
                            //     return response;
                            // })
                            // .catch(function (error) {
                            //     console.log("Error:", error);
                            // });
                    });
                }
            }
        })
        .when('/login', {
            templateUrl: 'login/login.html',
            controller: "LoginController",
            controllerAs: "ctrl",
            resolve: {
                currentAuth: ['auth', function (auth) {
                    return auth.$waitForSignIn();
                }]
            }
        })
        .when('/logout', {
            template: '',
            controller: "LogoutController"
        })
        .otherwise('/login');
});