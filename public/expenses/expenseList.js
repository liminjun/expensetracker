angular.module('app').factory('expenseList',function($firebaseArray){
    var ExpenseList=$firebaseArray.$extend({
        getTotal:function(){
            var total=0;
            angular.forEach(this.$list,function(rec){
                total+=rec.amount;
            });
            return total;
        }
    });

    return function(ref){
        return new ExpenseList(ref);
    }
});