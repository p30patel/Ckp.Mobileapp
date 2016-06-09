
app.controller('notificationController', ['$scope', '$http', '$sce', 'translateService', 'authService', 'notificationDataService', '$timeout', 'localStorageService',
function ($scope, $http, $sce, translateService, authService, notificationDataService, $timeout, localStorageService) {
   
    $scope.form = {};

    $scope.form.title = {};
    $scope.form.title.resoruceName = "Notification Settings";
    $scope.form.title.resoruceValue = translateService.getResourceValue($scope.form.title.resoruceName);

    $scope.beforeShow = function () {
        kendo.mobile.application.showLoading();
        if (!authService.authentication.isAuth) {
            authService.logout();
            kendo.mobile.application.navigate("src/app/login/login.html");
        }
        kendo.mobile.application.hideLoading();

    };
    $scope.message = "";
    $scope.notifications = [];
    $scope.cleaBadgeCountStatus = false;
    $scope.afterShow = function (e) {

        var view = kendo.mobile.application.view();
        if (view !== null) {
            var navbar = kendo.mobile.application.view()
                         .header
                         .find(".km-navbar")
                         .data("kendo-mobile-nav-bar");
            navbar.title($scope.form.title.resoruceValue);

            if (typeof (window.navigator.simulator) === 'undefined') {
                window.plugins.EqatecAnalytics.Monitor.TrackFeature("view.notifcation");
            }

        }
    }

    var setResources = function () {
        $scope.form.noData = {};
        $scope.form.noData.resoruceName = "No Data are found";
        $scope.form.noData.resoruceValue = translateService.getResourceValue($scope.form.noData.resoruceName);

        $scope.form.orderReceived = {};
        $scope.form.orderReceived.resoruceName = "Order Received";
        $scope.form.orderReceived.resoruceValue = translateService.getResourceValue($scope.form.orderReceived.resoruceName);

        $scope.form.orderReceivedDesc = {};
        $scope.form.orderReceivedDesc.resoruceName = "Order Received Description";
        $scope.form.orderReceivedDesc.resoruceValue = translateService.getResourceValue($scope.form.orderReceivedDesc.resoruceName);



        $scope.form.orderApproval = {};
        $scope.form.orderApproval.resoruceName = "Order Approval";
        $scope.form.orderApproval.resoruceValue = translateService.getResourceValue($scope.form.orderApproval.resoruceName);

        $scope.form.orderApprovalDesc = {};
        $scope.form.orderApprovalDesc.resoruceName = "Order Approval Description";
        $scope.form.orderApprovalDesc.resoruceValue = translateService.getResourceValue($scope.form.orderApprovalDesc.resoruceName);

        $scope.form.orderApprovedStatus = {};
        $scope.form.orderApprovedStatus.resoruceName = "Approved/Declined Order";
        $scope.form.orderApprovedStatus.resoruceValue = translateService.getResourceValue($scope.form.orderApproval.resoruceName);

        $scope.form.orderApprovedStatusDesc = {};
        $scope.form.orderApprovedStatusDesc.resoruceName = "Approved/Declined Order Description";
        $scope.form.orderApprovedStatusDesc.resoruceValue = translateService.getResourceValue($scope.form.orderApprovedStatusDesc.resoruceName);


        $scope.form.shipment = {};
        $scope.form.shipment.resoruceName = "Shipment";
        $scope.form.shipment.resoruceValue = translateService.getResourceValue($scope.form.shipment.resoruceName);

        $scope.form.shipmentDesc = {};
        $scope.form.shipmentDesc.resoruceName = "Shipment Description";
        $scope.form.shipmentDesc.resoruceValue = translateService.getResourceValue($scope.form.shipmentDesc.resoruceName);

        $scope.form.delivery = {};
        $scope.form.delivery.resoruceName = "Delivery";
        $scope.form.delivery.resoruceValue = translateService.getResourceValue($scope.form.delivery.resoruceName);

        $scope.form.deliveryDesc = {};
        $scope.form.deliveryDesc.resoruceName = "Delivery Description";
        $scope.form.deliveryDesc.resoruceValue = translateService.getResourceValue($scope.form.deliveryDesc.resoruceName);


        $scope.form.printshop = {};
        $scope.form.printshop.resoruceName = "Print Shop Hoildays";
        $scope.form.printshop.resoruceValue = translateService.getResourceValue($scope.form.printshop.resoruceName);

        $scope.form.printshopDesc = {};
        $scope.form.printshopDesc.resoruceName = "Print Shop Hoildays Description";
        $scope.form.printshopDesc.resoruceValue = translateService.getResourceValue($scope.form.printshopDesc.resoruceName);

        $scope.form.maintenance = {};
        $scope.form.maintenance.resoruceName = "Maintenance";
        $scope.form.maintenance.resoruceValue = translateService.getResourceValue($scope.form.maintenance.resoruceName);

        $scope.form.maintenanceDesc = {};
        $scope.form.maintenanceDesc.resoruceName = "Maintenance Description";
        $scope.form.maintenanceDesc.resoruceValue = translateService.getResourceValue($scope.form.maintenanceDesc.resoruceName);

        $scope.form.clearBadge = {};
        $scope.form.clearBadge.resoruceName = "Clear Badge Count";
        $scope.form.clearBadge.resoruceValue = translateService.getResourceValue($scope.form.clearBadge.resoruceName);

        $scope.form.clearBadgeDesc = {};
        $scope.form.clearBadgeDesc.resoruceName = "Will clear the badge counts";
        $scope.form.clearBadgeDesc.resoruceValue = translateService.getResourceValue($scope.form.clearBadgeDesc.resoruceName);

    }

    setResources();

    var getNotifications = function () {
          kendo.mobile.application.showLoading();

        if (typeof (window.navigator.simulator) === 'undefined') {
            window.plugins.EqatecAnalytics.Monitor.TrackFeature("method.getNotifcation");
            window.plugins.EqatecAnalytics.Monitor.TrackFeature("notification.getNotification");
            var organizationDetail = localStorageService.get('organizationDetail');
            if (organizationDetail.UserName)
            {
                window.plugins.EqatecAnalytics.Monitor.TrackFeature("notification.User." + organizationDetail.UserName + "-" + organizationDetail.UserId);
            }
        }
        notificationDataService.getUserNotifications().then(function (result) {
             kendo.mobile.application.hideLoading();
            $scope.notifications = result;
        }).catch(function (error) {
             kendo.mobile.application.hideLoading();
             $scope.message = "Error while getting data.";
            $timeout(function () {
                $scope.message = "";
            }, 7000);

        });
    }
    getNotifications();

    var setClearBadgeCount = function () {
        $scope.cleaBadgeCountStatus = notificationDataService.getClearBadgeCountStatus();
    }

    $scope.onChangeClearBadgeCount = function (e) {

        notificationDataService.updateClearBadgeCountStatus(e.checked);
    }

    setClearBadgeCount();
        

    $scope.onChange = function (e) {
        var notificationUpdateData = [];
        var notification = {
            SubscriptionType: e.sender.element.attr('data-SubscriptionType'),
            IsEnabled: e.checked,
            UserId : 0

        };
        var organizationDetail = localStorageService.get('organizationDetail');

        if (typeof (window.navigator.simulator) === 'undefined') {
            var flag = e.checked ? "On" : "Off";
            window.plugins.EqatecAnalytics.Monitor.TrackFeature("method.updateNotifcation");
            window.plugins.EqatecAnalytics.Monitor.TrackFeature("notification.updateNotification");
            window.plugins.EqatecAnalytics.Monitor.TrackFeature("notification." + flag);
            window.plugins.EqatecAnalytics.Monitor.TrackFeature("notification.SubscriptionType" + e.sender.element.attr('data-SubscriptionType'));
            window.plugins.EqatecAnalytics.Monitor.TrackFeature("notification.User." + organizationDetail.UserName + "-" + organizationDetail.UserId);
         
        }
        notificationDataService.updateNotification(notification).then(function (result) {
            if (result !== 'success') {
               
                $scope.message = "Error while saving the data, Please try later<br>";
                $timeout(function () {
                    $scope.message = "";
                }, 3000);
            }
        }).catch(function (error) {
                
            $scope.message = "Error while update the data.";
            $timeout(function () {
                $scope.message = "";
            }, 3000);

        });
    }

    $scope.renderHtml = function (message) {
         
        return $sce.trustAsHtml(message);
    };

}
]);