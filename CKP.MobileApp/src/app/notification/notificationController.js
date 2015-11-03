
app.controller('notificationController', ['$scope', '$http', '$sce', 'translateService', 'authService', 'notificationDataService', '$timeout', '$anchorScroll', '$location',
function ($scope, $http, $sce, translateService, authService, notificationDataService, $timeout, $anchorScroll, $location) {
        window.plugins.EqatecAnalytics.Monitor.TrackFeature("view.notifcation");
        $scope.form = {};

        $scope.form.title = {};
        $scope.form.title.resoruceName = "Notification Settings";
        $scope.form.title.resoruceValue = translateService.getResourceValue($scope.form.title.resoruceName);

        $scope.beforeShow = function () {
            kendo.mobile.application.pane.loader.show();
            if (!authService.authentication.isAuth) {
                authService.logout();
                kendo.mobile.application.navigate("src/app/login/login.html");
            }
            kendo.mobile.application.pane.loader.hide();

        };
        $scope.message = "";
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

        }

        setResources();

        var init = function () {
            $scope.orderReceived = true;
            $scope.orderApproval = true;

            $scope.orderApprovedStatus = true;

            $scope.shipment = true;
            $scope.delivery = true;

            $scope.printshop = true;
            $scope.maintenance = true;

        }
        init();

        $scope.notifications = [{ "SubscriptionType": 101, "IsEnabled": true, "SubscriptinDescription": "NewOrderReceived", "ErrorDescription": null, "UserId": 0, "IconClass": "ck-recieved" }, { "SubscriptionType": 102, "IsEnabled": true, "SubscriptinDescription": "OrderApproval", "ErrorDescription": null, "UserId": 0, "IconClass": "ck-approval" }, { "SubscriptionType": 103, "IsEnabled": true, "SubscriptinDescription": "ApprovedOrDeclinedOrder", "ErrorDescription": null, "UserId": 0, "IconClass": "ck-cart" }, { "SubscriptionType": 104, "IsEnabled": false, "SubscriptinDescription": "ShipmentConfirmation", "ErrorDescription": null, "UserId": 0, "IconClass": "ck-shipment" }, { "SubscriptionType": 105, "IsEnabled": false, "SubscriptinDescription": "DeliveryConfirmation", "ErrorDescription": null, "UserId": 0, "IconClass": "ck-delivery" }, { "SubscriptionType": 106, "IsEnabled": false, "SubscriptinDescription": "PrintshopHoliday", "ErrorDescription": null, "UserId": 0, "IconClass": "ck-printshop" }, { "SubscriptionType": 107, "IsEnabled": true, "SubscriptinDescription": "Maintenance", "ErrorDescription": null, "UserId": 0, "IconClass": "ck-maintance" }];

        $scope.onChange = function (e) {
            var notifcationUpdateData = [];
            var notifcation = {
                SubscriptionType: e.sender.element.attr('data-SubscriptionType'),
                IsEnabled: e.checked
            }
            notifcationUpdateData.push(notifcation);

            notificationDataService.updateNotifcation(notifcationUpdateData).then(function (result) {
                if (result === 'success') {
                    $scope.message = message;
                    $timeout(function () {
                        $scope.message = "";
                    }, 7000);

                } else {

                    $scope.message = "Faild to save data, Please try later<br>";
                    $timeout(function () {
                        $scope.message = "";
                    }, 7000);
                }
            }).catch(function (error) {
                $location.hash('bottom');
                $anchorScroll();
                $scope.message = "Faild to update notifcation.";
                $timeout(function () {
                    $scope.message = "";
                }, 7000);

            });
        }
        $scope.renderHtml = function (message) {
         
            return $sce.trustAsHtml(message);
        };

    }
]);