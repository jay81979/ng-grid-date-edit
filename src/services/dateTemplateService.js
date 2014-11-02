ngGridDatePickerServices.factory('$dateTemplates', ['$templateCache', function($templateCache) {
    var dateTemplates = {};
    
    dateTemplates.row = "rowTemplate.html";
    dateTemplates.editCell = "editableDateCellTemplate.html";

    return dateTemplates;
}]);