"use strict";
var ngGridDatePickerDirectives = angular.module('ngGridDatePicker.directives', []);
var ngGridDatePickerServices = angular.module('ngGridDatePicker.services', []);
angular.module('ngGridDatePicker', ['ngGridDatePicker.directives', 'ngGridDatePicker.services']);

/*
ngGridDateDirectives.directive('ngDateInput', [function() {
    return {
        require: 'ngModel',
         controller: function($scope, $element) {
            $scope.onChange = function(COL_FIELD) {
                $scope.$emit('ngGridEventEndCellEdit');
            };
        },
        link: function (scope, elm, attrs, ngModel) {
            // Store the initial cell value so we can reset to it if need be
            var oldCellValue;
            var dereg = scope.$watch('ngModel', function() {
                oldCellValue = ngModel.$modelValue;
                dereg(); // only run this watch once, we don't want to overwrite our stored value when the input changes
            });

            function keydown (evt) {
                switch (evt.keyCode) {
                    case 37: // Left arrow
                    case 38: // Up arrow
                    case 39: // Right arrow
                    case 40: // Down arrow
                        evt.stopPropagation();
                        break;
                    case 27: // Esc (reset to old value)
                        if (!scope.$$phase) {
                            scope.$apply(function() {
                                ngModel.$setViewValue(oldCellValue);
                                scope.$emit('ngGridEventEndCellEdit');
                            });
                        }
                        break;
                    case 13: // Enter (Leave Field)
                        if(scope.enableCellEditOnFocus && scope.totalFilteredItemsLength() - 1 > scope.row.rowIndex && scope.row.rowIndex > 0  || scope.col.enableCellEdit) {
                            scope.$emit('ngGridEventEndCellEdit');
                        }
                        break;
                }

                return true;
            }
            
            elm.bind('keydown', keydown);

            function click (evt) {
                evt.stopPropagation();
            }

            elm.bind('click', click); 

            function mousedown (evt) {
                evt.stopPropagation();
            }

            elm.bind('mousedown', mousedown);

            elm.on('$destroy', function() {
                elm.off('keydown', keydown);
                elm.off('click', click);
                elm.off('mousedown', mousedown);
            });

            scope.$on('$destroy', scope.$on('ngGridEventStartCellEdit', function () {
                elm.focus();
                elm.select();
            }));

            angular.element(elm).bind('blur', function () {
                //scope.$emit('ngGridEventEndCellEdit');
            });
        }
    };
}]);
*/
ngGridDatePickerDirectives.directive('ngGridDatePicker', [function() {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs, ngModel) {
            var value = scope.$parent.$parent.row.entity[scope.$parent.col.field];
            if(value instanceof Date)
            {
                scope.dt = value;
            }
            else {
                alert("not a date");
            }
            scope.$watch('dt', function(newValue, oldValue) {
                scope.$parent.$parent.row.entity[scope.$parent.col.field] = newValue;
                scope.$emit('ngGridEventEndCellEdit');
            });
        }
    };
}]);
ngGridDatePickerServices.factory('$dateTemplates', ['$templateCache', function($templateCache) {
    var dateTemplates = {};
    
    dateTemplates.row = "rowTemplate.html";
    dateTemplates.editCell = "editableDateCellTemplate.html";

    return dateTemplates;
}]);
angular.module('ngGridDatePicker').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('editableDateCellTemplate.html',
    "<datepicker ng-model=\"dt\" ng-grid-date-picker min-date=\"minDate\" show-weeks=\"false\" class=\"well well-sm\" style=\"position:absolute; z-index: 10;\"></datepicker>"
  );


  $templateCache.put('rowTemplate.html',
    "<div ng-style=\"{ 'cursor': row.cursor }\" ng-repeat=\"col in renderedColumns\" ng-class=\"col.colIndex()\" class=\"ngCell {{col.cellClass}}\" style=\"overflow: visible\">\r" +
    "\n" +
    "    <div class=\"ngVerticalBar\" ng-style=\"{height: rowHeight}\" ng-class=\"{ ngVerticalBarVisible: !$last }\">&nbsp;</div>\r" +
    "\n" +
    "    <div ng-cell></div>\r" +
    "\n" +
    "</div>"
  );

}]);
