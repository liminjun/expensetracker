angular.module('app').factory('fbRef',function(auth){
    return {
        getPreferencesRef:function(){
            var rootRef=firebase.database().ref();
           
            return rootRef.child('preferences').child(auth.$getAuth().uid);
        },
        getCategoriesRef:function(){
            
            var rootRef=firebase.database().ref();
            return rootRef.child('categories').child(auth.$getAuth().uid);
        },
        getExpensesRef:function(){
            var rootRef=firebase.database().ref();
            return rootRef.child('expenses').child(auth.$getAuth().uid);
        }
    }
});