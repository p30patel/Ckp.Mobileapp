
app.controller('helpController', ['$scope', '$http', '$sce', 'translateService',
    function ($scope, $http, $sce, translateService) {
       if (typeof (window.navigator.simulator) === 'undefined'){
            window.plugins.EqatecAnalytics.Monitor.TrackFeature("view.help");
        }
        $scope.form = {};

        $scope.form.title = {};
        $scope.form.title.resoruceName = "Help";
        $scope.form.title.resoruceValue = translateService.getResourceValue($scope.form.title.resoruceName);

        $scope.afterShow = function (e) {

            var view = kendo.mobile.application.view();
            if (view !== null) {
                var navbar = kendo.mobile.application.view()
                             .header
                             .find(".km-navbar")
                             .data("kendo-mobile-nav-bar");
                navbar.title($scope.form.title.resoruceValue);

            }
        }
        $scope.content = 'Comming Soon';
        $scope.renderHtml = function (content) {
            return $sce.trustAsHtml(content);
        };

    }
]);
