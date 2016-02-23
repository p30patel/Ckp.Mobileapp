
app.controller('homeController', [
                  '$rootScope', '$scope', '$http', 'authService', 'localStorageService', '$timeout', 'homeDataService', 'parameterService', '$filter', 'translateService', 'messageDataService',  '$sce', '$window',
                   function ($rootScope, $scope, $http, authService, localStorageService, $timeout, homeDataService, parameterService, $filter, translateService, messageDataService, $sce, $window) {
                       $scope.beforeShow = function () {
                         
                             kendo.mobile.application.showLoading();
                           if (!authService.authentication.isAuth) {
                               authService.logout();
                               kendo.mobile.application.navigate("src/app/login/login.html");
                           }
                            kendo.mobile.application.hideLoading();

                       };

                    

                       $scope.form = {};                    
                       $scope.form.title = {};
                       $scope.form.title.resoruceName = "Home";
                       $scope.form.title.resoruceValue = translateService.getResourceValue($scope.form.title.resoruceName);
                     
                       $scope.show = function () {
                           $("#right-drawer").data("kendoMobileDrawer").show();
                           $rootScope.hasBackButton = false;
                           return false;
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

                           $scope.form.statusChangedDate = {};
                           $scope.form.statusChangedDate.resoruceName = "Updated On";
                           $scope.form.statusChangedDate.resoruceValue = translateService.getResourceValue($scope.form.statusChangedDate.resoruceName);

                           $scope.form.bulkApprove = {};
                           $scope.form.bulkApprove.resoruceName = "Approve / Decline";
                           $scope.form.bulkApprove.resoruceValue = translateService.getResourceValue($scope.form.bulkApprove.resoruceName);

                           $scope.form.dateInSystem = {};
                           $scope.form.dateInSystem.resoruceName = "Receive Date";
                           $scope.form.dateInSystem.resoruceValue = translateService.getResourceValue($scope.form.dateInSystem.resoruceName);

                           $scope.form.releasedOrder = {};
                           $scope.form.releasedOrder.resoruceName = "Recent Orders";
                           $scope.form.releasedOrder.resoruceValue = translateService.getResourceValue($scope.form.releasedOrder.resoruceName);

                           $scope.form.newOrder = {};
                           $scope.form.newOrder.resoruceName = "Staged Orders";
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

                           $scope.form.noOrderCounts = {};
                           $scope.form.noOrderCounts.resoruceName = "Error while getting data from server, Please try later or contact customer service.";
                           $scope.form.noOrderCounts.resoruceValue = translateService.getResourceValue($scope.form.noOrderCounts.resoruceName);

                           $scope.form.loading = {};
                           $scope.form.loading.resoruceName = "Loading";
                           $scope.form.loading.resoruceValue = translateService.getResourceValue($scope.form.loading.resoruceName);

                       }

                       setResources();

                   
                       $scope.afterShow = function (e) {

                           var view = kendo.mobile.application.view();
                           if (view !== null) {
                               var navbar = kendo.mobile.application.view()
                                            .header
                                            .find(".km-navbar")
                                            .data("kendo-mobile-nav-bar");
                               navbar.title($scope.form.title.resoruceValue);
                               $('.km-scroll-container').css('-webkit-transform', 'none');
                           }
                         
                           console.log($rootScope.hasBackButton);
                           if ($rootScope.hasBackButton) {
                             
                               
                           }
                           else{
                               $scope.mesages = {};
                               $scope.orders = {};
                               $scope.message = "";
                               $scope.messageCount = 0;
                               $scope.searchValue = "";
                               $scope.hasCreditLock = false;
                               $scope.hasSearch = false;
                               $scope.hasListView = false;
                               $scope.hasDetailView = false;
                               $scope.selectedRetailer = 0;
                               $scope.selectedOrderType = '';
                               $scope.selectedOrderTypeId = '1';
                               $scope.currentSearchInput = '';
                               $scope.orderList = {};

                               $scope.searchParameterId = 1;
                               $scope.selectedPara = '1';
                               setSelectPara();

                               $scope.groupBy = 'SalesOrderNumber';
                               $scope.screen2SearchParameter = 'SalesOrderNumber';
                               $scope.viewMoreColumn = 'OrderNumber';


                               $scope.parameters = parameterService.getSearchParameters();

                               $scope.hasNext = true;
                               $scope.hasNextDisabled = false;
                               $scope.currentPage = 1;
                               $scope.PageSize = 5;
                               $scope.successMessage = $scope.form.loading.resoruceValue;

                               $scope.hasItemSelectedForApporval = false;
                               $scope.selectedAll = false;
                               $scope.jsonIn = {};
                               $scope.orderCounts = {};

                               var hasOneOrderType = false;
                               var defaultSelectedRetailer = 0;

                               $scope.selectedRetailer = 0;
                               $scope.isAuth = authService.authentication.isAuth;
                               getOrderCounts();
                           }
                       }

                   
                     

                       var setSelectPara = function () {
                           
                           var selectedPara = parameterService.getSearchParameterName($scope.selectedPara);
                        
                           $scope.searchParameterId = $scope.selectedPara;

                           $scope.currentSearchInput = $scope.searchValue;

                           $scope.jsonIn = {
                               OrderNumber: $scope.searchParameterId == '1' ? $scope.currentSearchInput : '',
                               SalesOrderNumber: $scope.searchParameterId == '2' ? $scope.currentSearchInput : '',
                               ShoppingCartId: $scope.searchParameterId == '3' ? $scope.currentSearchInput : '',
                               VendorRef: $scope.searchParameterId == '4' ? $scope.currentSearchInput : ''
                           };
                       }

                     
                     
                       var checkOrderTypeCount = function(result)
                       {
                           var hasOneOrderType = false;
                           var count = 0;
                           defaultSelectedRetailer = 0;
                          
                           if (typeof(result) !== 'undefined' && result.length == 1)
                           {

                               if (result[0].HasStagedOrder) {
                                   count++;
                               }
                               if (result[0].HasApproval) {
                                   count++;
                               }
                               if (result[0].HasReleasedOrder) {
                                   count++;
                               }
                               defaultSelectedRetailer = result[0].RetailerId;
                               hasOneOrderType = count > 1 ? false : true;
                           }
                          
                           return hasOneOrderType;
                       }
                       var getOrderCounts = function () {
                          
                           if ($rootScope.hasBackButton) {
                             
                               $scope.hasSearch = false;
                               return false;
                           }
                           $scope.hasSearch = false;
                           kendo.mobile.application.showLoading();

                           if (typeof (window.navigator.simulator) === 'undefined') {
                               window.plugins.EqatecAnalytics.Monitor.TrackFeature("method.home.orderCount");
                           }

                           homeDataService.getOrderCounts($scope.jsonIn).then(function (result) {
                               kendo.mobile.application.hideLoading();
                               if (result === null)
                               {
                                   $scope.orderCounts = [];
                               }
                               else if (typeof result.MobileOrderCountList === 'undefined') {
                                   $scope.orderCounts = [];
                               }
                               else {
                                   $scope.orderCounts = result.MobileOrderCountList;

                                   hasOneOrderType = checkOrderTypeCount(result.MobileOrderCountList);

                                   if (hasOneOrderType) {
                                       //TO DO -show order detail for one order type                                   

                                       //var buttongroup = $("#buttongroup" + 17352).data("kendoMobileButtonGroup");
                                     
                                       //console.log(buttongroup);
                                      
                                   }

                               }

                             
                           

                           }).catch(function (error) {

                               $scope.orderCounts = [];
                                kendo.mobile.application.hideLoading();

                           }).finally(function () {

                                kendo.mobile.application.hideLoading();
                           });

                       }
                       $scope.languages = parameterService.getSearchParameters();
                       $scope.clearSearch = function () {
                           $scope.searchValue = "";
                       }                                          
                     
                       
                       var getOrderSummary = function (orderType, orderTypeId, searchParamterId, searchInput, currentPage, hasNext) {

                           if (typeof (window.navigator.simulator) === 'undefined') {
                               window.plugins.EqatecAnalytics.Monitor.TrackFeature("method.home.orderSummary");
                           }                         
                          
                           var jsonIn = {
                               PageSize: $scope.PageSize,
                               PageNumber: currentPage,

                               OrderNumber: $scope.jsonIn.OrderNumber,
                               ShoppingCartId: $scope.jsonIn.ShoppingCartId,
                               SalesOrderNumber: $scope.jsonIn.SalesOrderNumber,
                               VendorRef: $scope.jsonIn.VendorRef,

                               RetailerId: $scope.selectedRetailer,

                               UserId: 0,
                               OrderType: orderTypeId,
                               SearchList: []
                           };
                         
                           $scope.groupBy = parameterService.getScreen1GroupByName($scope.searchParameterId, $scope.selectedOrderTypeId);
                           $scope.screen2SearchParameter = parameterService.getScreen2SearchParameter($scope.searchParameterId, $scope.selectedOrderTypeId);
                         
                           kendo.mobile.application.showLoading();
                           homeDataService.getOrderSummary(jsonIn).then(function (result) {
                               $scope.hasNext = result.length >= $scope.PageSize;
                               result = $filter('orderBy')(result, 'OrderDate', true);
                              
                               if (hasNext) {
                                   
                                   var currentOrders = $scope.orders;
                                   var nextNumber = $scope.orders.length + 1;
                                   angular.forEach(result, function (value, key) {
                                       console.log(value);
                                       if (key <= result.length) {
                                           value["Id"] = -1 * nextNumber++;
                                           currentOrders.push(value);

                                       }
                                   });
                                 
                                   $scope.orders = currentOrders;
                                  
                               }
                               else {
                                   var nextNumber = 1;
                                   angular.forEach(result, function (value, key) {
                                       value["Id"] = -1 * nextNumber++;
                                   });
                                   $scope.orders = result;
                                  
                               }

                              
                             
                           }).catch(function (error) {
                               $scope.orders = [];
                           

                           }).finally(function () {
                               kendo.mobile.application.hideLoading();
                               $scope.hasNextDisabled = false;
                               if ($scope.orders.length > 0)
                               {
                                   $scope.successMessage = $scope.form.loading.resoruceValue;
                               }
                               else {
                                   $scope.successMessage = $scope.form.noResults.resoruceValue;
                               }
                           });
                       }

                      
                       //button group events
                       var retailerHeaderClick = function ()
                       {
                           $('.ck-home-button-icon').removeClass('km-minus');
                           var listviews = $("ul.order-header.km-listview");
                           listviews.hide();
                           $(".ck-count-btn").removeClass('km-state-active');

                           $('.ck-home-button-icon').addClass('km-plus');
                       }
                       $scope.retailerHeader = function () {
                           retailerHeaderClick();
                       }
                       $scope.myOptions = {
                           select: function (e) {
                               retailerHeaderClick();
                               $scope.successMessage = $scope.form.loading.resoruceValue;
                            
                               var selectedBtnRetailer = e.sender.element.attr('data-btnRetailer');
                               $('#header-' + selectedBtnRetailer).removeClass('km-plus');
                               $('#header-' + selectedBtnRetailer).addClass('km-minus');

                               $scope.selectedRetailer = selectedBtnRetailer;
                               

                               var activeButton = $(event.target).offsetParent();
                             
                               activeButton.addClass('km-state-active');

                               var listviewsToShow = $("ul.km-listview").filter("[data-retailer='" + selectedBtnRetailer + "']");
                             
                               listviewsToShow.eq(e.index).show();

                               $scope.selectedOrderType = listviewsToShow.eq(e.index).attr('data-orderType');
                              
                               $scope.selectedOrderTypeId = parameterService.getOrderTypeById($scope.selectedOrderType);
                              
                            
                               var selectedOrderCount = listviewsToShow.eq(e.index).attr('data-orderCount');
                               
                               var hasNext = false;
                               $scope.hasNextDisabled = false;
                               if (selectedOrderCount > 0) {
                              
                                   $scope.orders = {};                               
                                   $scope.currentPage = 1;
                                   getOrderSummary($scope.selectedOrderType, $scope.selectedOrderTypeId, $scope.searchParameterId, $scope.currentSearchInput, $scope.currentPage, hasNext);
                               }
                               else {

                                   $scope.$apply(function () {
                                       $scope.successMessage = $scope.form.noResults.resoruceValue;
                                       $scope.orders = {};
                                   });
                                   
                               }
                           }
                       }

                       //alerts & news - messages

                       var getMessages = function () {
                           var data = localStorageService.get('organizationDetail');
                           if (data !== null) {
                               $scope.hasCreditLock = data.CreditStatus === "Blocked";
                             
                               $("#btn_message").data("kendoMobileButton");

                               messageDataService.getMessages().then(function (result) {
                                 
                                   if (typeof (window.navigator.simulator) === 'undefined') {
                                       window.plugins.EqatecAnalytics.Monitor.TrackFeature("event.home.messages");
                                   }
                                   $scope.mesages = result;
                                   $scope.messageCount = result.AnnouncementList.length + result.PartnerHolidayList.length;
                                   $("#btn_message").data("kendoMobileButton").badge($scope.messageCount);

                               }).catch(function (error) {
                                   $scope.mesages = {};
                                   $scope.messageCount = 0;
                                   $("#btn_message").data("kendoMobileButton").badge($scope.messageCount);
                               }).finally(function () {
                               });
                           }


                       }; // end message
                       
                       getMessages();

                       $scope.setSearhParamter = function (para) {
                           $scope.selectedPara = parameterService.getSearchParameterName(para);

                           $scope.searchParameterId = para;
                       }

                       $scope.ViewMore = function (orderType) {

                           $scope.currentPage += 1;
                         
                           var hasNext = true;
                           $scope.hasNextDisabled = true;
                           if (typeof (window.navigator.simulator) === 'undefined') {
                               window.plugins.EqatecAnalytics.Monitor.TrackFeature("event.home.viewNext");
                           }
                           getOrderSummary($scope.selectedOrderType, $scope.selectedOrderTypeId, $scope.searchParameterId, $scope.currentSearchInput, $scope.currentPage, hasNext);
                         
                          
                       }
                    
                       $scope.orderDetail = function (orderType, parameterId, parameterValue) {

                           if (typeof (window.navigator.simulator) === 'undefined') {
                               window.plugins.EqatecAnalytics.Monitor.TrackFeature("event.home.orderDetail");
                           }
                           $rootScope.hasBackButton = true;
                           $rootScope.hasBackButtonList = false;
                           var backUrl = 'home/home.html';
                           kendo.mobile.application.navigate("src/app/order/detail.html?orderType=" + orderType + "&parameterId=" + parameterId + "&parameterValue=" + parameterValue + "&backUrl=" + backUrl);
                       }

                       var search = function () {
                           $scope.orders = {};
                           $scope.hasSearch = true;
                           $rootScope.hasBackButton = false;
                           $rootScope.hasSearchOrApporval = true;
                           setSelectPara();
                           getOrderCounts();
                           if (typeof (window.navigator.simulator) === 'undefined') {
                               window.plugins.EqatecAnalytics.Monitor.TrackFeature("event.home.search");
                           }
                       }

                       $scope.search = function () {
                           search();
                       }
                       $scope.key = function ($event) {
                        
                           if ($event.keyCode === 13 && ($scope.searchValue.length > 0 || $scope.selectedPara === '1')) {
                               $event.target.blur();                           
                               search();
                           }
                       }
                       //view more orders
                       $scope.showMoreOrderModel = function (orders, columnName) {
                           $scope.viewMoreColumn = columnName;

                           $scope.orderList = orders;
                           if (typeof (window.navigator.simulator) === 'undefined') {
                               window.plugins.EqatecAnalytics.Monitor.TrackFeature("event.home.viewMore");
                           }
                           $("#modalview-moreOrder").kendoMobileModalView("open");
                       };
                       $scope.hideMoreOrderModel = function () {

                           $("#modalview-moreOrder").kendoMobileModalView("close");
                       };

                       // selected list for approval - screen2
                       var getSalesOrderNumbers = function (orders)
                       {
                           var salesOrders = [];
                           console.log(orders);
                           angular.forEach(orders, function (value, key) {
                              
                                   salesOrders.push(value.SalesOrderNumber);
                            
                           });
                           return salesOrders;
                       }

                       $scope.selection = [];
                       $scope.selectedList = "";

                       var getSelectedList = function () {
                           var currentSelection = [];
                           var selectedList = '';
                           var checkedItems = $('.approve-chk:checked');
                           if (checkedItems.length > 0) {
                               angular.forEach(checkedItems, function (value, key) {                                   
                                 
                                   var item = checkedItems.eq(key).attr('data-' + $scope.screen2SearchParameter);

                                   // if shopping cart or vendor ref then get sales order list from them

                                 
                                   if ($scope.screen2SearchParameter === 'ShoppingCartId' || $scope.screen2SearchParameter === 'VendorRef') {
                                       if ($scope.screen2SearchParameter === 'ShoppingCartId'){
                                           var orders = $filter('filter')($scope.orders, { ShoppingCartId: item });
                                       }
                                       else {
                                           var orders = $filter('filter')($scope.orders, { VendorRef: item });
                                       }
                                       salesOrders = getSalesOrderNumbers(orders);
                                       angular.forEach(salesOrders, function (value, key) {
                                          
                                           if (currentSelection.indexOf(value) == -1) {
                                               selectedList += value + ',';
                                               
                                               currentSelection.push(value);
                                           }
                                       });
                                   }
                                   else {
                                       if (currentSelection.indexOf(item) == -1) {
                                           selectedList += item + ',';
                                           currentSelection.push(item);
                                       }
                                   }
                                  
                                 
                               });
                           }
                           $scope.selection = currentSelection;
                           $scope.selectedList = selectedList;
                          
                       }

                       $scope.checkAll = function (selectedAll) {
                           $('.approve-chk').prop('checked', selectedAll);
                           $scope.hasItemSelectedForApporval = selectedAll;
                       }

                       $scope.checkedIndividual = function (id)
                       {
                           var isChecked = $('#' + id + ':checked').length > 0 ? true : false;
                           $scope.hasItemSelectedForApporval = isChecked;

                           switch ($scope.screen2SearchParameter) {                              
                               case 'ShoppingCartId':
                                   var shoppingCartId = $('#' + id).attr('data-ShoppingCartId');

                                   var shoppingCartIds = $('.approve-chk').filter("[data-ShoppingCartId='" + shoppingCartId + "']");
                                   if (isChecked) {
                                       shoppingCartIds.prop('checked', true);
                                   }
                                   else {
                                       shoppingCartIds.prop('checked', false);
                                   }
                                   break;

                               case 'VendorRef':
                                   var vendorRef = $('#' + id).attr('data-vendorRef');

                                   var vendorRefs = $('.approve-chk').filter("[data-vendorRef='" + vendorRef + "']");
                                   if (isChecked) {
                                       vendorRefs.prop('checked', true);
                                   }
                                   else {
                                       vendorRefs.prop('checked', false);
                                   }
                                   break;

                               case 'SalesOrderNumber':

                               default:
                                   
                                   var salesOrderNumber = $('#' + id).attr('data-salesordernumber');
                                  
                                   var sameSalesOrders = $('.approve-chk').filter("[data-salesordernumber='" + salesOrderNumber + "']");
                                   if (isChecked) {
                                       sameSalesOrders.prop('checked', true);
                                   }
                                   else {
                                       sameSalesOrders.prop('checked', false);
                                   }
                                   break;

                           }
                       }

                       $scope.showOrderList = function (orderType, parameterId, parameterValue, retailerId) {
                           $rootScope.hasBackButton = true;
                           $rootScope.hasBackButtonList = false;
                           var backUrl = 'home/home.html';
                           getSelectedList();
                          
                           parameterValue = parameterValue === '' ? $scope.selectedList : parameterValue;

                           var selectedList = $scope.selection;
                          
                           if (typeof (window.navigator.simulator) === 'undefined') {
                               window.plugins.EqatecAnalytics.Monitor.TrackFeature("event.home.orderList");
                           }
                          
                           kendo.mobile.application.navigate("src/app/order/list.html?orderType=" + orderType + "&parameterId=" + parameterId + "&parameterValue=" + parameterValue + "&searchParameter=" + $scope.screen2SearchParameter + "&selectedList=" + selectedList + "&retailerId=" + retailerId + "&backUrl=" + backUrl);
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
                           if (typeof (window.navigator.simulator) === 'undefined') {
                               window.plugins.EqatecAnalytics.Monitor.TrackFeature("event.home.creditLock");
                           }
                           $("#modalview-credit").kendoMobileModalView("open");
                       };
                       $scope.hideCreditModel = function () {
                           $('.order').hide();
                           $("#modalview-credit").kendoMobileModalView("close");
                       };
                     
                       $scope.renderHtml = function (content) {
                           return $sce.trustAsHtml(content);
                       };

                   }

]);

