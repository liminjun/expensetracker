'use strict';

var app = angular.module('app', ['ngRoute', 'firebase']);

app.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (e, next, prev, err) {
        debugger;
        if (err === "AUTH_REQUIRED") {
            $location.path("/login");
        }
    });
});

app.config(function ($routeProvider) {
    $routeProvider

        .when('/home', {
            templateUrl:'/home/home.html',
            controller:"HomeController",
            controllerAs:"ctrl",
            resolve: {
                expensesInOrder: function (fbRef, expenseList, auth) {
                    return auth.$requireSignIn().then(function () {

                        var query = fbRef.getExpensesRef().orderByChild('date');
                        return expenseList(query).$loaded();
                    });
                },
                categories: function (fbRef, $firebaseArray, auth) {
                    return auth.$requireSignIn().then(function () {
                        var query = fbRef.getCategoriesRef().orderByChild('name');
                        return $firebaseArray(query).$loaded();
                    });
                }
            }
        })
        .when('/userpref', {
            templateUrl: "/userpref/userpref.html",
            controller:"EditUserPrefController",
            controllerAs:"ctrl",
            resolve: {
                userPreferences: function (fbRef, $firebaseObject, auth) {
                    return auth.$requireSignIn().then(function () {
                        
                        return $firebaseObject(fbRef.getPreferencesRef()).$loaded();
                            
                    });
                }
            }
        })
        .when('/categories', {
            templateUrl: "categories/categories.html",
            controller: "CategoriesController",
            controllerAs: "ctrl",
            resolve: {
                categories: function (fbRef, $firebaseArray, auth) {
                    var rootRef = firebase.database().ref();

                    return auth.$requireSignIn().then(function () {
                        debugger;
                        var query = rootRef.child('categories').child(auth.$getAuth().uid);
                        return $firebaseArray(query).$loaded();
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
                    debugger;
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