
app.controller('orderlistController', [
                   '$scope', 'authService', 'orderDataService', 'homeDataService','$sce',  'translateService', 'parameterService', '$timeout',
                   function ($scope, authService, orderDataService, homeDataService, $sce, translateService, parameterService, $timeout) {
                       $scope.form = {};

                       $scope.form.title = {};
                       $scope.form.title.resoruceName = "Order List";
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
                                   window.plugins.EqatecAnalytics.Monitor.TrackFeature("view.orderList");
                               }
                           }
                         
                       }

                       $scope.form.noResults = {};
                       $scope.form.noResults.resoruceName = "No Results are found";
                       $scope.form.noResults.resoruceValue = translateService.getResourceValue($scope.form.noResults.resoruceName);

                       $scope.form.dateInSystem = {};
                       $scope.form.dateInSystem.resoruceName = "Receive Date";
                       $scope.form.dateInSystem.resoruceValue = translateService.getResourceValue($scope.form.dateInSystem.resoruceName);

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

                       $scope.form.price = {};
                       $scope.form.price.resoruceName = "Price";
                       $scope.form.price.resoruceValue = translateService.getResourceValue($scope.form.price.resoruceName);

                       $scope.form.orderBy = {};
                       $scope.form.orderBy.resoruceName = "Order By";
                       $scope.form.orderBy.resoruceValue = translateService.getResourceValue($scope.form.orderBy.resoruceName);


                       $scope.form.appoveMessage = {};
                       $scope.form.appoveMessage.resoruceName = "Order apporved successfuly";
                       $scope.form.appoveMessage.resoruceValue = translateService.getResourceValue($scope.form.appoveMessage.resoruceName);


                       $scope.form.declineMessage = {};
                       $scope.form.declineMessage.resoruceName = "Order declined successfuly";
                       $scope.form.declineMessage.resoruceValue = translateService.getResourceValue($scope.form.declineMessage.resoruceName);

                       $scope.form.faildUpdateMessage = {};
                       $scope.form.faildUpdateMessage.resoruceName = "Error while approve or decline";
                       $scope.form.faildUpdateMessage.resoruceValue = translateService.getResourceValue($scope.form.faildUpdateMessage.resoruceName);

                       $scope.form.noData = {};
                       $scope.form.noData.resoruceName = "No Data are found";
                       $scope.form.noData.resoruceValue = translateService.getResourceValue($scope.form.noData.resoruceName);



                       $scope.order = {};
                       
                       $scope.order.hasApproval = false;
                       $scope.order.hasClikedApporval = false;
                       $scope.orderApprovalComment = "";

                       $scope.order.title = 'Order List';
                       $scope.order.detail = {};
                       $scope.order.orders = {};

                       $scope.confirmationData = "";
                       var init = function() {
                           
                           if (!authService.authentication.isAuth) {
                               authService.logout();
                              
                               kendo.mobile.application.navigate("src/app/login/login.html");
                           }
                       };
                       init();
                       var orderType = '1';
                       var parameterId = 0;
                       var selectedList = '';
                       var retailerId = 0;
                       $scope.searchParameter = 'SalesOrderNumber';
                     
                       $scope.groupBy = 'VendorRef';
                       $scope.searchBy = 'SalesOrderNumber';
                       $scope.intShow = function (e) {
                           $scope.searchParameter = e.view.params.searchParameter;
                           orderType = e.view.params.orderType;
                           parameterId = e.view.params.parameterId;                       
                           retailerId = e.view.params.retailerId;
                           selectedList = e.view.params.parameterValue === '' ? e.view.params.selectedList : e.view.params.parameterValue;

                           $scope.order.orderType = orderType;
                           $scope.groupBy = parameterService.getScreen2GroupByName(parameterId, orderType);
                           $scope.searchBy = parameterService.getScreen2SearchByName(parameterId, orderType);
                           if (orderType === '1'){
                                  $scope.order.hasApproval = true;
                           }
                         
                           getOrderList();
                       }
                                        

                        var getOrderList = function () {
                            
                             kendo.mobile.application.showLoading();
                          
                             var searchList = [];

                           searchList.push(selectedList);
                           var searchData = {
                               RetailerId : retailerId,
                               OrderNumber: $scope.searchBy === 'OrderNumber' ? $scope.searchBy : '',
                               ShoppingCartId: $scope.searchBy === 'ShoppingCartId' ? $scope.searchBy : '',
                               SalesOrderNumber: $scope.searchBy === 'SalesOrderNumber' ? $scope.searchBy : '',
                               VendorRef: $scope.searchBy === 'VendorRef' ? $scope.searchBy : '',
                               SearchList: searchList
                           };

                            orderDataService.getOrderList(searchData).then(function (result) {
                                $scope.order.orders = result;
                            
                            }).catch(function (error) {
                               
                               $scope.order.orders = {};
                           }).finally(function() {
                                kendo.mobile.application.hideLoading();
                           });
                        }; // end order list

                      
                       //
                        $scope.headerClick = function (index) {
                            $('.list-view-detail-' + index).toggle();
                            if ($('.ck-icon-toggge-' + index).hasClass('km-plus')) {
                                $('.ck-icon-toggge-' + index).removeClass('km-plus');
                                $('.ck-icon-toggge-' + index).addClass('km-minus');

                            }
                            else {
                                $('.ck-icon-toggge-' + index).addClass('km-plus');
                                $('.ck-icon-toggge-' + index).removeClass('km-minus');
                            }
                        }
                       
                       //confiramtion modal
                        $scope.showConfirmationModel = function (id) {
                            $("#modalview-confirmation").kendoMobileModalView("open");
                            $scope.confirmationData = "Loading";
                            $('.km-view').css('-webkit-transform', 'none');
                            kendo.mobile.application.showLoading();
                            if (typeof (window.navigator.simulator) === 'undefined') {
                                window.plugins.EqatecAnalytics.Monitor.TrackFeature("event.orderDetail.confirmationHtml");
                            }
                          

                            orderDataService.getConfirmationHtml(id).then(function (result) {
                              
                                if (result !== null || result.data !== '') {
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

                            $("#modalview-confirmation").kendoMobileModalView("close");
                        };
                        $scope.approved = function (status) {
                        
                            orderApprovalByStatus(status);
                        }
                       //appprove order

                        var getSalesOrders = function ()
                        {
                            var orders = $scope.order.orders;
                            var salesOrders = new Array();
                            angular.forEach(orders, function (value, key) {
                                if (salesOrders.indexOf(orders.SalesOrderNumber) == -1)
                                {
                                    var solist = {
                                        SalesOrderNo: parseInt(value.SalesOrderNumber),
                                        Comment: $scope.orderApprovalComment
                                    };
                                    salesOrders.push(solist);
                                }
                            });
                          
                            return salesOrders;
                        }
                        var orderApprovalByStatus = function (statusUpdate) {
                      
                            $scope.order.hasClikedApporval = true;
                            var salesOrders = getSalesOrders();

                            var data = {                              
                                Salesorders: salesOrders,
                                UpdateStatus: statusUpdate,
                            }
                              kendo.mobile.application.showLoading();
                            var successMessage = statusUpdate ? $scope.form.successMessage.resoruceValue :$scope.form.declineMessage.resoruceValue;
                            orderDataService.approveDecline(data).then(function (result) {

                                $scope.apporvalMessage = successMessage
                                if (typeof (window.navigator.simulator) === 'undefined') {
                                    window.plugins.EqatecAnalytics.Monitor.TrackFeature("event.orderList.orderApporval");
                                }
                                $timeout(function () {
                                    $scope.apporvalMessage = "";
                                    $scope.order.hasApproval = false;
                                    kendo.mobile.application.navigate("src/app/home/home.html");
                                }, 1000);

                                 kendo.mobile.application.hideLoading();


                            }).catch(function (error) {
                                $scope.order.hasClikedApporval = false;
                                 kendo.mobile.application.hideLoading();
                                $scope.apporvalMessage = $scope.form.faildUpdateMessage.resoruceValue;
                                $timeout(function () {
                                    $scope.apporvalMessage = "";
                                }, 7000);
                            });

                        }

                        $scope.orderDetail = function (poctrlno) {
                            if (typeof (window.navigator.simulator) === 'undefined') {
                                window.plugins.EqatecAnalytics.Monitor.TrackFeature("event.orderList.orderDetail");
                            }
                            kendo.mobile.application.navigate("src/app/order/detail.html?orderType=" + 2 + "&parameterId=" + 2 + "&parameterValue=" + poctrlno);
                        }
                       
                        $scope.renderHtml = function (content) {
                         
                           return $sce.trustAsHtml(content);
                       };
                   }
               ]);