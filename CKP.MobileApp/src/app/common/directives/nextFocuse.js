
app.directive('nextFocus', function() {
    return {
        restrict: 'A',
        link: function ($scope, elem, attrs) {

            elem.bind('keydown', function (e) {
              
                var code = e.keyCode || e.which;
                if (code === 13) {
                    e.preventDefault();
                
                  //   elem.next()[0].focus();
                }
            });

           }
    }
});