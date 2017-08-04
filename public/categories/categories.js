angular.module('app')
    .controller('CategoriesController', ['$firebaseArray', 'auth', 'categories', function ($firebaseArray, auth, categories) {
        var ctrl = this;
        var rootRef = firebase.database().ref();
        var query = rootRef.child('categories').child(auth.$getAuth().uid);
        //ctrl.categories=$firebaseArray(query);
        ctrl.categories = categories;

        ctrl.isEditd = false;
        ctrl.category = {};

        ctrl.createNewCategory = function () {

            if (!ctrl.isEditd) {
                ctrl.categories.$add({
                    name: ctrl.newCategoryName,
                    description: ctrl.newCategoryDescription,
                    date: new Date().toJSON()
                }).then(function (ref) {
                    var id = ref.key;
                    console.log(id);

                }, function () {
                    alert("添加分类失败!");
                });
            } else {
                //编辑
                ctrl.category.name = ctrl.newCategoryName;
                ctrl.category.description = ctrl.newCategoryDescription;
                ctrl.categories.$save(ctrl.category);
            }
            ctrl.newCategoryName = '';
            ctrl.newCategoryDescription = '';
        };
        ctrl.editCategory = function (category) {
            ctrl.isEditd = true;
            ctrl.category = category;
            ctrl.newCategoryName = category.name;
            ctrl.newCategoryDescription = category.description;
        }




        ctrl.deleteCategory = function (category) {
            ctrl.categories.$remove(category);
        }
    }]);