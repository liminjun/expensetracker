angular.module('app').component('editExpense',{
    templateUrl:'/expenses/editExpense.html',
    bindings:{
        categories:"=",
        createNewExpense:"&",
        editedExpense:'=',
        updateExpense:"&"
    },
    controller:function($scope){
        $scope.$watch('$ctrl.editedExpense',(function(newData){
            if(!!newData){
                this.editing=true;
                this.amount=newData.amount;
                this.desc=newData.description;
                var date=new Date(newData.date);
                this.date=date.toLocaleDateString();

                this.selectedCategory=
                    this.categories[this.categories.$indexFor(newData.category.id)]
                this.payee=newData.payee;
            }
        }).bind(this));
        
        this.setDefaults=function(){
            this.amount='';
            this.desc='';
            this.payee='';
            this.date=new Date(Date.now()).toLocaleDateString();
            this.selectedCategory=this.categories[0];
        };

        this.setDefaults();

        this.create=function(){
            this.expenseData={
                amount:parseFloat(this.amount),
                description:this.desc,
                payee:this.payee,
                category:{
                    name:this.selectedCategory.name,
                    id:this.selectedCategory.$id
                },
                date:new Date(this.date).toJSON()
            }

            this.setDefaults();
            this.createNewExpense({expenseData:this.expenseData});
        };

        this.save=function(){
            this.editedExpense.amount=parseFloat(this.amount);
            this.editedExpense.description=this.desc;
            this.editedExpense.payee=this.payee;
            this.editedExpense.date=new Date(this.date).toJSON();
            this.editedExpense.category={
                name:this.selectedCategory.name,
                id:this.selectedCategory.$id
            }
            //save data
            this.updateExpense();
            this.setDefaults();
            this.editing=false;
            this.editedExpense=null;
        };
        this.cancel=function(){
            this.setDefaults();
            this.editing=false;
            this.editedExpense=null;
        }

    }
    
});