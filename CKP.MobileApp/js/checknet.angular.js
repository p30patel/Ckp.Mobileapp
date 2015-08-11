/* var myApp = angular.module('checkApp', ['kendo.directives']);
          $(window).load(function () {
              var app = new kendo.mobile.Application($(document.body), {
                  skin: "nova"
              });
          });

*/


/*angular.module('checkApp', ['kendo.directives'])*/

/*var myApp = angular.module('checkApp', ['kendo.directives']);
         $(window).load(function () {
             var app = new kendo.mobile.Application($(document.body), {
                 skin: "nova",
             });
         });*/

/*var app = new kendo.mobile.Application($(document.body), { skin: 'nova' });*/

angular.module('checkApp', ['kendo.directives'])
    .controller("MyCtrl", function ($scope) {
        $scope.panelBarOptions = {
            contentUrls: [null, null, "../content/web/loremIpsum.html"]
        };
        $scope.hello = "Hello from controller";
    })

function focusTextbox() {
    $("#input").focus();
}

