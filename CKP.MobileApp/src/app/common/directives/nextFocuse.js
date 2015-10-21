
app.directive('nextFocuse', function() {
    return {
        restrict: 'A',
        link: function ($scope, elem, attrs) {

            elem.bind('keydown', function (e) {
                console.log(e.keyCode);
                var code = e.keyCode || e.which;
                if (code === 13) {
                    e.preventDefault();
                    elem.next().focus();
                }
            });
        }
    }
});