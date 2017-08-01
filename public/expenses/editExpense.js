angular.module('app').component('editExpense', {
    templateUrl: '/expenses/editExpense.html',
    bindings: {
        categories: "=",
        createNewExpense: "&",
        editedExpense: '=',
        updateExpense: "&"
    },
    controller: function ($scope) {
        var ctrl=this;

        $scope.$watch('ctrl.editedExpense', (function (newData) {
            if (!!newData) {
                ctrl.editing = true;
                ctrl.amount = newData.amount;
                ctrl.desc = newData.description;
                var date = new Date(newData.date);
                ctrl.date = date.toLocaleDateString();

                ctrl.selectedCategory =
                    ctrl.categories[ctrl.categories.$indexFor(newData.category.id)]
                ctrl.payee = newData.payee;
            }
        }).bind(this));

        ctrl.setDefaults = function () {
            ctrl.amount = '';
            ctrl.desc = '';
            ctrl.payee = '';
            ctrl.date = new Date(Date.now()).toLocaleDateString();
            if (ctrl.categories.length > 0) {
                ctrl.selectedCategory = ctrl.categories[0];
            }

        };

        ctrl.setDefaults();

        ctrl.create = function () {
            ctrl.expenseData = {
                amount: parseFloat(ctrl.amount),
                description: ctrl.desc,
                payee: ctrl.payee,
                category: {
                    name: ctrl.selectedCategory.name,
                    id: ctrl.selectedCategory.$id
                },
                date: new Date(ctrl.date).toJSON()
            }

            ctrl.setDefaults();
            ctrl.createNewExpense({ expenseData: ctrl.expenseData });
        };

        ctrl.save = function () {
            ctrl.editedExpense.amount = parseFloat(ctrl.amount);
            ctrl.editedExpense.description = ctrl.desc;
            ctrl.editedExpense.payee = ctrl.payee;
            ctrl.editedExpense.date = new Date(ctrl.date).toJSON();
            ctrl.editedExpense.category = {
                name: ctrl.selectedCategory.name,
                id: ctrl.selectedCategory.$id
            }
            //save data
            ctrl.updateExpense();
            ctrl.setDefaults();
            ctrl.editing = false;
            ctrl.editedExpense = null;
        };
        ctrl.cancel = function () {
            ctrl.setDefaults();
            ctrl.editing = false;
            ctrl.editedExpense = null;
        }

    }

});