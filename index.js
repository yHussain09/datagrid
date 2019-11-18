'use strict'

var app = angular.module('app', [])

app.controller('appController', function ($scope) {
  const self = $scope

  console.log(self)
  $scope.search = {}
  
  // $scope.sort.columns = [];

  $scope.students = [
    { id: 1, firstname: 'Mahesh', lastname: 'Parashar', age: 25, active: 'Y' },
    { id: 2, firstname: 'Abdul', lastname: 'Manan', age: 30, active: 'Y'},
    { id: 3, firstname: 'Jalal', lastname: 'Hussain', age: 25, active: 'N'},
    { id: 4, firstname: 'Osama', lastname: 'Afzal', age: 26, active: 'N'},
    { id: 5, firstname: 'Sumeet', lastname: 'Khetpal', age: 24, active: 'N'},
    { id: 6, firstname: 'Faiz', lastname: 'Rehman', age: 35, active: 'N' },
    { id: 7, firstname: 'Amir', lastname: 'Ghulam', age: 38, active: 'N' },
    { id: 8, firstname: 'Sarfraz', lastname: 'Hussain', age: 40, active: 'N' }
  ]

  $scope.getStudentById = function (id) {
    return $scope.students.id[id]
  }

  

  $scope.editRow = function (rowIndex) {
    console.log(rowIndex)
  }

  //   $scope.getSortColumn = function () {
  //      return $scope.sort.column;
  //       // $scope.sort.columns.push(sort);
  //   }
})

