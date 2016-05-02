
app.controller('orderLineDetailController', [
                   '$scope', 'authService', 'orderDataService', '$sce', 'translateService', 'feedbackDataService', 'notificationDataService', '$timeout', 'localStorageService', 'ngAuthSettings',
function ($scope, authService, orderDataService, $sce, translateService, feedbackDataService, notificationDataService, $timeout, localStorageService, ngAuthSettings) {

    $scope.form = {};
    var url = ngAuthSettings.authServiceBaseUri === 'https://qachecknet.checkpt.com/' ? ngAuthSettings.authServiceBaseUri + 'Redesign' : ngAuthSettings.authServiceBaseUri + 'RCNV2';
    $scope.form.title = {};
    $scope.form.title.resourceName = "Order Line Detail";
    $scope.form.title.resourceValue = translateService.getResourceValue($scope.form.title.resourceName);
    $scope.afterShow = function (e) {

        var view = kendo.mobile.application.view();
        if (view !== null) {
            var navbar = kendo.mobile.application.view()
                         .header
                         .find(".km-navbar")
                         .data("kendo-mobile-nav-bar");
            navbar.title($scope.form.title.resourceValue);

            if (typeof (window.navigator.simulator) === 'undefined') {
                window.plugins.EqatecAnalytics.Monitor.TrackFeature("view.orderLineDetail");
            }
            $scope.notifyMe = false;
        }
    }

    $scope.form.noData = {};
    $scope.form.noData.resourceName = "No Data are found";
    $scope.form.noData.resourceValue = translateService.getResourceValue($scope.form.noData.resourceName);

    $scope.form.noResults = {};
    $scope.form.noResults.resourceName = "No Results are found";
    $scope.form.noResults.resourceValue = translateService.getResourceValue($scope.form.noResults.resourceName);


    $scope.form.item = {};
    $scope.form.item.resourceName = "Item";
    $scope.form.item.resourceValue = translateService.getResourceValue($scope.form.item.resourceName);


    $scope.form.quantity = {};
    $scope.form.quantity.resourceName = "Quantity";
    $scope.form.quantity.resourceValue = translateService.getResourceValue($scope.form.quantity.resourceName);


    $scope.form.adjustedQuantity = {};
    $scope.form.adjustedQuantity.resourceName = "Adjusted Quantity";
    $scope.form.adjustedQuantity.resourceValue = translateService.getResourceValue($scope.form.adjustedQuantity.resourceName);

    $scope.form.originalQuantity = {};
    $scope.form.originalQuantity.resourceName = "Original Quantity";
    $scope.form.originalQuantity.resourceValue = translateService.getResourceValue($scope.form.originalQuantity.resourceName);

    $scope.form.lineNumber = {};
    $scope.form.lineNumber.resourceName = "Line Number";
    $scope.form.lineNumber.resourceValue = translateService.getResourceValue($scope.form.lineNumber.resourceName);


    $scope.form.price = {};
    $scope.form.price.resourceName = "Price";
    $scope.form.price.resourceValue = translateService.getResourceValue($scope.form.price.resourceName);

    $scope.form.orderDetail = {};
    $scope.form.orderDetail.resourceName = "Order Detail";
    $scope.form.orderDetail.resourceValue = translateService.getResourceValue($scope.form.orderDetail.resourceName);


    $scope.form.itemCode = {};
    $scope.form.itemCode.resourceName = "Item Code";
    $scope.form.itemCode.resourceValue = translateService.getResourceValue($scope.form.itemCode.resourceName);

    $scope.form.totalQuantity = {};
    $scope.form.totalQuantity.resourceName = "Total Quantity";
    $scope.form.totalQuantity.resourceValue = translateService.getResourceValue($scope.form.totalQuantity.resourceName);

    $scope.orderLineDetail = {};

    $scope.retailerId = 0;
    $scope.customColumnTitle = "";
    var orderLineId = 0;
    $scope.quantity = 0;
    var init = function () {
        if (!authService.authentication.isAuth) {
            authService.logout();
            kendo.mobile.application.navigate("src/app/login/login.html");
        }
    };
    init();

    $scope.intShow = function (e) {
        orderLineId = e.view.params.orderLineId;
        $scope.retailerId = e.view.params.retailerId;
        $scope.quantity = e.view.params.quantity;
        getOrderLineDetail(orderLineId);

    }
    var setCustomColumnTitle = function (field) {
        var title = field;
        var hasFirstMatchFound = false;
        angular.forEach($scope.orderLineDetail.data.Columns, function (value, key) {

            if (!hasFirstMatchFound && value.Field == field) {
                hasFirstMatchFound = true;
                title = value.Title;
            }
        });
        return title;
    }


    var getOrderLineDetail = function (orderLineId) {
        kendo.mobile.application.showLoading();

        if (typeof (window.navigator.simulator) === 'undefined') {
            window.plugins.EqatecAnalytics.Monitor.TrackFeature("event.orderLineDetail");
        }
        orderDataService.getOrderLineDetail(orderLineId, $scope.retailerId).then(function (result) {

           // result.data.CustomSkuColumn = "_datfield1";
            $scope.orderLineDetail = result;
            $scope.customColumnTitle = setCustomColumnTitle(result.data.CustomSkuColumn);


        }).catch(function (error) {
            $scope.orderLineDetail = {};

        }).finally(function () {
            kendo.mobile.application.hideLoading();
        });

    };


    $scope.renderHtml = function (content) {
        return $sce.trustAsHtml(content);

    };
}
]);