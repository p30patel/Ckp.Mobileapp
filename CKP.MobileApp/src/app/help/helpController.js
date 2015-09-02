
app.controller('helpController', ['$scope', '$http', '$sce', 'translateService',
    function ($scope, $http, $sce, translateService) {
        $scope.form = {};

        $scope.form.title = {};
        $scope.form.title.resoruceName = "Help";
        $scope.form.title.resoruceValue = translateService.getResourceValue($scope.form.title.resoruceName);


        var content = "Comming Soon";
        $scope.renderHtml = function () {
            return $sce.trustAsHtml(content);
        };

    }
]);
