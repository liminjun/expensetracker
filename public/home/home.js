angular.module('app').controller('HomeController', ['rootRef','expensesInOrder','categories', function (rootRef,expensesInOrder,categories) {
    rootRef.on('value', function () {
        console.log("connected");
    });

    this.expensesInOrder=expensesInOrder;
    this.categories=categories;

    this.createExpense = function (expenseData) {
        this.expensesInOrder.$add(expenseData);
    };

    this.editExpense = function (expense) {
        this.editedExpense = expense;
    };
    this.updateExpense = function () {
        this.expensesInOrder.$save(this.editedExpense);
    }
}]);