/**
 * Created by LEO on 16/10/9.
 */
app.directive('shortcut', ['$parse', function ($parse) {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        link:    function postLink(scope, iElement, iAttrs){
            jQuery(document).on('keypress', function(e){
                scope.$apply(scope.keyPressed(e));
            });
        }
    };
}]);