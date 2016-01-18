
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
                           $scope.form.viewAll.resoruceName = "View Next";
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
                           $scope.form.bulkApprove.resoruceName = "Approve / Decline";
                           $scope.form.bulkApprove.resoruceValue = translateService.getResourceValue($scope.form.bulkApprove.resoruceName);

                           $scope.form.dateInSystem = {};
                           $scope.form.dateInSystem.resoruceName = "Receive Date";
                           $scope.form.dateInSystem.resoruceValue = translateService.getResourceValue($scope.form.dateInSystem.resoruceName);

                           $scope.form.releasedOrder = {};
                           $scope.form.releasedOrder.resoruceName = "Recent";
                           $scope.form.releasedOrder.resoruceValue = translateService.getResourceValue($scope.form.releasedOrder.resoruceName);

                           $scope.form.newOrder = {};
                           $scope.form.newOrder.resoruceName = "Staged";
                           $scope.form.newOrder.resoruceValue = translateService.getResourceValue($scope.form.newOrder.resoruceName);

                           $scope.form.approvalOrder = {};
                           $scope.form.approvalOrder.resoruceName = "Approval";
                           $scope.form.approvalOrder.resoruceValue = translateService.getResourceValue($scope.form.approvalOrder.resoruceName);

                           $scope.form.search = {};
                           $scope.form.search.resoruceName = "Search";
                           $scope.form.search.resoruceValue = translateService.getResourceValue($scope.form.search.resoruceName);

                           $scope.form.announcements = {};
                           $scope.form.announcements.resoruceName = "Announcements";
                           $scope.form.announcements.resoruceValue = translateService.getResourceValue($scope.form.announcements.resoruceName);

                           $scope.form.printShopHolidays = {};
                           $scope.form.printShopHolidays.resoruceName = "Print Shop Holidays";
                           $scope.form.printShopHolidays.resoruceValue = translateService.getResourceValue($scope.form.printShopHolidays.resoruceName);

                           $scope.form.noMessages = {};
                           $scope.form.noMessages.resoruceName = "No messages are found";
                           $scope.form.noMessages.resoruceValue = translateService.getResourceValue($scope.form.noMessages.resoruceName);

                           $scope.form.orderList = {};
                           $scope.form.orderList.resoruceName = "Order List";
                           $scope.form.orderList.resoruceValue = translateService.getResourceValue($scope.form.orderList.resoruceName);

                           $scope.form.neworderNoResult = {};
                           $scope.form.neworderNoResult.resoruceName = "New Order No results";
                           $scope.form.neworderNoResult.resoruceValue = translateService.getResourceValue($scope.form.neworderNoResult.resoruceName);

                           $scope.form.seeMore = {};
                           $scope.form.seeMore.resoruceName = "See More";
                           $scope.form.seeMore.resoruceValue = translateService.getResourceValue($scope.form.seeMore.resoruceName);

                           $scope.form.orgName = {};
                           $scope.form.orgName.resoruceName = "Organization";
                           $scope.form.orgName.resoruceValue = translateService.getResourceValue($scope.form.orgName.resoruceName);

                           $scope.form.noResults = {};
                           $scope.form.noResults.resoruceName = "No Results are found";
                           $scope.form.noResults.resoruceValue = translateService.getResourceValue($scope.form.noResults.resoruceName);



                       }

                       setResources();

                       if (isTrackingActive && typeof (EqatecAnalytics) !== 'undefined') {
                           window.plugins.EqatecAnalytics.Monitor.TrackFeature("view.Home");
                       }
                       //if ($window.ga) {

                       //    $window.ga('send', 'pageview', { page: 'Home View-GA' });

                       //}
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
                       $scope.sortOrder = 'OrderNumber';
                       $scope.parameters = parameterService.getSearchParameters();
                       $scope.hasNext = true;
                       $scope.isAuth = authService.authentication.isAuth;


                       var setSelectPara = function () {
                           
                           var selectedPara = parameterService.getSearchParameterName($scope.selectedPara);
                          
                           $scope.searchParameterId = $scope.selectedPara;
                         
                           $scope.sortOrder = selectedPara;
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

                       var staticOrderCountData = { "MobileOrderCountList": [{ "RetailerId": 1, "RetailerName": "TJ Maxx", "HasApproval": true, "ApprovalCount": 10, "HasStagedOrder": true, "NewOrderCount": 4, "HasReleasedOrder": true, "ReleasedOrderCount": 40, "Id": -1, "Error": "" }], "Error": "" };

                       var staticOrderSummaryData = [{ "OrderNumber": "00019319", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -1, "Error": "" }, { "OrderNumber": "00020399", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403699152, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -2, "Error": "" }, { "OrderNumber": "00001502", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403699160, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -3, "Error": "" }, { "OrderNumber": "04938439", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026110", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-10T00:00:00", "OrderDate": "2015-11-10T00:00:00", "POCtrlNo": 403699160, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -4, "Error": "" }, { "OrderNumber": "00010806", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -5, "Error": "" }, { "OrderNumber": "00015983", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -6, "Error": "" }, { "OrderNumber": "00019847", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -7, "Error": "" }, { "OrderNumber": "00974620", "ShoppingCartId": "773810", "OrganizationName": "Griffonage Pens", "SalesOrderNumber": "170026209", "VendorRef": "PY19304110", "Status": 0, "DateInSystem": "2015-11-02T00:00:00", "OrderDate": "2015-11-02T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -8, "Error": "" }, { "OrderNumber": "00974623", "ShoppingCartId": "773810", "OrganizationName": "Griffonage Pens", "SalesOrderNumber": "170026209", "VendorRef": "PY19304110", "Status": 0, "DateInSystem": "2015-11-02T00:00:00", "OrderDate": "2015-11-02T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -9, "Error": "" }, { "OrderNumber": "00019319", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -10, "Error": "" }, { "OrderNumber": "00020399", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403699152, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -11, "Error": "" }, { "OrderNumber": "00001502", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403699160, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -12, "Error": "" }, { "OrderNumber": "04938439", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026110", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-10T00:00:00", "OrderDate": "2015-11-10T00:00:00", "POCtrlNo": 403699160, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -13, "Error": "" }, { "OrderNumber": "00010806", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -14, "Error": "" }, { "OrderNumber": "00015983", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -15, "Error": "" }, { "OrderNumber": "00019847", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -16, "Error": "" }, { "OrderNumber": "00974620", "ShoppingCartId": "773810", "OrganizationName": "Griffonage Pens", "SalesOrderNumber": "170026209", "VendorRef": "PY19304110", "Status": 0, "DateInSystem": "2015-11-02T00:00:00", "OrderDate": "2015-11-02T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -17, "Error": "" }, { "OrderNumber": "00974623", "ShoppingCartId": "773810", "OrganizationName": "Griffonage Pens", "SalesOrderNumber": "170026209", "VendorRef": "PY19304110", "Status": 0, "DateInSystem": "2015-11-02T00:00:00", "OrderDate": "2015-11-02T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -18, "Error": "" }, { "OrderNumber": "00019319", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -19, "Error": "" }, { "OrderNumber": "00020399", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403699152, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -20, "Error": "" }, { "OrderNumber": "00001502", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403699160, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -21, "Error": "" }, { "OrderNumber": "04938439", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026110", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-10T00:00:00", "OrderDate": "2015-11-10T00:00:00", "POCtrlNo": 403699160, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -22, "Error": "" }, { "OrderNumber": "00010806", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -23, "Error": "" }, { "OrderNumber": "00015983", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -24, "Error": "" }, { "OrderNumber": "00019847", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -25, "Error": "" }, { "OrderNumber": "00974620", "ShoppingCartId": "773810", "OrganizationName": "Griffonage Pens", "SalesOrderNumber": "170026209", "VendorRef": "PY19304110", "Status": 0, "DateInSystem": "2015-11-02T00:00:00", "OrderDate": "2015-11-02T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -26, "Error": "" }, { "OrderNumber": "00974623", "ShoppingCartId": "773810", "OrganizationName": "Griffonage Pens", "SalesOrderNumber": "170026209", "VendorRef": "PY19304110", "Status": 0, "DateInSystem": "2015-11-02T00:00:00", "OrderDate": "2015-11-02T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -27, "Error": "" }, { "OrderNumber": "00019319", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -28, "Error": "" }, { "OrderNumber": "00020399", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403699152, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -29, "Error": "" }, { "OrderNumber": "00001502", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403699160, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -30, "Error": "" }, { "OrderNumber": "04938439", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026110", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-10T00:00:00", "OrderDate": "2015-11-10T00:00:00", "POCtrlNo": 403699160, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -31, "Error": "" }, { "OrderNumber": "00010806", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -32, "Error": "" }, { "OrderNumber": "00015983", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -33, "Error": "" }, { "OrderNumber": "00019847", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -34, "Error": "" }, { "OrderNumber": "00974620", "ShoppingCartId": "773810", "OrganizationName": "Griffonage Pens", "SalesOrderNumber": "170026209", "VendorRef": "PY19304110", "Status": 0, "DateInSystem": "2015-11-02T00:00:00", "OrderDate": "2015-11-02T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -35, "Error": "" }, { "OrderNumber": "00974623", "ShoppingCartId": "773810", "OrganizationName": "Griffonage Pens", "SalesOrderNumber": "170026209", "VendorRef": "PY19304110", "Status": 0, "DateInSystem": "2015-11-02T00:00:00", "OrderDate": "2015-11-02T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -36, "Error": "" }, { "OrderNumber": "00019319", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -37, "Error": "" }, { "OrderNumber": "00020399", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403699152, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -38, "Error": "" }, { "OrderNumber": "00001502", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403699160, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -39, "Error": "" }, { "OrderNumber": "04938439", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026110", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-10T00:00:00", "OrderDate": "2015-11-10T00:00:00", "POCtrlNo": 403699160, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -40, "Error": "" }, { "OrderNumber": "00010806", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -41, "Error": "" }, { "OrderNumber": "00015983", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -42, "Error": "" }, { "OrderNumber": "00019847", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -43, "Error": "" }, { "OrderNumber": "00974620", "ShoppingCartId": "773810", "OrganizationName": "Griffonage Pens", "SalesOrderNumber": "170026209", "VendorRef": "PY19304110", "Status": 0, "DateInSystem": "2015-11-02T00:00:00", "OrderDate": "2015-11-02T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -44, "Error": "" }, { "OrderNumber": "00974623", "ShoppingCartId": "773810", "OrganizationName": "Griffonage Pens", "SalesOrderNumber": "170026209", "VendorRef": "PY19304110", "Status": 0, "DateInSystem": "2015-11-02T00:00:00", "OrderDate": "2015-11-02T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -45, "Error": "" }];

                       var getOrderCounts = function () {
                           $scope.hasSearch = false;
                           kendo.mobile.application.pane.loader.show();
                           homeDataService.getOrderCounts().then(function (result) {

                               result = staticOrderCountData; //remove after demo
                               $scope.orderCounts = result.MobileOrderCountList;

                           }).catch(function (error) {
                               $scope.orderCounts = {};

                               result = staticOrderCountData; //remove after demo
                               $scope.orderCounts = result; ////remove after demo
                            
                           }).finally(function () {
                               kendo.mobile.application.pane.loader.hide();
                          
                           });

                       }
                       //get ordetrs
                       var getOrders = function (orderType, orderTypeId, searchParamterId, searchInput) {
                           $scope.hasNext = true;
                          
                           var jsonIn = {
                               PageSize: 5,
                               PageNumber: 1,

                               OrderNumber: $scope.searchParameterId == '1'  ? $scope.currentSearchInput : '',
                               ShoppingCartId: $scope.searchParameterId == '2' ? $scope.currentSearchInput : '',
                               SalesOrderNumber: $scope.searchParameterId == '3' ? $scope.currentSearchInput : '',
                               VendorRef: $scope.searchParameterId == '4' ? $scope.currentSearchInput : '',

                               RetailerId: 6884, //$scope.selectedRetailer

                               UserId: 1,
                               OrderType: orderTypeId,
                               SearchList: []
                           };
                         
                      
                           kendo.mobile.application.pane.loader.show();
                           homeDataService.getOrderSummary(jsonIn).then(function (result) {
                               kendo.mobile.application.pane.loader.hide();
                               result = staticOrderSummaryData; //remove after demo
                               $scope.orders = result;
                           }).catch(function (error) {
                               $scope.orders = {};

                               result = staticOrderSummaryData; //remove after demo
                               $scope.orders = result; ////remove after demo
                            
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

                               var orderTypeId = $scope.selectedOrderType;

                               getOrders(selectedOrderType, orderTypeId, $scope.searchParameterId, $scope.currentSearchInput);
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
                           var temporders = [{ "OrderNumber": "A00019319", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -1, "Error": "" }, { "OrderNumber": "00020399", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403699152, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -2, "Error": "" }, { "OrderNumber": "00001502", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403699160, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -3, "Error": "" },
                                             { "OrderNumber": "A04938439", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026110", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-10T00:00:00", "OrderDate": "2015-11-10T00:00:00", "POCtrlNo": 403699160, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -4, "Error": "" }, { "OrderNumber": "00010806", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -5, "Error": "" }, { "OrderNumber": "00015983", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -6, "Error": "" },
                                             { "OrderNumber": "A00019847", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -7, "Error": "" }, { "OrderNumber": "00974620", "ShoppingCartId": "773810", "OrganizationName": "Griffonage Pens", "SalesOrderNumber": "170026209", "VendorRef": "PY19304110", "Status": 0, "DateInSystem": "2015-11-02T00:00:00", "OrderDate": "2015-11-02T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -8, "Error": "" }, { "OrderNumber": "00974623", "ShoppingCartId": "773810", "OrganizationName": "Griffonage Pens", "SalesOrderNumber": "170026209", "VendorRef": "PY19304110", "Status": 0, "DateInSystem": "2015-11-02T00:00:00", "OrderDate": "2015-11-02T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -9, "Error": "" }, { "OrderNumber": "00019319", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -10, "Error": "" }, { "OrderNumber": "00020399", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403699152, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -11, "Error": "" }, { "OrderNumber": "00001502", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403699160, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -12, "Error": "" }, { "OrderNumber": "04938439", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026110", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-10T00:00:00", "OrderDate": "2015-11-10T00:00:00", "POCtrlNo": 403699160, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -13, "Error": "" }, { "OrderNumber": "00010806", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -14, "Error": "" }, { "OrderNumber": "00015983", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -15, "Error": "" }, { "OrderNumber": "00019847", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -16, "Error": "" }, { "OrderNumber": "00974620", "ShoppingCartId": "773810", "OrganizationName": "Griffonage Pens", "SalesOrderNumber": "170026209", "VendorRef": "PY19304110", "Status": 0, "DateInSystem": "2015-11-02T00:00:00", "OrderDate": "2015-11-02T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -17, "Error": "" }, { "OrderNumber": "00974623", "ShoppingCartId": "773810", "OrganizationName": "Griffonage Pens", "SalesOrderNumber": "170026209", "VendorRef": "PY19304110", "Status": 0, "DateInSystem": "2015-11-02T00:00:00", "OrderDate": "2015-11-02T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -18, "Error": "" }, { "OrderNumber": "00019319", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -19, "Error": "" }, { "OrderNumber": "00020399", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403699152, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -20, "Error": "" }, { "OrderNumber": "00001502", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403699160, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -21, "Error": "" }, { "OrderNumber": "04938439", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026110", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-10T00:00:00", "OrderDate": "2015-11-10T00:00:00", "POCtrlNo": 403699160, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -22, "Error": "" }, { "OrderNumber": "00010806", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -23, "Error": "" }, { "OrderNumber": "00015983", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -24, "Error": "" }, { "OrderNumber": "00019847", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -25, "Error": "" }, { "OrderNumber": "00974620", "ShoppingCartId": "773810", "OrganizationName": "Griffonage Pens", "SalesOrderNumber": "170026209", "VendorRef": "PY19304110", "Status": 0, "DateInSystem": "2015-11-02T00:00:00", "OrderDate": "2015-11-02T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -26, "Error": "" }, { "OrderNumber": "00974623", "ShoppingCartId": "773810", "OrganizationName": "Griffonage Pens", "SalesOrderNumber": "170026209", "VendorRef": "PY19304110", "Status": 0, "DateInSystem": "2015-11-02T00:00:00", "OrderDate": "2015-11-02T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -27, "Error": "" }, { "OrderNumber": "00019319", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -28, "Error": "" }, { "OrderNumber": "00020399", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403699152, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -29, "Error": "" }, { "OrderNumber": "00001502", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403699160, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -30, "Error": "" }, { "OrderNumber": "04938439", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026110", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-10T00:00:00", "OrderDate": "2015-11-10T00:00:00", "POCtrlNo": 403699160, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -31, "Error": "" }, { "OrderNumber": "00010806", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -32, "Error": "" }, { "OrderNumber": "00015983", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -33, "Error": "" }, { "OrderNumber": "00019847", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -34, "Error": "" }, { "OrderNumber": "00974620", "ShoppingCartId": "773810", "OrganizationName": "Griffonage Pens", "SalesOrderNumber": "170026209", "VendorRef": "PY19304110", "Status": 0, "DateInSystem": "2015-11-02T00:00:00", "OrderDate": "2015-11-02T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -35, "Error": "" }, { "OrderNumber": "00974623", "ShoppingCartId": "773810", "OrganizationName": "Griffonage Pens", "SalesOrderNumber": "170026209", "VendorRef": "PY19304110", "Status": 0, "DateInSystem": "2015-11-02T00:00:00", "OrderDate": "2015-11-02T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -36, "Error": "" }, { "OrderNumber": "00019319", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -37, "Error": "" }, { "OrderNumber": "00020399", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403699152, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -38, "Error": "" }, { "OrderNumber": "00001502", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026101", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-08T00:00:00", "OrderDate": "2015-11-08T00:00:00", "POCtrlNo": 403699160, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -39, "Error": "" }, { "OrderNumber": "04938439", "ShoppingCartId": "773865", "OrganizationName": "Lunula Nail Polish", "SalesOrderNumber": "170026110", "VendorRef": "PY19304123", "Status": 0, "DateInSystem": "2015-11-10T00:00:00", "OrderDate": "2015-11-10T00:00:00", "POCtrlNo": 403699160, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -40, "Error": "" }, { "OrderNumber": "00010806", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -41, "Error": "" }, { "OrderNumber": "00015983", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403658677, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -42, "Error": "" }, { "OrderNumber": "00019847", "ShoppingCartId": "773849", "OrganizationName": "Aglet Ltd. Co.", "SalesOrderNumber": "170026100", "VendorRef": "PY19304115", "Status": 0, "DateInSystem": "2015-11-05T00:00:00", "OrderDate": "2015-11-05T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -43, "Error": "" }, { "OrderNumber": "00974620", "ShoppingCartId": "773810", "OrganizationName": "Griffonage Pens", "SalesOrderNumber": "170026209", "VendorRef": "PY19304110", "Status": 0, "DateInSystem": "2015-11-02T00:00:00", "OrderDate": "2015-11-02T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -44, "Error": "" }, { "OrderNumber": "00974623", "ShoppingCartId": "773810", "OrganizationName": "Griffonage Pens", "SalesOrderNumber": "170026209", "VendorRef": "PY19304110", "Status": 0, "DateInSystem": "2015-11-02T00:00:00", "OrderDate": "2015-11-02T00:00:00", "POCtrlNo": 403640040, "OrderedBy": "user1109", "Price": 20.0, "IsStagedOrder": false, "BillingAddress": null, "DeliveryAddress": null, "OrderTrackingNumberList": [], "Id": -45, "Error": "" }];
                           var currentOrders = $scope.orders;
                           $scope.hasNext = false;
                           angular.forEach(temporders, function (value, key) {
                               console.log(value);
                               if (key <= temporders.length) {
                                   currentOrders.push(value);
                               
                               }
                           });

                           $scope.orders = currentOrders;
                          
                       }
                       $scope.orderList = function (orderType, parameterId, parameterValue) {
                          
                           kendo.mobile.application.navigate("src/app/order/list.html?orderType=" + orderType + "&parameterId=" + parameterId + "&parameterValue=" + parameterValue);
                       }

                       $scope.orderDetail = function (orderType, parameterId, parameterValue) {
                           kendo.mobile.application.navigate("src/app/order/detail.html?orderType=" + orderType + "&parameterId=" + parameterId + "&parameterValue=" + parameterValue);
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

