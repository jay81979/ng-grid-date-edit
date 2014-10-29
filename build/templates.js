angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/templates/cellDateTemplate.html',
    "<div class=\"ngCellDate\" ng-class=\"col.colIndex()\"><span ng-cell-date>{{COL_FIELD CUSTOM_FILTERS}}</span></div>"
  );


  $templateCache.put('src/templates/cellEditTemplate.html',
    "<div ng-cell-has-focus ng-dblclick=\"CELL_EDITABLE_CONDITION && editCell()\">\n" +
    "\t<div ng-edit-cell-if=\"!(isFocused && CELL_EDITABLE_CONDITION)\">\t\n" +
    "\t\tDISPLAY_CELL_TEMPLATE\n" +
    "\t</div>\n" +
    "\t<div ng-edit-cell-if=\"isFocused && CELL_EDITABLE_CONDITION\">\n" +
    "\t\tEDITABLE_CELL_TEMPLATE\n" +
    "\t</div>\n" +
    "</div>\n"
  );


  $templateCache.put('src/templates/editableCellTemplate.html',
    "<input ng-class=\"'colt' + col.index\" ng-input=\"COL_FIELD\" ng-model=\"COL_FIELD\" />"
  );

}]);
