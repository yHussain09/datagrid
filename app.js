'use strict';

var app = angular.module('app', []);

app.REST_SERVICE_URI = 'localhost:3000/api/v1/';

// app.filter('depententComboFilter', function(){
//     return function(items, name){
//         console.log(items);
//         console.log(name);
//         return items.filter(function(c){return c.filterKey === name.code;});       
//     };
// });
