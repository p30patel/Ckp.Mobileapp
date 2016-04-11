
app.controller('orderDetailController', [
                   '$scope', 'authService', 'orderDataService', '$sce', 'translateService', 'feedbackDataService', 'notificationDataService' , '$timeout', 'localStorageService',
                   function ($scope, authService, orderDataService, $sce, translateService, feedbackDataService, notificationDataService, $timeout, localStorageService) {

                       $scope.form = {};

                       $scope.form.title = {};
                       $scope.form.title.resourceName = "Order Detail";
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
                                   window.plugins.EqatecAnalytics.Monitor.TrackFeature("view.orderDetail");
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



                       $scope.form.orderInquiry = {};
                       $scope.form.orderInquiry.resourceName = "Have a question or comment about this order?";
                       $scope.form.orderInquiry.resourceValue = translateService.getResourceValue($scope.form.orderInquiry.resourceName);


                       $scope.form.faildInquiry = {};
                       $scope.form.faildInquiry.resourceName = "Failed to Send Inquiry";
                       $scope.form.faildInquiry.resourceValue = translateService.getResourceValue($scope.form.faildInquiry.resourceName);


                       $scope.form.thankyou = {};
                       $scope.form.thankyou.resourceName = "Thank you for your Inquiry, someone will be get back to you";
                       $scope.form.thankyou.resourceValue = translateService.getResourceValue($scope.form.thankyou.resourceName);

                       $scope.form.shippingInstruction = {};
                       $scope.form.shippingInstruction.resourceName = "Shipping discliamer";
                       $scope.form.shippingInstruction.resourceValue = translateService.getResourceValue($scope.form.shippingInstruction.resourceName);

                       $scope.form.orderDate = {};
                       $scope.form.orderDate.resourceName = "Order Date";
                       $scope.form.orderDate.resourceValue = translateService.getResourceValue($scope.form.orderDate.resourceName);

                       $scope.form.dateInSystem = {};
                       $scope.form.dateInSystem.resourceName = "Receive Date";
                       $scope.form.dateInSystem.resourceValue = translateService.getResourceValue($scope.form.dateInSystem.resourceName);

                       $scope.form.salesOrder = {};
                       $scope.form.salesOrder.resourceName = "Sales Order";
                       $scope.form.salesOrder.resourceValue = translateService.getResourceValue($scope.form.salesOrder.resourceName);


                       $scope.form.orderNumber = {};
                       $scope.form.orderNumber.resourceName = "Order Number";
                       $scope.form.orderNumber.resourceValue = translateService.getResourceValue($scope.form.orderNumber.resourceName);

                       $scope.form.shoppingCart = {};
                       $scope.form.shoppingCart.resourceName = "Shopping Cart";
                       $scope.form.shoppingCart.resourceValue = translateService.getResourceValue($scope.form.shoppingCart.resourceName);

                       $scope.form.vendorRef = {};
                       $scope.form.vendorRef.resourceName = "Vendor Ref";
                       $scope.form.vendorRef.resourceValue = translateService.getResourceValue($scope.form.vendorRef.resourceName);

                       $scope.form.notifyMe = {};
                       $scope.form.notifyMe.resourceName = "Notify Me";
                       $scope.form.notifyMe.resourceValue = translateService.getResourceValue($scope.form.notifyMe.resourceName);

                       $scope.form.billingInfo = {};
                       $scope.form.billingInfo.resourceName = "Bill To Information";
                       $scope.form.billingInfo.resourceValue = translateService.getResourceValue($scope.form.billingInfo.resourceName);


                       $scope.form.shiptoInfo = {};
                       $scope.form.shiptoInfo.resourceName = "Ship To Information";
                       $scope.form.shiptoInfo.resourceValue = translateService.getResourceValue($scope.form.shiptoInfo.resourceName);


                       $scope.form.orderInquiry = {};
                       $scope.form.orderInquiry.resourceName = "Order Inquiry";
                       $scope.form.orderInquiry.resourceValue = translateService.getResourceValue($scope.form.orderInquiry.resourceName);


                       $scope.form.sendInquiry = {};
                       $scope.form.sendInquiry.resourceName = "Send Inquiry";
                       $scope.form.sendInquiry.resourceValue = translateService.getResourceValue($scope.form.sendInquiry.resourceName);



                       $scope.form.item = {};
                       $scope.form.item.resourceName = "Item";
                       $scope.form.item.resourceValue = translateService.getResourceValue($scope.form.item.resourceName);


                       $scope.form.quantity = {};
                       $scope.form.quantity.resourceName = "Quantity";
                       $scope.form.quantity.resourceValue = translateService.getResourceValue($scope.form.quantity.resourceName);


                       $scope.form.price = {};
                       $scope.form.price.resourceName = "Price";
                       $scope.form.price.resourceValue = translateService.getResourceValue($scope.form.price.resourceName);

                       $scope.form.orderDetail = {};
                       $scope.form.orderDetail.resourceName = "Order Detail";
                       $scope.form.orderDetail.resourceValue = translateService.getResourceValue($scope.form.orderDetail.resourceName);


                       $scope.form.itemCode = {};
                       $scope.form.itemCode.resourceName = "Item Code";
                       $scope.form.itemCode.resourceValue = translateService.getResourceValue($scope.form.itemCode.resourceName);

                       $scope.form.prodcutionLocation = {};
                       $scope.form.prodcutionLocation.resourceName = "Production Location";
                       $scope.form.prodcutionLocation.resourceValue = translateService.getResourceValue($scope.form.prodcutionLocation.resourceName);

                       $scope.form.trackingList = {};
                       $scope.form.trackingList.resourceName = "Tracking List";
                       $scope.form.trackingList.resourceValue = translateService.getResourceValue($scope.form.trackingList.resourceName);

                       $scope.form.releasedBy = {};
                       $scope.form.releasedBy.resourceName = "Released by";
                       $scope.form.releasedBy.resourceValue = translateService.getResourceValue($scope.form.releasedBy.resourceName);

                       $scope.form.phone = {};
                       $scope.form.phone.resourceName = "Phone";
                       $scope.form.phone.resourceValue = translateService.getResourceValue($scope.form.phone.resourceName);

                       $scope.form.email = {};
                       $scope.form.email.resourceName = "Email";
                       $scope.form.email.resourceValue = translateService.getResourceValue($scope.form.email.resourceName);


                       $scope.form.confirmation = {};
                       $scope.form.confirmation.resourceName = "Order Confirmation";
                       $scope.form.confirmation.resourceValue = translateService.getResourceValue($scope.form.confirmation.resourceName);

                       $scope.form.estimated = {};
                       $scope.form.estimated.resourceName = "Estimated";
                       $scope.form.estimated.resourceValue = translateService.getResourceValue($scope.form.estimated.resourceName);

                       $scope.form.shipDate = {};
                       $scope.form.shipDate.resourceName = "Ship Date";
                       $scope.form.shipDate.resourceValue = translateService.getResourceValue($scope.form.shipDate.resourceName);


                       $scope.form.apporvalCommnet = {};
                       $scope.form.apporvalCommnet.resourceName = "Apporval Commnet";
                       $scope.form.apporvalCommnet.resourceValue = translateService.getResourceValue($scope.form.apporvalCommnet.resourceName);

                       $scope.form.orderStatus = {};
                       $scope.form.orderStatus.resourceName = "Order Status";
                       $scope.form.orderStatus.resourceValue = translateService.getResourceValue($scope.form.orderStatus.resourceName);


                       $scope.form.searchKeys = {};
                       $scope.form.searchKeys.resourceName = "Search Keys and Cut Number";
                       $scope.form.searchKeys.resourceValue = translateService.getResourceValue($scope.form.searchKeys.resourceName);

                       $scope.form.itemPreview = {};
                       $scope.form.itemPreview.resourceName = "Item Preview";
                       $scope.form.itemPreview.resourceValue = translateService.getResourceValue($scope.form.itemPreview.resourceName);

                       $scope.form.deliveryDate = {};
                       $scope.form.deliveryDate.resourceName = "Delivery Date";
                       $scope.form.deliveryDate.resourceValue = translateService.getResourceValue($scope.form.deliveryDate.resourceName);

                       $scope.form.signedBy = {};
                       $scope.form.signedBy.resourceName = "Signed By";
                       $scope.form.signedBy.resourceValue = translateService.getResourceValue($scope.form.signedBy.resourceName);

                       $scope.form.seeMoreDetail = {};
                       $scope.form.seeMoreDetail.resourceName = "See More Detail";
                       $scope.form.seeMoreDetail.resourceValue = translateService.getResourceValue($scope.form.seeMoreDetail.resourceName);

                       $scope.form.hideMoreDetail = {};
                       $scope.form.hideMoreDetail.resourceName = "Hide More Detail";
                       $scope.form.hideMoreDetail.resourceValue = translateService.getResourceValue($scope.form.hideMoreDetail.resourceName);
                       
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
                       $scope.retailerId = 0;
                       $scope.hasHidePrice = false;
                       $scope.showMore = false;
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
                           $scope.retailerId = e.view.params.retailerId;
                        
                           getOrderDetail(parameterValue);

                       }

                       var removeEmptyTracking = function (trackingList) {
                           var newTrackingList = [];
                           var urls = [];
                           angular.forEach(trackingList, function (value) {
                               console.log(newTrackingList.indexOf(value.AwbNumber));
                               if (value.ProductionOrderId > 0 && urls.indexOf(value.AwbNumber) == -1) {
                                   newTrackingList.push(value);
                                   urls.push(value.AwbNumber);

                               }
                           });
                           return newTrackingList;
                       }

                       var getOrderDetail = function (poctrlno) {

                           $scope.order.OrderNumber = '';
                           $scope.order.ShoppingCart = '';
                           $scope.order.SalesOrderNo = '';


                           kendo.mobile.application.showLoading();

                           if (typeof (window.navigator.simulator) === 'undefined') {
                               window.plugins.EqatecAnalytics.Monitor.TrackFeature("event.orderDetail");
                           }
                           orderDataService.getOrderDetail(poctrlno).then(function (result) {

                               $scope.order.OrderNumber = result.MobileOrderDetail.OrderNumber;
                               $scope.order.ShoppingCart = result.MobileOrderDetail.ShoppingCartId;
                               $scope.order.SalesOrderNo = result.MobileOrderDetail.SalesOrderNumber;

                               $scope.order.detail = result;
                               $scope.trackingList = removeEmptyTracking(result.MobileOrderDetail.OrderTrackingNumberList);
                               $scope.notifyMe = result.HasNotifyMe;

                               $scope.trackingCount = $scope.trackingList.length;

                               $("#btn_tracking").data("kendoMobileButton").badge($scope.trackingCount);

                               $scope.hasBlockAddress = result.MobileOrderDetail.BlockAddressInfo;

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
                          
                           var hasValidSingleUrl = $scope.trackingCount && ($scope.trackingList[0].TrackingUrl.indexOf('http') !== -1 || $scope.trackingList[0].TrackingUrl.indexOf('www') !== -1);
                        
                           if (typeof (window.navigator.simulator) === 'undefined') {
                               window.plugins.EqatecAnalytics.Monitor.TrackFeature("event.orderDetail.tracking");
                           }
                           if ($scope.trackingCount > 1 || !hasValidSingleUrl) {
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
                       $scope.onChangeNotifyMe = function (e) {
                           var isEnabled = $scope.notifyMe;

                           var notificationUpdateData = [];
                           var notification = {
                               POCtrlNo : parameterValue,
                               SubscriptionType: e.sender.element.attr('data-SubscriptionType'),
                               IsEnabled: e.checked,
                               OrderStatus : $scope.order.detail.MobileOrderDetail.Status,
                               UserId: 0

                           };
                           if (typeof (window.navigator.simulator) === 'undefined') {
                               var organizationDetail = localStorageService.get('organizationDetail');

                               window.plugins.EqatecAnalytics.Monitor.TrackFeature("method.notifyMe.Update");
                               var flag = e.checked ? "On" : "Off";
                               window.plugins.EqatecAnalytics.Monitor.TrackFeature("notifyMe." + flag);
                               window.plugins.EqatecAnalytics.Monitor.TrackFeature("notifyMe.POCtrlNo" + parameterValue);
                               window.plugins.EqatecAnalytics.Monitor.TrackFeature("notifyMe.UserId." + organizationDetail.UserId);
                               window.plugins.EqatecAnalytics.Monitor.TrackFeature("notifyMe.RetailerId." + organizationDetail.OrgContext.RetailerId);
                               window.plugins.EqatecAnalytics.Monitor.TrackFeature("notifyMe.OrganizationId." + organizationDetail.OrgContext.Id);
                           }
                           notificationDataService.updateNotification(notification).then(function (result) {
                               if (result !== 'success') {

                                   $scope.message = "Faild to save data, Please try later<br>";
                                   $timeout(function () {
                                       $scope.message = "";
                                   }, 7000);
                               }
                           }).catch(function (error) {

                               $scope.message = "Faild to update notifcation.";
                               $timeout(function () {
                                   $scope.message = "";
                               }, 7000);

                           });
                          
                       };

                       $scope.showTracking = function (url) {

                           var deviceData = localStorageService.get('deviceData');

                           var hasValidUrl = url.indexOf('http') !== -1 || url.indexOf('www') !== -1;
                           if (hasValidUrl) {
                               if (deviceData !== null && deviceData.result.PlatformType === 'iOS' && deviceData.result.PlatformVersion < 9) {
                                   window.open(url, '_blank', 'location=yes');
                               }
                               else {
                                   window.open(url, '_system');
                               }
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
                                   $scope.inqueryMessage = $scope.form.thankyou.resourceValue;
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
                               $scope.inqueryMessage = $scope.form.faildInquiry.resourceValue;
                               $timeout(function () {
                                   $scope.inqueryMessage = "";
                               }, 7000);

                           }).finally(function () {
                               kendo.mobile.application.hideLoading();
                           });
                       }

                       $scope.showConfirmationModel = function (shoppingCartId) {
                           $("#modalview-detail-confirmation").kendoMobileModalView("open");
                           $('.km-view').css('-webkit-transform', 'none');
                           kendo.mobile.application.showLoading();
                           $scope.confirmationData = "Loading";
                           if (typeof (window.navigator.simulator) === 'undefined') {
                               window.plugins.EqatecAnalytics.Monitor.TrackFeature("event.orderDetail.confirmationHtml");
                           }

                           orderDataService.getConfirmationHtml(shoppingCartId, $scope.retailerId).then(function (result) {

                               if ((result !== null || typeof result != 'undefined') && result.data.length > 0) {
                                   $scope.confirmationData = result.data;
                               }
                               else {
                                   $scope.confirmationData = $scope.form.noData.resourceValue;

                               }


                           }).catch(function (error) {
                               $scope.confirmationData = $scope.form.noData.resourceValue;
                           }).finally(function () {
                               kendo.mobile.application.hideLoading();
                           });


                       };
                       $scope.hideConfirmationModel = function () {

                           $("#modalview-detail-confirmation").kendoMobileModalView("close");
                       };

                       //item preview modal
                       $scope.showItemPreviewModel = function (url) {

                           $("#modalview-detail-item-preview").kendoMobileModalView("open");
                       };
                       $scope.hideItemPreviewModel = function () {

                           $("#modalview-detail-item-preview").kendoMobileModalView("close");
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

                               content = content.replace(/class=shipTo/g, 'class="shipTo" style="display:none;"');
                               content = content.replace(/class=billTo/g, 'class="billTo" style="display:none;"');
                           }
                           return $sce.trustAsHtml(content);

                       };
                   }
]);