
app.controller('orderDetailController', [
                   '$scope', 'authService', 'orderDataService', '$sce', 'translateService', 'feedbackDataService', '$timeout', 'localStorageService',
                   function ($scope, authService, orderDataService, $sce, translateService, feedbackDataService, $timeout, localStorageService) {

                       $scope.form = {};

                       $scope.form.title = {};
                       $scope.form.title.resoruceName = "Order Detail";
                       $scope.form.title.resoruceValue = translateService.getResourceValue($scope.form.title.resoruceName);
                       $scope.afterShow = function (e) {

                           var view = kendo.mobile.application.view();
                           if (view !== null) {
                               var navbar = kendo.mobile.application.view()
                                            .header
                                            .find(".km-navbar")
                                            .data("kendo-mobile-nav-bar");
                               navbar.title($scope.form.title.resoruceValue);

                               if (typeof (window.navigator.simulator) === 'undefined') {
                                   window.plugins.EqatecAnalytics.Monitor.TrackFeature("view.orderDetail");
                               }

                           }
                       }

                       $scope.form.noData = {};
                       $scope.form.noData.resoruceName = "No Data are found";
                       $scope.form.noData.resoruceValue = translateService.getResourceValue($scope.form.noData.resoruceName);

                       $scope.form.noResults = {};
                       $scope.form.noResults.resoruceName = "No Results are found";
                       $scope.form.noResults.resoruceValue = translateService.getResourceValue($scope.form.noResults.resoruceName);



                       $scope.form.orderInquiry = {};
                       $scope.form.orderInquiry.resoruceName = "Have a question or comment about this order?";
                       $scope.form.orderInquiry.resoruceValue = translateService.getResourceValue($scope.form.orderInquiry.resoruceName);


                       $scope.form.faildInquiry = {};
                       $scope.form.faildInquiry.resoruceName = "Failed to Send Inquiry";
                       $scope.form.faildInquiry.resoruceValue = translateService.getResourceValue($scope.form.faildInquiry.resoruceName);


                       $scope.form.thankyou = {};
                       $scope.form.thankyou.resoruceName = "Thank you for your Inquiry, someone will be get back to you";
                       $scope.form.thankyou.resoruceValue = translateService.getResourceValue($scope.form.thankyou.resoruceName);

                       $scope.form.shippingInstruction = {};
                       $scope.form.shippingInstruction.resoruceName = "Shipping discliamer";
                       $scope.form.shippingInstruction.resoruceValue = translateService.getResourceValue($scope.form.shippingInstruction.resoruceName);

                       $scope.form.orderDate = {};
                       $scope.form.orderDate.resoruceName = "Order Date";
                       $scope.form.orderDate.resoruceValue = translateService.getResourceValue($scope.form.orderDate.resoruceName);


                       $scope.form.salesOrder = {};
                       $scope.form.salesOrder.resoruceName = "Sales Order";
                       $scope.form.salesOrder.resoruceValue = translateService.getResourceValue($scope.form.salesOrder.resoruceName);


                       $scope.form.orderNumber = {};
                       $scope.form.orderNumber.resoruceName = "Order Number";
                       $scope.form.orderNumber.resoruceValue = translateService.getResourceValue($scope.form.orderNumber.resoruceName);

                       $scope.form.shoppingCart = {};
                       $scope.form.shoppingCart.resoruceName = "Shopping Cart";
                       $scope.form.shoppingCart.resoruceValue = translateService.getResourceValue($scope.form.shoppingCart.resoruceName);

                       $scope.form.vendorRef = {};
                       $scope.form.vendorRef.resoruceName = "Vendor Ref";
                       $scope.form.vendorRef.resoruceValue = translateService.getResourceValue($scope.form.vendorRef.resoruceName);

                       $scope.form.notifyMe = {};
                       $scope.form.notifyMe.resoruceName = "Notify Me";
                       $scope.form.notifyMe.resoruceValue = translateService.getResourceValue($scope.form.notifyMe.resoruceName);

                       $scope.form.billingInfo = {};
                       $scope.form.billingInfo.resoruceName = "Bill To Information";
                       $scope.form.billingInfo.resoruceValue = translateService.getResourceValue($scope.form.billingInfo.resoruceName);


                       $scope.form.shiptoInfo = {};
                       $scope.form.shiptoInfo.resoruceName = "Ship To Information";
                       $scope.form.shiptoInfo.resoruceValue = translateService.getResourceValue($scope.form.shiptoInfo.resoruceName);


                       $scope.form.orderInquiry = {};
                       $scope.form.orderInquiry.resoruceName = "Order Inquiry";
                       $scope.form.orderInquiry.resoruceValue = translateService.getResourceValue($scope.form.orderInquiry.resoruceName);


                       $scope.form.sendInquiry = {};
                       $scope.form.sendInquiry.resoruceName = "Send Inquiry";
                       $scope.form.sendInquiry.resoruceValue = translateService.getResourceValue($scope.form.sendInquiry.resoruceName);



                       $scope.form.item = {};
                       $scope.form.item.resoruceName = "Item";
                       $scope.form.item.resoruceValue = translateService.getResourceValue($scope.form.item.resoruceName);


                       $scope.form.quantity = {};
                       $scope.form.quantity.resoruceName = "Quantity";
                       $scope.form.quantity.resoruceValue = translateService.getResourceValue($scope.form.quantity.resoruceName);


                       $scope.form.price = {};
                       $scope.form.price.resoruceName = "Price";
                       $scope.form.price.resoruceValue = translateService.getResourceValue($scope.form.price.resoruceName);

                       $scope.form.orderDetail = {};
                       $scope.form.orderDetail.resoruceName = "Order Detail";
                       $scope.form.orderDetail.resoruceValue = translateService.getResourceValue($scope.form.orderDetail.resoruceName);


                       $scope.form.itemCode = {};
                       $scope.form.itemCode.resoruceName = "Item Code";
                       $scope.form.itemCode.resoruceValue = translateService.getResourceValue($scope.form.itemCode.resoruceName);

                       $scope.form.prodcutionLocation = {};
                       $scope.form.prodcutionLocation.resoruceName = "Production Location";
                       $scope.form.prodcutionLocation.resoruceValue = translateService.getResourceValue($scope.form.prodcutionLocation.resoruceName);

                       $scope.form.trackingList = {};
                       $scope.form.trackingList.resoruceName = "Tracking List";
                       $scope.form.trackingList.resoruceValue = translateService.getResourceValue($scope.form.trackingList.resoruceName);

                       $scope.form.releasedBy = {};
                       $scope.form.releasedBy.resoruceName = "Released by";
                       $scope.form.releasedBy.resoruceValue = translateService.getResourceValue($scope.form.releasedBy.resoruceName);

                       $scope.form.phone = {};
                       $scope.form.phone.resoruceName = "Phone";
                       $scope.form.phone.resoruceValue = translateService.getResourceValue($scope.form.phone.resoruceName);

                       $scope.form.email = {};
                       $scope.form.email.resoruceName = "Email";
                       $scope.form.email.resoruceValue = translateService.getResourceValue($scope.form.email.resoruceName);


                       $scope.form.confirmation = {};
                       $scope.form.confirmation.resoruceName = "Confirmation";
                       $scope.form.confirmation.resoruceValue = translateService.getResourceValue($scope.form.confirmation.resoruceName);

                       $scope.form.estimated = {};
                       $scope.form.estimated.resoruceName = "Estimated";
                       $scope.form.estimated.resoruceValue = translateService.getResourceValue($scope.form.estimated.resoruceName);

                       $scope.form.shipDate = {};
                       $scope.form.shipDate.resoruceName = "Ship Date";
                       $scope.form.shipDate.resoruceValue = translateService.getResourceValue($scope.form.shipDate.resoruceName);


                       $scope.form.apporvalCommnet = {};
                       $scope.form.apporvalCommnet.resoruceName = "Apporval Commnet";
                       $scope.form.apporvalCommnet.resoruceValue = translateService.getResourceValue($scope.form.apporvalCommnet.resoruceName);

                   
                       $scope.order = {};

                       $scope.order.hasApproval = false;
                       $scope.order.hasStaged = false;
                       $scope.order.orderType = '1';
                       $scope.order.title = 'Order Detail';
                       $scope.hasBlockAddress = false;
                       $scope.order.detail = {};
                       $scope.inqueryMessage = "";
                       $scope.inqueryComment = "";

                       $scope.feedbackData = {};
                       $scope.feedbackData.webpage = "Mobile App - Order Inquiry";
                       $scope.feedbackData.comment = "";

                       $scope.trackingUrl = "";
                       $scope.trackingList = {};
                       $scope.trackingCount = 0;

                       $scope.confirmationData = "";
                       $scope.hasHidePrice = false;
                       var init = function () {
                           if (!authService.authentication.isAuth) {
                               authService.logout();

                               kendo.mobile.application.navigate("src/app/login/login.html");
                           }
                       };
                       init();
                       var orderType = '1';
                       var parameterId = 0;
                       var parameterValue = "";
                       var backUrl = 'home.html';
                       $scope.intShow = function (e) {
                           orderType = e.view.params.orderType;
                           parameterId = e.view.params.parameterId;
                           parameterValue = e.view.params.parameterValue;
                           backUrl = e.view.params.backUrl;
                           $scope.order.orderType = orderType;
                           getOrderDetail(parameterValue);
                          
                       }

                       var removeEmptyTracking = function (trakcingList) {
                           var newTrakcingList = [];
                           angular.forEach(trakcingList, function (value) {
                               if (value.ProductionOrderId > 0) {
                                   newTrakcingList.push(value);
                               }
                           });
                           return newTrakcingList;
                       }

                       var getOrderDetail = function (poctrlno) {

                           $scope.order.OrderNumber = '';
                           $scope.order.ShoppingCart = '';
                           $scope.order.SalesOrderNo = '';


                           kendo.mobile.application.showLoading();

                           orderDataService.getOrderDetail(poctrlno).then(function (result) {

                               $scope.order.OrderNumber = result.MobileOrderDetail.OrderNumber;
                               $scope.order.ShoppingCart = result.MobileOrderDetail.ShoppingCartId;
                               $scope.order.SalesOrderNo = result.MobileOrderDetail.SalesOrderNumber;

                               $scope.order.detail = result;
                               $scope.trackingList = removeEmptyTracking(result.MobileOrderDetail.OrderTrackingNumberList);

                               $scope.trackingCount = $scope.trackingList.length;
                               $("#btn_tracking").data("kendoMobileButton").badge($scope.trackingCount);

                               $scope.hasBlockAddress = result.MobileOrderDetail.BlockAddressInfo;
                               console.log($scope.hasBlockAddress);
                               if ($scope.order.orderType === '1') {
                                   $scope.order.hasApproval = true;
                                   $scope.hasHidePrice = false;
                               }
                               else {
                                   $scope.hasHidePrice = result.MobileOrderDetail.HideCheckOutPrice;
                               }
                           }).catch(function (error) {
                               $scope.order.detail = {};

                           }).finally(function () {
                               kendo.mobile.application.hideLoading();
                           });

                       }; // end message


                       $scope.showTrakcingListModal = function () {
                           if (typeof (window.navigator.simulator) === 'undefined') {
                               window.plugins.EqatecAnalytics.Monitor.TrackFeature("event.orderDetail.tracking");
                           }
                           if ($scope.trackingCount > 1) {
                               $("#modalview-trackingList").kendoMobileModalView("open");
                           }
                           else {
                               var url = $scope.trackingList[0].TrackingUrl;

                               var deviceData = localStorageService.get('deviceData');

                               if (deviceData !== null && deviceData.result.PlatformType === 'iOS' && deviceData.result.PlatformVersion < 9) {
                                   window.open(url, '_blank', 'location=yes');
                               }
                               else {
                                   window.open(url, '_system');
                               }

                           }
                       }

                       $scope.showTracking = function (url) {

                           var deviceData = localStorageService.get('deviceData');

                           if (deviceData !== null && deviceData.result.PlatformType === 'iOS' && deviceData.result.PlatformVersion < 9) {
                               window.open(url, '_blank', 'location=yes');
                           }
                           else {
                               window.open(url, '_system');
                           }


                       }
                       $scope.send = function () {
                           if (typeof (window.navigator.simulator) === 'undefined') {
                               window.plugins.EqatecAnalytics.Monitor.TrackFeature("event.orderDetail.send");
                           }
                           kendo.mobile.application.showLoading();
                           $scope.feedbackData.comment = $scope.inqueryComment + " Order Information: Order Number : " + $scope.order.OrderNumber + " Shopping Cart Id : " + $scope.order.ShoppingCart + " Sales Order No : " + $scope.order.SalesOrderNo;
                           feedbackDataService.postFeedback($scope.feedbackData).then(function (result) {
                               if (result === 'success') {
                                   $scope.inqueryMessage = $scope.form.thankyou.resoruceValue;
                                   $timeout(function () {
                                       $scope.inqueryComment = "";
                                       $scope.feedbackData.comment = "";
                                       $scope.inqueryMessage = "";
                                   }, 7000);

                                   $scope.feedbackData.comment = "";
                               } else {
                                   $scope.feedbackData.comment = "";
                                   $scope.inqueryMessage = "";
                                   $timeout(function () {
                                       $scope.inqueryMessage = "";
                                   }, 7000);
                               }
                           }).catch(function (error) {
                               $scope.feedbackData.comment = "";
                               $scope.inqueryMessage = $scope.form.faildInquiry.resoruceValue;
                               $timeout(function () {
                                   $scope.inqueryMessage = "";
                               }, 7000);

                           }).finally(function () {
                               kendo.mobile.application.hideLoading();
                           });
                       }

                       $scope.showConfirmationModel = function (id) {
                           $("#modalview-detail-confirmation").kendoMobileModalView("open");
                           $('.km-view').css('-webkit-transform', 'none');
                           kendo.mobile.application.showLoading();
                           $scope.confirmationData = "Loading";
                           if (typeof (window.navigator.simulator) === 'undefined') {
                               window.plugins.EqatecAnalytics.Monitor.TrackFeature("event.orderDetail.confirmationHtml");
                           }


                           orderDataService.getConfirmationHtml(id).then(function (result) {

                               if ((result !== null || typeof result != 'undefined') && result.data.length > 0) {
                                   $scope.confirmationData = result.data;
                               }
                               else {
                                   $scope.confirmationData = $scope.form.noData.resoruceValue;

                               }


                           }).catch(function (error) {
                               $scope.confirmationData = $scope.form.noData.resoruceValue;
                           }).finally(function () {
                               kendo.mobile.application.hideLoading();
                           });


                       };
                       $scope.hideConfirmationModel = function () {

                           $("#modalview-detail-confirmation").kendoMobileModalView("close");
                       };

                       //tracking modal 

                       $scope.closeTrackingListModel = function () {
                           $("#modalview-trackingList").kendoMobileModalView("close");
                       };

                       $scope.backButton = function () {
                           kendo.mobile.application.navigate("src/app/" + backUrl);
                       }
                       $scope.renderHtml = function (content) {
                           if (typeof content !== 'undefined' && $scope.hasBlockAddress) {
                               content = content.replace(/class="shipTo"/g, 'class="shipTo" style="display:none;"');
                               content = content.replace(/class="billTo"/g, 'class="billTo" style="display:none;"');
                           }
                           return $sce.trustAsHtml(content);
                       
                       };
                   }
]);