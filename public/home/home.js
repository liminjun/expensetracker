angular.module('app').component('home',{
    templateUrl:'/home/home.html',
    bindings:{
        expensesInOrder:'=',
        categories:'='
    },
    controller:function(rootRef){
        rootRef.on('value',function(){
            console.log("connected");
        });

        this.createExpense=function(expenseData){
            this.expensesInOrder.$add(expenseData);
        };

        this.editExpense=function(expense){
            this.editedExpense=expense;
        };
        this.updateExpense=function(){
            this.expensesInOrder.$save(this.editedExpense);
        }
    }
});