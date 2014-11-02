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