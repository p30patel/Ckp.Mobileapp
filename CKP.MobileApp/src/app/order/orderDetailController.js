
app.controller('orderDetailController', [
                   '$scope', 'authService', 'orderDataService','$sce', 'translateService', 'feedbackDataService', '$timeout',
                   function ($scope, authService, orderDataService, $sce, translateService, feedbackDataService, $timeout) {
                       if (!window.navigator.simulator) {
                           window.plugins.EqatecAnalytics.Monitor.TrackFeature("view.orderDetail");
                       }
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
                       $scope.form.shippingInstruction.resoruceName = "Shipping and tax charges are estimated at time of checkout. The final shipping and tax amount will be reflected on your invoice";
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


                       
                       $scope.order = {};
                  
                       $scope.order.hasApproval = false;
                       $scope.order.hasStaged = false;
                       $scope.order.title = 'Order Detail';
                       $scope.order.detail = {};
                       $scope.inqueryMessage = "";
                       $scope.inqueryComment = "";

                       $scope.feedbackData = {};
                       $scope.feedbackData.webpage = "Mobile App - Order Inquiry";
                       $scope.feedbackData.comment = "";

                       $scope.trackingUrl = "";
                       $scope.trackingList = {};
                       $scope.trackingCount = 0;

                       var init = function() {
                           if (!authService.authentication.isAuth) {
                               authService.logout();
                             
                               kendo.mobile.application.navigate("src/app/login/login.html");
                           }
                       };
                       init();
                       var orderType = '1';
                       var parameterId = 0;
                       var parameterValue = "";
                       $scope.intShow = function (e) {
                           orderType = e.view.params.orderType;
                           parameterId = e.view.params.parameterId;
                           parameterValue = e.view.params.parameterValue;
                         
                           getOrderDetail(parameterValue);
                           
                          
                       }

                       var removeEmptyTracking = function (trakcingList)
                       {
                           var newTrakcingList = [];
                           angular.forEach(trakcingList, function (value) {                             
                               if (value.ProductionOrderId > 0 ) {
                                   newTrakcingList.push(value);
                               }                            
                           });
                           return newTrakcingList;
                       }
                       
                       var getOrderDetail = function (poctrlno) {

                           $scope.order.OrderNumber = '';
                           $scope.order.ShoppingCart = '';
                           $scope.order.SalesOrderNo = '';
                         
                         
                           kendo.mobile.application.pane.loader.show();                        
                      
                           orderDataService.getOrderDetail(poctrlno).then(function (result) {
                              
                                   $scope.order.OrderNumber = result.MobileOrderDetail.OrderNumber;
                                   $scope.order.ShoppingCart = result.MobileOrderDetail.ShoppingCartId;
                                   $scope.order.SalesOrderNo = result.MobileOrderDetail.SalesOrderNumber;

                                   $scope.order.detail = result;
                                   $scope.trackingList = removeEmptyTracking(result.MobileOrderDetail.OrderTrackingNumberList);
                                
                                   $scope.trackingCount = $scope.trackingList.length;
                                   $("#btn_tracking").data("kendoMobileButton").badge($scope.trackingCount);

                               }).catch(function (error) {
                                   $scope.order.detail = {};
                                 
                               }).finally(function () {
                                   kendo.mobile.application.pane.loader.hide();
                               });
                         
                       }; // end message

                      
                       $scope.showTrakcingListModal = function () {
                         
                           if ($scope.trackingCount > 1) {
                               $("#modalview-trackingList").kendoMobileModalView("open");
                           }
                           else {
                               var url = $scope.trackingList[0].TrackingUrl;
                               window.open(url, '_system');
                           }
                       }

                       $scope.showTracking = function (url) {
                          
                           window.open(url, '_system');
                         
                       }
                       $scope.send = function () {
                           if (!window.navigator.simulator) {
                               window.plugins.EqatecAnalytics.Monitor.TrackFeature("events.orderDetail.send");
                           }
                           kendo.mobile.application.pane.loader.show();
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
                               kendo.mobile.application.pane.loader.hide();
                           });
                       }

                      
                       $scope.confirmationConent = "";
                      
                       $scope.showConfirmationModel = function (id) {
                           $('.km-view').css('-webkit-transform', 'none');
                           kendo.mobile.application.pane.loader.show();

                           $scope.confiramtionConent = 'No data found';

                           orderDataService.getConfirmationHtml(id).then(function (result) {
                               $scope.confirmationConent = result;
                           }).catch(function (error) {
                               $scope.confirmationConent = 'No data found';
                           }).finally(function () {
                               kendo.mobile.application.pane.loader.hide();
                           });

                           $("#modalview-confirmation").kendoMobileModalView("open");
                       };
                       $scope.hideConfirmationModel = function () {

                           $("#modalview-confirmation").kendoMobileModalView("close");
                       };
                 
                       //tracking modal 
                     
                       $scope.closeTrackingListModel = function () {
                           $("#modalview-trackingList").kendoMobileModalView("close");
                       };
                
                       $scope.renderHtml = function (content) {
                           return $sce.trustAsHtml(content);
                       };
                   }
               ]);