angular.module('app').component('expenseListDisplay',{
    templateUrl:'/expenses/expenseListDisplay.html',
    bindings:{
        expenses:"<expenseData",
        selectExpense:'&'
    },
    controller:function(){
        var ctrl=this;
        ctrl.deleteExpense=function(expense){
            debugger;
            ctrl.expenses.$remove(expense);
        };

        this.clickRow=function(expense){
            
            this.selectExpense({expense:expense});
        }
    }
    
});