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
          selectedModel: '=?',
          changeCallback: '&?',
          parentModel: '=?',
          comboType: '@?',
          placeholder: '@?'
      },
      restrict: 'E',
      replace: true,
      link: function (scope, elem, attrs) {
        elem.html(scope.getTemplate());
        $compile(elem.contents())(scope);
      },
      controller: function ($scope) {
        self = $scope;
        
        $scope.filterModel = {};
        
        $scope.changeCallback = function(item){
          $scope.selectedModel = $scope.comboData[item];
        };
        
        $scope.getTemplate = function () {
          let template = '';
          switch($scope.comboType){
            case 'C':
              template = 
              '<select id="{{id}}"' + 
              '        name="{{name}}"' + 
              '        size="{{size}}"' + 
              '        class="form-control form-control-sm"' + 
              '        ng-model="selectedValue"' + 
              '        ng-options="option.code as option.desc for option in comboData | filter : {filterKey: parentModel} : true"' + 
              '        ng-change="changeCallback(selectedValue)">' +
              // '        <option value"">{{placeholder}}</option>' +
              '</select>';
              break;
            case 'P':
              template = 
                '<select id="{{id}}"' + 
                '        name="{{name}}"' + 
                '        size="{{size}}"' + 
                '        class="form-control form-control-sm"' + 
                '        ng-model="selectedValue"' + 
                '        ng-options="option.code as option.desc for option in comboData"' + 
                '        ng-change="changeCallback(selectedValue)">' +
                // '        <option value"">{{placeholder}}</option>' +
                '</select>';
                break;
          }
          // console.log(template);
          return template;
        };
      }
    };
  });
  