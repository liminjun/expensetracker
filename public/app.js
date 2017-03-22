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

        // .when('/home', {
        //     template: "<home categories='$resolve.categories' expenses-in-order='$resolve.expensesInOrder'></home>",
        //     resolve: {
        //         expensesInOrder: function (fbRef, expenseList, auth) {
        //             return auth.$requireSignIn().then(function () {

        //                 var query = fbRef.getExpensesRef().orderByChild('date');
        //                 return expenseList(query).$loaded();
        //             });
        //         },
        //         categories: function (fbRef, $firebaseArray, auth) {
        //             return auth.$requireSignIn().then(function () {
        //                 var query = fbRef.getCategoriesRef().orderByChild('name');
        //                 return $firebaseArray(query).$loaded();
        //             });
        //         }
        //     }
        // })
        // .when('/userpref', {
        //     template: "<edit-user-pref user-preferences='$resolve.userPreferences'></edit-user-pref>",
        //     resolve: {
        //         userPreferences: function (fbRef, $firebaseObject, auth) {
        //             return auth.$requireSignIn().then(function () {
        //                 return $firebaseObject(fbRef.getPreferencesRef()).$loaded();
        //             });
        //         }
        //     }
        // })
        .when('/categories', {
            templateUrl: "categories/categories.html",
            controller: "CategoriesController",
            controllerAs: "$ctrl",
            resolve: {
                categories: function (fbRef, $firebaseArray, auth) {
                    var rootRef = firebase.database().ref();

                    return auth.$requireSignIn().then(function () {
                        var query = rootRef.child('categories').child(auth.$getAuth().uid);
                        return $firebaseArray(query).$loaded();
                    });
                }
            }
        })
        .when('/login', {
            templateUrl: 'login/login.html',
            controller: "LoginController",
            controllerAs: "$ctrl",
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