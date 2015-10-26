
app.directive('nextFocuse', function() {
    return {
        restrict: 'A',
        link: function ($scope, elem, attrs) {

            elem.bind('keydown', function (e) {
              
                var code = e.keyCode || e.which;
                if (code === 13) {
                    e.preventDefault();
                    console.log(elem.next());
                     elem.next()[0].focus();
                }
            });
        }
    }
});