app.directive('dataform', function($compile) {
    return {
      scope: {
        formTitle: '@',
        formModel: '=?',
        showHeader: '=?'
      },
      restrict: 'E',
      replace: true,
      link: function (scope, elem, attrs) {
        elem.html(scope.getTemplate())
        $compile(elem.contents())(scope)
      },
      controller: function ($scope) {
        self = $scope;
        
        $scope.deleteRow = function(index){
          $scope.gridData.splice(index, 1);
        };
        $scope.addNewRow = function(){
            // let newRow = {};
            // gridData.push(newRow);
            $scope.newRowData = {};
            $scope.isNewRow = !$scope.isNewRow;
        };
        $scope.saveRow = function(rowModal, index, isNewRow){
          if(isNewRow){
            $scope.gridData.push(rowModal);
          }else{
            $scope.gridData[index] = rowModal;
            console.log(rowModal);
          }
          $scope.isNewRow = false;
          // $scope.toast('record saved ', false);
        }

        $scope.getTemplate = function () {
          return '<div class="card">' +
                 '   <div ng-show="showHeader" class="card-header" style="background-color: darkturquoise;color: white;font-weight: bold;"> {{formTitle}} </div>' +
                 '   <div class="card-body">' +
                 '      <form>' +
                 '          <div class="form-group">' +
                 '              <label for="exampleInputEmail1">Email address</label>' +
                   '<input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">' +
                   '<small id="emailHelp" class="form-text text-muted">We\'ll never share your email with anyone else.</small>' +
                 '</div>' +
                 '<div class="form-group">' +
                   '<label for="exampleInputPassword1">Password</label>' +
                   '<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">' +
                 '</div>' +
                 '<div class="form-group form-check">' +
                   '<input type="checkbox" class="form-check-input" id="exampleCheck1">' +
                   '<label class="form-check-label" for="exampleCheck1">Check me out</label>' +
                 '</div>' +
                 '<button type="submit" class="btn btn-primary">Submit</button>' +
               '</form>' +
                 '   </div>' +
                 '   <div class="card-footer"></div>'
                 '</div>'
        }
      }
    }
  });
  