
app.controller('homeController', [
                  '$rootScope', '$scope', '$http', 'authService', 'localStorageService', '$timeout', 'homeDataService', 'parameterService', '$filter', 'translateService', 'messageDataService', 'orderDataService', '$sce', '$window',
                   function ($rootScope, $scope, $http, authService, localStorageService, $timeout, homeDataService, parameterService, $filter, translateService, messageDataService, orderDataService, $sce, $window) {
                       $scope.beforeShow = function () {
                           kendo.mobile.application.pane.loader.show();
                           if (!authService.authentication.isAuth) {
                               authService.logout();
                               kendo.mobile.application.navigate("src/app/login/login.html");
                           }
                           kendo.mobile.application.pane.loader.hide();

                       };

                       $scope.form = {};
                       $scope.mesages = {};
                       $scope.form.title = {};
                       $scope.form.title.resoruceName = "Home";
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

                       var setResources = function () {
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
                           $scope.form.dateInSystem.resoruceName = "Receive Date";
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

                       }

                       setResources();

                       if (isTrackingActive) {
                           window.plugins.EqatecAnalytics.Monitor.TrackFeature("view.Home");
                       }
                       if ($window.ga) {

                           $window.ga('send', 'pageview', { page: 'Home View-GA' });

                       }
                       $scope.message = "";
                       $scope.messageCount = 0;

                       $scope.hasCreditLock = false;
                       $scope.hasSearch = false;
                       $scope.hasListView = false;
                       $scope.hasDetailView = false;
                       $scope.selectedRetailer = 0;
                       $scope.selectedOrderType = 0;
                       $scope.currentSearchInput = '';
                       $scope.orderList = {};
                       $scope.searchParameterId = 1;
                       $scope.parameters = parameterService.getSearchParameters();

                       $scope.isAuth = authService.authentication.isAuth;


                       var setSelectPara = function () {
                           parameterService.getSearchParameterName($scope.selectedPara)
                           $scope.searchParameterId = $scope.selectedPara;

                           $scope.currentSearchInput = $scope.searchValue;
                       }

                       setSelectPara();

                       $scope.intShow = function (e) {
                           setSelectPara();
                       }
                       $scope.languages = parameterService.getSearchParameters();
                       $scope.clearSearch = function () {
                           $scope.searchValue = "";
                       }

                       //retailers with count
                       $scope.orderCounts = {};



                       var getOrderCounts = function () {
                           $scope.hasSearch = false;
                           kendo.mobile.application.pane.loader.show();
                           homeDataService.getOrderCounts().then(function (result) {

                               $scope.orderCounts = result;

                           }).finally(function () {
                               kendo.mobile.application.pane.loader.hide();
                           });

                       }
                       //get ordetrs
                       var getOrders = function (orderType, searchParamterId, searchInput) {

                         //  $scope.message = "Loading : Order Type: " + orderType + " SearchParmeter : " + searchParamterId + "Search Input: " + searchInput;

                           $timeout(function () {
                               $scope.message = "";
                           }, 7000);

                           kendo.mobile.application.pane.loader.show();
                           homeDataService.getOrderHeaderData().then(function (result) {
                               kendo.mobile.application.pane.loader.hide();
                               var orders =
                                    [
                                     {
                                         "ProductionOrderId": 412976631, "Orders":
                                           [
       { "Order": "111111" },
      { "Order": "22222" },
       { "Order": "333333" },
        { "Order": "333333" },
         { "Order": "44444" },
      { "Order": "55555" },
       { "Order": "66666" },
        { "Order": "77777" }

                                           ]
                                         , "ShoppingCart": "124321", "SalesOrderNo": "170026201", "VendorRef": "V r 1", "Status": "Open", "DateInSystem": "2015-11-18T00:00:00+00:00", "OrderDate": "2015-11-18T00:00:00+00:00"
                                     },
                                     {
                                         "ProductionOrderId": 412978692,

                                         "Orders": [{ "Order": "111111" }, { "Order": "1112111" }, { "Order": "111111" }, { "Order": "1111311" }], "ShoppingCart": "125502", "SalesOrderNo": "170026202", "VendorRef": "ADIDAS SCM", "Status": "Open", "DateInSystem": "2015-11-18T00:00:00+00:00", "OrderDate": "2015-11-18T00:00:00+00:00"
                                     },
                                     { "ProductionOrderId": 412974923, "Orders": [{ "Order": "111234111" }], "ShoppingCart": "116084", "SalesOrderNo": "170026203", "VendorRef": "v 2 2", "Status": "Open", "DateInSystem": "2015-11-18T00:00:00+00:00", "OrderDate": "2015-11-18T00:00:00+00:00" },

                                    ];

                               $scope.orders = orders;
                           }).catch(function (error) {
                               $scope.orders = {};
                           }).finally(function () {
                               kendo.mobile.application.pane.loader.hide();
                           });
                       }


                       //button group events
                       $scope.retailerHeader = function () {
                           var listviews = $("ul.order-header.km-listview");
                           listviews.hide();
                           var buttongroup = $(".buttongroup-home").data("kendoMobileButtonGroup");

                           $(".ck-count-btn").removeClass('km-state-active');
                       }
                       $scope.myOptions = {
                           select: function (e) {

                               var selectedBtnRetailer = e.sender.element.attr('data-btnRetailer');

                               $scope.selectedRetailer = selectedBtnRetailer;

                               var listviews = $("ul.order-header.km-listview");

                               listviews.hide();

                               var listviewsToShow = $("ul.km-listview").filter("[data-retailer='" + selectedBtnRetailer + "']");

                               listviewsToShow.eq(e.index).show();

                               var selectedOrderType = listviewsToShow.eq(e.index).attr('data-orderType');

                               $scope.selectedOrderType = parameterService.getOrderTypeById(selectedOrderType);

                               var buttongroup = $(".buttongroup-home").data("kendoMobileButtonGroup");


                               getOrders(selectedOrderType, $scope.searchParameterId, $scope.currentSearchInput);
                           }
                       }
                       //end button group events
                       //alerts & news - messages

                       var getMessages = function () {
                           var data = localStorageService.get('organizationDetail');
                           if (data !== null) {
                               $scope.hasCreditLock = data.CreditStatus === "Blocked";

                               kendo.mobile.application.pane.loader.show();
                               $("#btn_message").data("kendoMobileButton");

                               messageDataService.getMessages().then(function (result) {
                                   $scope.mesages = result;
                                   $scope.messageCount = result.AnnouncementList.length + result.PartnerHolidayList.length;
                                   $("#btn_message").data("kendoMobileButton").badge($scope.messageCount);

                               }).catch(function (error) {
                                   $scope.mesages = {};
                                   $scope.messageCount = 0;
                                   $("#btn_message").data("kendoMobileButton").badge($scope.messageCount);
                               }).finally(function () {
                                   kendo.mobile.application.pane.loader.hide();
                               });
                           }


                       }; // end message


                       getMessages();
                       getOrderCounts();

                       $scope.selectedRetailer = 0;
                       $scope.setSearhParamter = function (para) {
                           $scope.selectedPara = parameterService.getSearchParameterName(para);

                           $scope.searchParameterId = para;
                       }

                       $scope.ViewMore = function (orderType) {
                           var temporders = [{ "ProductionOrderId": 4129766371, "Orders": [{ "Order": "1" }], "ShoppingCart": "124321", "SalesOrderNo": "170026206", "VendorRef": "bv", "Status": "Open", "DateInSystem": "2015-11-18T00:00:00+00:00", "OrderDate": "2015-11-18T00:00:00+00:00" },
                           { "ProductionOrderId": 4129786982, "Orders": [{ "Order": "2" }], "ShoppingCart": "125502", "SalesOrderNo": "170026207", "VendorRef": "ADIw33DAS SCM", "Status": "Open", "DateInSystem": "2015-11-18T00:00:00+00:00", "OrderDate": "2015-11-18T00:00:00+00:00" }];
                           var currentOrders = $scope.orders;
                        
                           angular.forEach(temporders, function (value, key) {
                               if (key <= temporders.length) {
                                   currentOrders.push(value);
                               
                               }
                           });

                           $scope.orders = currentOrders;
                           console.log($scope.orders.length);
                       }
                       $scope.orderDetail = function (orderType, parameterId, parameterValue) {
                           kendo.mobile.application.navigate("src/app/order/detail.html?orderType=" + orderType + "&parameterId=" + parameterId + "&parameterValue=" + parameterValue);
                       }

                       $scope.orderList = function (orderType, parameterId, parameterValue) {
                           kendo.mobile.application.navigate("src/app/order/list.html?orderType=" + orderType + "&parameterId=" + parameterId + "&parameterValue=" + parameterValue);
                       }

                       $scope.key = function ($event) {

                           if ($event.keyCode === 13) {
                               $event.target.blur();
                               forceGetData = true;
                               $scope.hasSearch = true;
                               setSelectPara();
                               getOrderCounts();

                           }
                       }
                       //view more orders
                       $scope.showMoreOrderModel = function (orders) {
                           $scope.orderList = orders;
                           $("#modalview-moreOrder").kendoMobileModalView("open");
                       };
                       $scope.hideMoreOrderModel = function () {

                           $("#modalview-moreOrder").kendoMobileModalView("close");
                       };

                       //so - check box for approval
                       $scope.selection = [];
                       $scope.orderApprovalComment = "";
                       $scope.salesorderList = "";

                       $scope.toggleSelection = function toggleSelection(so) {
                           var idx = $scope.selection.indexOf(so);

                           if (idx > -1) {
                               $scope.selection.splice(idx, 1);
                           } else {
                               $scope.selection.push(so);
                           }

                       };
                       $scope.viewAll = function (orderType, parameterId) {
                           kendo.mobile.application.navigate("src/app/order/list.html?orderType=" + orderType + "&parameterId=" + parameterId + "&parameterValue=" + "" + "&orders=" + $scope.orders);
                       }
                       $scope.approve = function () {
                           var salesorders = "";

                           var salesorderList = $scope.selection;
                           angular.forEach(salesorderList, function (value, key) {
                               salesorders += value + ',';
                           });
                           kendo.mobile.application.navigate("src/app/order/approve.html?orders=" + salesorders);
                       }
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

                       $scope.showApprovalModel = function (orderType, parameterId, retailerId) {
                           var salesorders = "";
                           $scope.selectedRetailer = retailerId;


                           var salesorderList = $scope.selection;
                           angular.forEach(salesorderList, function (value, key) {
                               salesorders += value + ',';
                           });
                           $scope.salesorderList = salesorders;
                           kendo.mobile.application.navigate("src/app/order/list.html?orderType=" + orderType);
                           //  $("#modalview-approve").kendoMobileModalView("open");
                       };
                       $scope.hideApporvalModel = function () {
                           $scope.salesorderList = "";
                           $("#modalview-approve").kendoMobileModalView("close");
                       };

                       $scope.approved = function (status) {
                           orderApprovalByStatus(status);
                       }



                       $scope.renderHtml = function (content) {
                           return $sce.trustAsHtml(content);
                       };

                   }

]);