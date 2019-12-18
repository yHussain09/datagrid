

app.controller('appController', function ($scope, dataService) {
  const self = $scope

  console.log(self)
  console.log(dataService.getData('asadd', 2, 4, {a: 'a'}));

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
    { id: 8, firstname: 'Sarfraz', lastname: 'Hussain', age: 40, active: 'N' },
    { id: 9, firstname: 'Saad', lastname: 'Surya', age: 25, active: 'Y' },
    { id: 10, firstname: 'Shehzad', lastname: 'Bhai', age: 32, active: 'Y' },
    { id: 11, firstname: 'Waqas', lastname: 'Mehmood', age: 30, active: 'Y' },
    { id: 12, firstname: 'Remat', lastname: 'Ali', age: 27, active: 'Y' },
    { id: 13, firstname: 'Abdul', lastname: 'Shakoor', age: 28, active: 'Y' },
    { id: 14, firstname: 'Sarim', lastname: 'Shaikh', age: 24, active: 'Y' },
    { id: 15, firstname: 'Fawad', lastname: 'Paracha', age: 30, active: 'Y' },
    { id: 16, firstname: 'Rao', lastname: 'Tahir', age: 35, active: 'Y' },
    { id: 17, firstname: 'Talha', lastname: 'Bhai', age: 23, active: 'Y' },
    { id: 18, firstname: 'Tayaba', lastname: 'Qazi', age: 25, active: 'Y' }
  ]
  $scope.selectedStudents = [];
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

