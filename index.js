'use strict'

 

var app = angular.module('app', [])

 

app.controller('appController', function ($scope) {

   self=$scope;

 

   console.log(self);

   $scope.search = {};

   $scope.sort = {};

   $scope.sort.reverse = false;

   $scope.sort.column = [];

  

   // $scope.sort.columns = [];

 

  $scope.students = [

    { id: 1, firstname: 'Mahesh', lastname: 'Parashar', age: 25 },

    { id: 2, firstname: 'Abdul', lastname: 'Manan', age: 30 },

    { id: 3, firstname: 'Jalal', lastname: 'Hussain', age: 25 },

    { id: 4, firstname: 'Osama', lastname: 'Afzal', age: 26 },

    { id: 5, firstname: 'Sumeet', lastname: 'Khetpal', age: 24 },

    { id: 6, firstname: 'Faiz', lastname: 'Rehman', age: 35 }

  ];

 

  $scope.getStudentById = function (id) {

    return $scope.students.id[id]

  }

 

  $scope.setSortColumn = function (sort) {

      $scope.sort.column = sort;

     $scope.sort.reverse = !$scope.sort.reverse;

     console.log($scope.sort);

  }

 

  $scope.editRow = function (rowIndex) {

     console.log(rowIndex);

   }

 

//   $scope.getSortColumn = function () {

//      return $scope.sort.column;

//       // $scope.sort.columns.push(sort);

//   }

 

 

  

})