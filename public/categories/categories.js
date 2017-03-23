angular.module('app')
    .controller('CategoriesController', ['$firebaseArray','auth','categories', function ($firebaseArray,auth,categories) {
        var ctrl = this;
        var rootRef = firebase.database().ref();
        var query = rootRef.child('categories').child(auth.$getAuth().uid);
        //ctrl.categories=$firebaseArray(query);
        ctrl.categories=categories;



        ctrl.createNewCategory = function () {
            ctrl.categories.$add({ name: ctrl.newCategoryName }).then(function (ref) {
                var id = ref.key;
                console.log(id);
            }, function () {
                console.log("添加分类失败!");
            });
            ctrl.newCategoryName = '';
        }
    }]);
// .component('categoryList', {
//     templateUrl: '/categories/categories.html',
//     bindings:{
//         categories:'='
//     },
//     controller: function ($firebaseObject, fbRef) {
//         var ctrl=this;

//         ctrl.createNewCategory=function(){
//             ctrl.categories.$add({name:ctrl.newCategoryName}).then(function(){

//             },function(){

//             });
//             ctrl.newCategoryName='';
//         }
//     }
// });