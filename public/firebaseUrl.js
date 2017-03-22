angular.module('app')
.service('rootRef',function(){
    return firebase.database().ref();
});