app.directive('datagrid', function($compile) {
    return {
      scope: {
        gridTitle: '@',
        gridData: '=?',
        gridColumns: '=?',
        showBorder: '=?',
        gridRowModel: "=?",
        selectionGrid: '=?',
        editorColumnWidth: '=?'
      },
      restrict: 'E',
      replace: true,
      link: function (scope, elem, attrs) {
        elem.html(scope.getTemplate())
        $compile(elem.contents())(scope)
      },
      controller: function ($scope) {
        self = $scope;
        $scope.sort = {}
        $scope.filter = {}
        $scope.sort.isSortEnabled = false
        $scope.sort.column = []
        $scope.isNewRow = false;
        $scope.isSearchEnabled = false;
        $scope.selectedRow = {};
        $scope.gridRowModel = {};
        $scope.setSortColumn = function (sort) {
          if(!$scope.sort.isSortEnabled) return;
          $scope.sort.column = sort
          if($scope.sort.reverse){
            $scope.sort.reverse = false
          }else{
            $scope.sort.reverse = !$scope.sort.reverse
          }
          console.log($scope.sort)
        };
        $scope.toggleSort = function(){
          if($scope.sort.isSortEnabled) 
          delete $scope.sort.column;
          $scope.sort.isSortEnabled = !$scope.sort.isSortEnabled;
        };
        $scope.toggleSearch = function(){
          if($scope.isSearchEnabled)
          $scope.filter = {}; 
          $scope.isSearchEnabled = !$scope.isSearchEnabled;
          console.log($scope.isSearchEnabled)
        };
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

        $scope.bindGridRowModel = function(rowModel){

          $scope.gridRowModel.data = rowModel;
          // $scope.selectedRow.data = rowModel;
          // $scope.selectedRow.columns = $scope.gridColumns;
          $scope.gridRowModel.columns = $scope.gridColumns;
        }

        if(!$scope.selectionGrid){
          $scope.selectionGrid = false;
        }
        if(!$scope.editorColumnWidth){
          $scope.editorColumnWidth = 8;
        }

        $scope.toast = function(message, showHeader){
          return '<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">' +
          '<div ng-show="showHeader" class="toast-header">' +
            '<img src="..." class="rounded mr-2" alt="...">' +
            '<strong class="mr-auto">Bootstrap</strong>' +
            '<small>11 mins ago</small>' +
            '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
              '<span aria-hidden="true">&times;</span>' +
            '</button>' +
          '</div>' +
          '<div class="toast-body">' +
            '{{message}}' +
          '</div>' +
        '</div>';
        }
  
        $scope.getTemplate = function () {
          return '<div class="card table-responsive-md">' +
                 '   <div class="card-header" style="background-color: darkturquoise;color: white;font-weight: bold;">{{gridTitle}}</div>' +
                 '   <table ng-class="(showBorder === true) ? \'table table-sm table-hover table-bordered\' : \'table table-sm table-hover\'">' +
                 '      <thead class="thead-light">' +
                 '         <tr>' +
                 '            <th scope="col" ng-repeat="column in gridColumns" ng-click="setSortColumn(column.key)">{{column.caption}}' +
                 '               <spna ng-show="sort.isSortEnabled">' +
                 '                  <span ng-show="sort.reverse === false && sort.column === column.key" class="mdi mdi-arrow-up" style="float: right;"></span>' +
                 '                  <span ng-show="sort.reverse === true && sort.column === column.key" class="mdi mdi-arrow-down" style="float: right;"></span>' +
                 '               </span>' +
                 '            </th>' +
                 '            <th style="width:8%" scope="col" ng-repeat-end>' +
                 '               <span class="mdi mdi-plus-box" ng-click="addNewRow()"></span>' +
                 '               &nbsp;&nbsp;'+
                 '               <span ng-class="(isSearchEnabled === true) ? \'mdi mdi-dark mdi-magnify\' : \'mdi mdi-dark mdi-inactive mdi-magnify\'" ng-click="toggleSearch()"></span>' +
                 '               &nbsp;&nbsp;' +
                 '               <span ng-class="(sort.isSortEnabled === true) ? \'mdi mdi-dark mdi-sort\' : \'mdi mdi-dark mdi-inactive mdi-sort\'" ng-click="toggleSort()"></span>' +
                 '            </th>' +
                 '         </tr>' +
                 '         <tr ng-show="isNewRow === true">' +
                 '            <th scope="col" ng-repeat="column in gridColumns">'  +
                 '               <input ng-if="column.dataType === \'string\'" class="form-control form-control-sm" type="text" name="column.key" ng-model="newRowData[column.key]">' +
                 '               <input ng-if="column.dataType === \'number\'" class="form-control form-control-sm" type="number" name="column.key" ng-model="newRowData[column.key]">' +
                 '               <select ng-if="column.dataType === \'fixedCombo\'" class="form-control form-control-sm" name="column.key" ng-model="newRowData[column.key]" ng-options="opt as opt.desc for opt in column.comboData"></select>' +
                 '            </th>' +
                 '            <th style="width:8%" scope="col" ng-repeat-end>' +
                 '               <span class="mdi mdi-content-save" ng-click="saveRow(newRowData, true, 0)"></span>' +
                 '               &nbsp;&nbsp;'+
                 '               <span class="mdi mdi-window-close" ng-click="isNewRow = !isNewRow"></span>' +
                 '            </th>' +
                 '         </tr>' +
                 '         <tr ng-show="isSearchEnabled === true">' +
                 '            <th scope="col" ng-repeat="column in gridColumns">'  +
                 '               <input ng-if="column.dataType === \'string\'" class="form-control form-control-sm" type="text" name="column.key" ng-model="filter[column.key]">' +
                 '               <input ng-if="column.dataType === \'number\'" class="form-control form-control-sm" type="number" name="column.key" ng-model="filter[column.key]">' +
                 '               <select ng-if="column.dataType === \'fixedCombo\'" class="form-control form-control-sm" name="column.key" ng-model="filter[column.key]" ng-options="opt as opt.desc for opt in column.comboData"></select>' +
                 '            </th>' +
                 '            <th style="width:{{editorColumnWidth}}%" scope="col" ng-repeat-end>' +
                 '               &nbsp;&nbsp;&nbsp;&nbsp;'+
                 '               <span class="mdi mdi-window-close" ng-click="toggleSearch()"></span>' +
                 '            </th>' +
                 '         </tr>' +
                 '      </thead>' +
                 '   <tbody>' +
                 '      <tr ng-repeat="data in gridData | filter:filter | orderBy : sort.column : sort.reverse" ng-init="isRowEdit = false" ng-click="bindGridRowModel(data)">' +
                 '         <td ng-repeat="column in gridColumns">' +
                 '            <span ng-show="isRowEdit === false">{{data[column.key]}}</span>' +
                 '            <input ng-if="column.dataType === \'string\'" ng-show="isRowEdit === true" class="form-control form-control-sm" type="text" name="column.key" ng-model="data[column.key]">' +
                 '            <input ng-if="column.dataType === \'number\'" ng-show="isRowEdit === true" class="form-control form-control-sm" type="number" name="column.key" ng-model="data[column.key]">' +
                 '            <select ng-if="column.dataType === \'fixedCombo\'" ng-show="isRowEdit === true" class="form-control form-control-sm" name="column.key" ng-model="data[column.key]" ng-options="opt as opt.desc for opt in column.comboData"></select>' +
                 '         </td>' +
                 '         <td style="width:{{editorColumnWidth}}%" ng-repeat-end>' +
                 '            <span ng-show="isRowEdit === false" class="mdi mdi-table-edit" ng-click="isRowEdit = !isRowEdit"></span>' +
                 '             &nbsp;&nbsp;' +
                 '            <span ng-show="isRowEdit === false" class="mdi mdi-delete" ng-click="deleteRow($index)"></span>' +
                 '            <span ng-show="isRowEdit === true" class="mdi mdi-content-save" ng-click="saveRow(data, false, $index)"></span>' +
                 '             &nbsp;&nbsp;' +
                 '            <span ng-show="isRowEdit === true" class="mdi mdi-window-close" ng-click="isRowEdit = !isRowEdit"></span>' +
                 '          </td>' +
                 '      </tr>' +
                 '   </tbody>' +
                 '   </table>' +
                 '   <div class="card-footer">' +
                 '<nav aria-label="Page navigation example">' +
                 '<ul class="pagination">' +
                   '<li class="page-item">' +
                     '<a class="page-link" href="#" aria-label="Previous">' +
                       '<span aria-hidden="true">&laquo;</span>' +
                     ' </a>' +
                   ' </li>' +
                   '<li class="page-item"><a class="page-link" href="#">1</a></li>' +
                   '<li class="page-item"><a class="page-link" href="#">2</a></li>' +
                   '<li class="page-item"><a class="page-link" href="#">3</a></li>' +
                   '<li class="page-item">' +
                     '<a class="page-link" href="#" aria-label="Next">' +
                       '<span aria-hidden="true">&raquo;</span>' +
                     '</a>' +
                   '</li>' +
                 '</ul>' +
               '</nav>' +
                 '   </div>' +
                 '</div>'
        }
      }
    }
  });
  