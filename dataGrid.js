app.directive('datagrid', function($compile) {
    return {
      scope: {
        gridTitle: '@?',
        gridData: '=?',
        gridColumns: '=?',
        showBorder: '=?',
        gridRowModel: "=?",
        selectable: '=?',
        editorColumnWidth: '=?',
        gridSelectedRows: '=?',
        pageSize: '=?',
        serverSide: '=?'
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
        $scope.selectedRows = [];
        $scope.currentPage = 0;
        $scope.totalRecords = 18;
        if(!$scope.pageSize)$scope.pageSize = 5;
        $scope.totalPages = Math.floor($scope.totalRecords / $scope.pageSize) + 1;
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
        $scope.getCellValue = function(column, data){
          console.log(column)
          console.log(data);
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
        $scope.loadGrid = function(page, offSet){

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
        $scope.saveRow = function(rowModal, index, isNewRow, isRowEditFlag){
          if(isNewRow){
            $scope.gridData.push(rowModal);
          }else{
            $scope.gridData[index] = rowModal;
            console.log(rowModal);
          }
          $scope.isNewRow = false;
          // isRowEditFlag != isRowEditFlag;
          // $scope.toast('record saved ', false);
        }

        $scope.bindGridRowModel = function(rowModel){
          $scope.gridRowModel.data = rowModel;
          $scope.gridRowModel.columns = $scope.gridColumns;
        }

        if(!$scope.selectable){
          $scope.selectable = false;
        }
        if(!$scope.editorColumnWidth){
          $scope.editorColumnWidth = 8;
        }

        $scope.onGridRowSelectionChanged = function(row){
          if(row.selected){
            $scope.selectedRows.push(row);
          }else{
            $scope.selectedRows.splice($scope.selectedRows.indexOf(row), 1);
          }
          $scope.gridSelectedRows = $scope.selectedRows;
        };

        $scope.onGridPageSelectionChanged = function(page){
          
        };

        $scope.getGridColumnValue = function(column){
          if(column.dataType === 'fixedCombo'){
            // return 
          }
        }

        $scope.firstPage = function(){
          $scope.currentPage = 0;
        };

        $scope.previousPage = function(){
          if($scope.currentPage === 0){
            return;
          }else{
            $scope.currentPage = $scope.currentPage - 1;
          }
          console.log($scope.currentPage);
        };
          
        $scope.setCurrentPage = function(currentPage){
          $scope.currentPage = currentPage;
        };

        $scope.nextPage = function(){
          if($scope.serverSide){
            
          }else{
            if((($scope.currentPage * $scope.pageSize) + $scope.pageSize) < $scope.totalRecords){
              $scope.currentPage = $scope.currentPage + 1;
            }
          }
          console.log($scope.currentPage);
        };

        $scope.lastPage = function(){
          $scope.currentPage = $scope.totalPages - 1;
        };

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
                 '   <div ng-show="gridTitle" class="card-header" style="background-color: darkturquoise;color: white;font-weight: bold;">{{gridTitle}}</div>' +
                 '   <table ng-class="(showBorder === true) ? \'table table-sm table-hover table-bordered\' : \'table table-sm table-hover\'">' +
                 '      <thead class="thead-light">' +
                 '         <tr>' +
                 '            <th ng-if="selectable">' +
                 '               <div class="checkbox">' +
                 '                  <label><input type="checkbox" value=""></label>' +
                 '               </div>' +
                 '            </th>' +
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
                 '               <select ng-if="column.dataType === \'fixedCombo\'" class="form-control form-control-sm" name="column.key" ng-model="newRowData[column.key]" ng-options="opt.code as opt.desc for opt in column.comboData"></select>' +
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
                 '               <select ng-if="column.dataType === \'fixedCombo\'" class="form-control form-control-sm" name="column.key" ng-model="filter[column.key]" ng-options="opt.code as opt.desc for opt in column.comboData"></select>' +
                 '            </th>' +
                 '            <th style="width:{{editorColumnWidth}}%" scope="col" ng-repeat-end>' +
                 '               &nbsp;&nbsp;&nbsp;&nbsp;'+
                 '               <span class="mdi mdi-window-close" ng-click="toggleSearch()"></span>' +
                 '            </th>' +
                 '         </tr>' +
                 '      </thead>' +
                 '   <tbody>' +
                 '      <tr ng-repeat="data in gridData | filter : filter | orderBy : sort.column : sort.reverse | limitTo : pageSize : currentPage * pageSize" ng-init="isRowEdit = false" ng-click="bindGridRowModel(data)">' +
                 '         <td ng-if="selectable">' +
                 '            <div class="checkbox">' +
                 '               <label><input type="checkbox" ng-model="data.selected" ng-change="onGridRowSelectionChanged(data)"></label>' +
                 '            </div>' +
                 '         </td>' +
                 '         <td ng-repeat="column in gridColumns">' +
                 '            <span ng-show="isRowEdit === false">{{data[column.key]}}</span>' +
                 '            <input ng-if="column.dataType === \'string\'" ng-show="isRowEdit === true" class="form-control form-control-sm" type="text" name="column.key" ng-model="data[column.key]">' +
                 '            <input ng-if="column.dataType === \'number\'" ng-show="isRowEdit === true" class="form-control form-control-sm" type="number" name="column.key" ng-model="data[column.key]">' +
                 '            <select ng-if="column.dataType === \'fixedCombo\'" ng-show="isRowEdit === true" class="form-control form-control-sm" name="column.key" ng-model="data[column.key]" ng-options="opt.code as opt.desc for opt in column.comboData"></select>' +
                 '         </td>' +
                 '         <td style="width:{{editorColumnWidth}}%" ng-repeat-end>' +
                 '            <span ng-show="isRowEdit === false" class="mdi mdi-table-edit" ng-click="isRowEdit = !isRowEdit"></span>' +
                 '             &nbsp;&nbsp;' +
                 '            <span ng-show="isRowEdit === false" class="mdi mdi-delete" ng-click="deleteRow($index)"></span>' +
                 '            <span ng-show="isRowEdit === true" class="mdi mdi-content-save" ng-click="saveRow(data, false, $index, isRowEdit)"></span>' +
                 '             &nbsp;&nbsp;' +
                 '            <span ng-show="isRowEdit === true" class="mdi mdi-window-close" ng-click="isRowEdit = !isRowEdit"></span>' +
                 '          </td>' +
                 '      </tr>' +
                 '   </tbody>' +
                 '   <thead class="thead-light">' +
                 '      <tr>' + 
                 '         <th colspan="{{gridColumns.length + 1}}">' +
                 '            <ul style="list-style:none;display: flex;margin: unset;float: right;">' +
                 '              <li><span class="mdi mdi-chevron-double-left" ng-click="firstPage()"></span>&nbsp;&nbsp;<li>' +
                 '              <li><span class="mdi mdi-chevron-left" ng-click="previousPage()"></span>&nbsp;&nbsp;<li>' +
                 '              <li ng-repeat="page in [].constructor(totalPages) track by $index">' +
                 '                <span ng-class="currentPage === $index ? \'mdi mdi-numeric-{{$index + 1}}-box\': \'mdi mdi-numeric-{{$index + 1}}-box-outline\'" ng-click="setCurrentPage($index)"></span>&nbsp;&nbsp;' +
                 '              <li>' +
                 '              <li><span class="mdi mdi-chevron-right" ng-click="nextPage()"></span>&nbsp;&nbsp;<li>' +
                 '              <li><span class="mdi mdi-chevron-double-right" ng-click="lastPage()"></span>&nbsp;&nbsp;<li>' +
                 '            </ul>' +
                 '         </th>' +
                 '      </tr>' +
                 '   </thead>' +
                 '   </table>' +
                //  '   <div class="card-footer">' +
                //  '      <nav aria-label="Page navigation example">' +
                //  '         <ul class="pagination">' +
                //  '            <li class="page-item">' +
                //  '               <a class="page-link" href="" ng-click="previousPage()" aria-label="Previous">' +
                //  '                  <span aria-hidden="true">&laquo;</span>' +
                //  '               </a>' +
                //  '            </li>' +
                //  '            <li class="page-item"><a class="page-link" href="">1</a></li>' +
                //  '            <li class="page-item"><a class="page-link" href="">2</a></li>' +
                //  '            <li class="page-item"><a class="page-link" href="">3</a></li>' +
                //  '            <li class="page-item">' +
                //  '               <a class="page-link" href="" ng-click="nextPage()" aria-label="Next">' +
                //  '                  <span aria-hidden="true">&raquo;</span>' +
                //  '               </a>' +
                //  '            </li>' +
                //  '         </ul>' +
                //  '      </nav>' +
                //  '   </div>' +
                 '</div>'
        }
      }
    }
  });
  