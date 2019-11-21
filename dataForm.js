app.directive('dataform', function($compile) {
    return {
      scope: {
        formTitle: '@',
        formModel: '=?',
        showHeader: '=?',
        formFields: '=?',
        labelWidth: '=?',
        fieldWidth: '=?',
        endPoint: '@?'
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
        };

        if(!$scope.labelWidth)$scope.labelWidth = 4;
        if(!$scope.fieldWidth)$scope.fieldWidth = 8;

        $scope.newRecord = function(model){
            model.data = {};
        };

        $scope.saveRecord = function(){
          console.log($scope.endPoint);
        };

        $scope.updateRecord = function(){
          console.log($scope.endPoint);
        };

        $scope.deleteRecord = function(){
          console.log($scope.endPoint);
        };

        $scope.getTemplate = function () {
          return '<div class="card">' +
                 '   <div ng-show="showHeader" class="card-header" style="background-color: darkturquoise;color: white;font-weight: bold;"> {{formTitle}} </div>' +
                 '   <div class="card-body">' +
                 '      <form>' +
                 '          <div class="form-group row" ng-repeat="field in formFields">' +
                 '            <label class="col-form-label-sm col-sm-{{labelWidth}}" for="{{field.key}}">{{field.caption}}</label>' +
                 '            <div class="col-sm-{{fieldWidth}}">' +
                 '              <input id="{{field.key}}" type="{{field.dataType}}" ng-model="formModel.data[field.key]" class="form-control form-control-sm" placeholder="{{field.placeholder}}">' +
                 '            </div>' +
                //  '            <small id="emailHelp" class="form-text text-muted">We\'ll never share your email with anyone else.</small>' +
                 '          </div>' +
                //  '          <div class="form-group">' +
                //  '            <label for="exampleInputPassword1">Password</label>' +
                //  '            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">' +
                //  '          </div>' +
                //  '          <div class="form-group form-check">' +
                //  '            <input type="checkbox" class="form-check-input" id="exampleCheck1">' +
                //  '            <label class="form-check-label" for="exampleCheck1">Check me out</label>' +
                //  '          </div>' +
                 '        </form>' +
                 '   </div>' +
                 '   <div class="card-footer">' +
                 '      <button ng-click="newRecord(formModel)" class="btn btn-outline-primary btn-sm">New</button>' +
                 '      <button ng-click="saveRecord(formModel.data)" class="btn btn-outline-success btn-sm">Save</button>' +
                 '      <button ng-click="updateRecord(formModel.data)" class="btn btn-outline-info btn-sm">Update</button>' +
                 '      <button ng-click="deleteRecord(formModel.data)" class="btn btn-outline-danger btn-sm">Delete</button>' +
                 '   </div>'
                 '</div>'
        }
      }
    }
  });
  