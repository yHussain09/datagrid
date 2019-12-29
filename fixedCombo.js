app.directive('fixedcombo', function($compile) {
    return {
      scope: {
          id: '@?',
          name: '@?',
          size: '@?',
          multiple: '=?',
          comboData: '=?',
          isDefaultSelected: '=?',
          selectedValue: '=?',
          changeCallback: '&?',
          filterValue: '=?',
          filterKey: '@?'
        
      },
      restrict: 'E',
      replace: true,
      link: function (scope, elem, attrs) {
        elem.html(scope.getTemplate())
        $compile(elem.contents())(scope)
      },
      controller: function ($scope) {
        self = $scope;
        $scope.filterModel = {};
        if($scope.changeCallback){$scope.changeCallback();}

        $scope.getTemplate = function () {
            if($scope.filterKey){
                filterModel[filterKey] = filterValue || '';
                return '<select id="{{id}}" name="{{name}}" size="{{size}}" class="form-control form-control-sm" ng-model="selectedValue" ng-options="option.code as option.desc for option in comboData | filter : filterModel" ng-change="changeCallback(option.code)"></select>';
            }
            else{
                return '<select id="{{id}}" name="{{name}}" size="{{size}}" class="form-control form-control-sm" ng-model="selectedValue" ng-options="option.code as option.desc for option in comboData" ng-change="changeCallback(option.code)"></select>';
            }
            
            
          
        }
      }
    }
  });
  