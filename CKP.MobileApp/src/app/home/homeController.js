
app.controller('homeController', [
                  '$rootScope', '$scope', '$http', 'authService', 'localStorageService', '$timeout', 'homeDataService', 'parameterService', 'alerting', '$filter', 'translateService', 'messageDataService', 'orderDataService',
                   function ($rootScope, $scope, $http, authService, localStorageService, $timeout, homeDataService, parameterService, alerting, $filter, translateService, messageDataService, orderDataService) {
                       var init = function () {

                           if (!authService.authentication.isAuth) {
                               authService.logout();

                               kendo.mobile.application.navigate("src/app/login/login.html");
                           }
                        
                       };
                       init();

                       $scope.form = {};
                       $scope.mesages = {};
                       $scope.form.title = {};
                       $scope.form.title.resoruceName = "Home";
                       $scope.form.title.resoruceValue = translateService.getResourceValue($scope.form.title.resoruceName);

                       $scope.form.attentionUser = {};
                       $scope.form.attentionUser.resoruceName = "Attension User";
                       $scope.form.attentionUser.resoruceValue = translateService.getResourceValue($scope.form.attentionUser.resoruceName);

                       $scope.form.creditLock = {};
                       $scope.form.creditLock.resoruceName = "Credit Lock";
                       $scope.form.creditLock.resoruceValue = translateService.getResourceValue($scope.form.creditLock.resoruceName);


                       $scope.form.creditLockMessage = {};
                       $scope.form.creditLockMessage.resoruceName = "Credit Lock Message";
                       $scope.form.creditLockMessage.resoruceValue = translateService.getResourceValue($scope.form.creditLockMessage.resoruceName);

                       $scope.form.approval = {};
                       $scope.form.approval.resoruceName = "Approve Orders";
                       $scope.form.approval.resoruceValue = translateService.getResourceValue($scope.form.approval.resoruceName);

                       $scope.form.yes = {};
                       $scope.form.yes.resoruceName = "Approve";
                       $scope.form.yes.resoruceValue = translateService.getResourceValue($scope.form.yes.resoruceName);

                       $scope.form.no = {};
                       $scope.form.no.resoruceName = "Decline";
                       $scope.form.no.resoruceValue = translateService.getResourceValue($scope.form.no.resoruceName);

                       $scope.form.comment = {};
                       $scope.form.comment.resoruceName = "Comment";
                       $scope.form.comment.resoruceValue = translateService.getResourceValue($scope.form.comment.resoruceName);
                       
                       $scope.form.alertsAndNews = {};
                       $scope.form.alertsAndNews.resoruceName = "Alerts and News";
                       $scope.form.alertsAndNews.resoruceValue = translateService.getResourceValue($scope.form.alertsAndNews.resoruceName);

                       $scope.form.viewAll = {};
                       $scope.form.viewAll.resoruceName = "View All";
                       $scope.form.viewAll.resoruceValue = translateService.getResourceValue($scope.form.viewAll.resoruceName);

                     
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

                       $scope.form.orderStatus = {};
                       $scope.form.orderStatus.resoruceName = "Status";
                       $scope.form.orderStatus.resoruceValue = translateService.getResourceValue($scope.form.orderStatus.resoruceName);

                       $scope.form.orderDate = {};
                       $scope.form.orderDate.resoruceName = "Order Date";
                       $scope.form.orderDate.resoruceValue = translateService.getResourceValue($scope.form.orderDate.resoruceName);

                       $scope.form.bulkApprove = {};
                       $scope.form.bulkApprove.resoruceName = "Bulk Approve";
                       $scope.form.bulkApprove.resoruceValue = translateService.getResourceValue($scope.form.bulkApprove.resoruceName);

                       $scope.form.dateInSystem = {};
                       $scope.form.dateInSystem.resoruceName = "Date In System";
                       $scope.form.dateInSystem.resoruceValue = translateService.getResourceValue($scope.form.dateInSystem.resoruceName);

                       $scope.form.releasedOrder = {};
                       $scope.form.releasedOrder.resoruceName = "Released";
                       $scope.form.releasedOrder.resoruceValue = translateService.getResourceValue($scope.form.releasedOrder.resoruceName);

                       $scope.form.newOrder = {};
                       $scope.form.newOrder.resoruceName = "New";
                       $scope.form.newOrder.resoruceValue = translateService.getResourceValue($scope.form.newOrder.resoruceName);

                       $scope.form.approvalOrder = {};
                       $scope.form.approvalOrder.resoruceName = "Approval";
                       $scope.form.approvalOrder.resoruceValue = translateService.getResourceValue($scope.form.approvalOrder.resoruceName);

                       $scope.form.search = {};
                       $scope.form.search.resoruceName = "Search";
                       $scope.form.search.resoruceValue = translateService.getResourceValue($scope.form.search.resoruceName);
                     

                       $scope.message = "";
                       $scope.messageCount = 0;

                       $scope.searchParameterId = 1;
                       $scope.activeTabId = "";
                       $scope.parameters = parameterService.getSearchParameters();
                       $scope.isAuth = authService.authentication.isAuth;
                       $scope.selectParamter = function () {
                           parameterService.getSearchParameterName($scope.selectedPara)
                           $scope.searchParameterId = $scope.selectedPara;

                       }
                       $scope.languages = parameterService.getSearchParameters();
                       $scope.clearSearch = function () {
                           $scope.searchValue = "";
                       }
                       //translation
                       //retailers with count
                       $scope.orderCounts = {};

                       homeDataService.getOrderHeaderData().then(function (result) {
                           $scope.orders = result;
                        
                       });

                       $scope.approvalDetail = function (id) {
                           $('.order').hide();

                           $('#approval-' + id).show();

                           $scope.activeTabId = '#approvalDetail-' + id;
                       };

                       var getOrderCounts = function () {
                           alerting.addSuccess("Getting Order Counts!");
                           kendo.mobile.application.pane.loader.show();
                           homeDataService.getOrderCounts().then(function (result) {

                               $scope.orderCounts = result;

                               //    if ($scope.activeTabId.length > 0)
                               //    {
                               //        angular.element($scope.activeTabId).trigger('click');
                               //        if ($scope.activeTabId !== "") {
                               //            angular.element($scope.activeTabId).trigger('click');
                               //        }
                               //    }
                               //    else {
                               //        $('.order').hide();
                               //        angular.element('.order').hide();
                               //    }
                               //}
                           }).finally(function () {
                                   kendo.mobile.application.pane.loader.hide();
                               });
                           
                       }
                       //alerts & news - messages
                  
                       var getMessages = function () {
                           kendo.mobile.application.pane.loader.show();

                           messageDataService.getMessages().then(function (result) {
                               $scope.mesages = result;
                               $scope.messageCount = result.AnnouncementList.length + result.PartnerHolidayList.length;

                           }).catch(function (error) {
                               $scope.mesages = {};
                               $scope.messageCount = 0;
                           }).finally(function () {
                               kendo.mobile.application.pane.loader.hide();
                           });
                       }; // end message

                       getMessages();
                       getOrderCounts();
                      
                       $scope.newOrderDetail = function (id) {
                           $('.order').hide();
                           $('#new-' + id).show();
                           $scope.activeTabId = '#newOrderDetail-' + id;
                       };

                       $scope.releaseOrderDetail = function (id) {
                           $('.order').hide();

                           $('#released-' + id).show();
                           $scope.activeTabId = '#releaseOrderDetail-' + id;
                       };
                       $scope.collapse = function (id) {
                           $('.order').hide();
                           $('.retailer').removeClass('active');
                           $('.retailer-' + id).removeClass('active');
                           $scope.activeTabId = "";
                       };

                       $scope.setSearhParamter = function (para) {
                           $scope.selectedPara = parameterService.getSearchParameterName(para);

                           $scope.searchParameterId = para;
                       }
                       $scope.orderDetail = function (orderType, parameterId, parameterValue) {
                           kendo.mobile.application.navigate("src/app/order/detail.html?orderType=" + orderType + "&parameterId=" + parameterId + "&parameterValue=" + parameterValue);
                       }

                       $scope.orderList = function (orderType, parameterId, parameterValue) {
                           kendo.mobile.application.navigate("src/app/order/list.html?orderType=" + orderType + "&parameterId=" + parameterId + "&parameterValue=" + parameterValue);
                       }

                       $scope.key = function ($event) {
                           console.log($event.keyCode);

                           if ($event.keyCode === 13) {
                               //$scope.message = "Searching for " + $scope.selectedPara + " like  " + $scope.searchValue + "Para: " + $scope.searchParamterId;
                             
                               forceGetData = true;
                               $("#icon-right").blur();
                               getOrderCounts();

                           }
                       }

                       //
                       $scope.selection = [];
                       $scope.orderApprovalComment = "";
                       $scope.salesorderList = "";
                     
                       $scope.toggleSelection = function toggleSelection(so) {
                           var idx = $scope.selection.indexOf(so);
                           // is currently selected                          
                           if (idx > -1) {
                               $scope.selection.splice(idx, 1);
                           } else {
                               $scope.selection.push(so);
                           }
                      
                       };
                       $scope.viewAll = function (orderType, parameterId) {
                           kendo.mobile.application.navigate("src/app/order/order.html?orderType=" + orderType + "&parameterId=" + parameterId + "&parameterValue=" + "" + "&orders=" + $scope.orders);
                       }
                       //$scope.approve = function () {
                       //    var salesorders = "";

                       //    var salesorderList = $scope.selection;
                       //    angular.forEach(salesorderList, function (value, key) {
                       //        salesorders += value + ',';
                       //    });
                       //    kendo.mobile.application.navigate("src/app/order/approve.html?orders=" + salesorders);
                       //}
                       $scope.showAlertModel = function () {

                           $("#modalview-alerts").kendoMobileModalView("open");
                          
                       };
                       $scope.hideAlertModel = function () {
                           $("#modalview-alerts").kendoMobileModalView("close");
                       };


                       //credit lock
                       $scope.showCreditModel = function () {
                           $('.order').hide();
                           $("#modalview-credit").kendoMobileModalView("open");
                       };
                       $scope.hideCreditModel = function () {
                           $('.order').hide();
                           $("#modalview-credit").kendoMobileModalView("close");
                       };
                       //approve modal

                       $scope.showApprovalModel = function () {
                           var salesorders = "";

                               var salesorderList = $scope.selection;
                               angular.forEach(salesorderList, function (value, key) {
                                   salesorders += value + ',';
                               });
                               $scope.salesorderList = salesorders;
                           $("#modalview-approve").kendoMobileModalView("open");
                       };
                       $scope.hideApporvalModel = function () {
                           $scope.salesorderList = "";
                           $("#modalview-approve").kendoMobileModalView("close");
                       };

                       $scope.approved = function (status) {
                           //alert('approved:' + status);
                           orderApprovalByStatus(status);
                       
                       }
                       $scope.testData = [1, 2, 3, 4, 5];

                       //appprove order
                       var orderApprovalByStatus = function (statusUpdate) {
                           var salesorders = [];

                           var salesorderList = $scope.selection;
                           angular.forEach(salesorderList, function (value, key) {
                               if (value !== '') {
                                   var solist = {
                                       SalesOrderNo: value,
                                       Comment: $scope.orderApprovalComment
                                   };
                                   salesorders.push(solist);
                               }
                           });

                           var jsonIn = {
                               UserName: "jim rl tjx",
                               OrgId: 6884,
                               RetailerId: 6884,
                               ApproveOrdersListData: salesorders
                           }
                           kendo.mobile.application.pane.loader.show();
                           orderDataService.approveDecline(jsonIn).then(function (result) {
                               kendo.mobile.application.pane.loader.hide();
                               $("#modalview-approve").kendoMobileModalView("close");
                               alerting.addSuccess("Completed Approved/ Declined");                            
                           }).catch(function (error) {
                               alerting.addSuccess("Faild to Approve or Decline!");
                             
                               kendo.mobile.application.pane.loader.hide();
                               //$("#modalview-approve").kendoMobileModalView("close");
                           });
                       }

                   }

]);