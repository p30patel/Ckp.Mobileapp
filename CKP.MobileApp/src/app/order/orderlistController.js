
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
                           }
                         
                       }

                       $scope.form.noResults = {};
                       $scope.form.noResults.resoruceName = "No Results are found";
                       $scope.form.noResults.resoruceValue = translateService.getResourceValue($scope.form.noResults.resoruceName);




                       $scope.order = {};
                       
                       $scope.order.hasApproval = false;

                       $scope.order.title = 'Order List';
                       $scope.order.detail = {};
                       $scope.order.orders = {};
                       var init = function() {
                           
                           if (!authService.authentication.isAuth) {
                               authService.logout();
                              
                               kendo.mobile.application.navigate("src/app/login/login.html");
                           }
                       };
                       init();
                       var orderType = '1';
                       var parameterId = 0;
                       var parameterValue = [];
                       var salesOrderList = '';
                     
                       $scope.groupBy = 'VendorRef';
                       $scope.intShow = function (e) {
                           orderType = e.view.params.orderType;
                           parameterId = e.view.params.parameterId;
                           parameterValue.push( e.view.params.parameterValue);                                                    
                           salesOrderList = e.view.params.salesOrderList;
                      
                           $scope.order.orderType = orderType;
                           $scope.groupBy = parameterService.getScreen2GroupByName(parameterId, orderType);
                           
                          
                           //   $scope.searchParameterId = parameterId;
                         
                           if (orderType === '1'){
                                  $scope.order.hasApproval = true;
                           }
                           getOrderList();
                       }
                        //retailers with count
                   

                        var getOrderList = function () {
                            
                           kendo.mobile.application.pane.loader.show();
                           alert(parameterValue +" : " + salesOrderList);
                           var searchList = [];
                           if (orderType === '1')
                           {
                               //need to loop throught for appoval
                           }
                           else {
                               searchList.push(parameterValue);
                           }
                           var searchData = {                             
                               SearchBy: $scope.searchBy,
                               SearchList: searchList,
                           };

                           
                            orderDataService.getOrderList(searchData).then(function (result) {
                                $scope.order.orders = result;
                                alert(result);
                            }).catch(function (error) {
                                alert(error);
                               $scope.order.orders = {};
                           }).finally(function() {
                               kendo.mobile.application.pane.loader.hide();
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
                        $scope.confirmationConent = "";
                       //confiramtion modal
                        $scope.showConfirmationModel = function (id) {
                            //id = 107154; // reomve it once real data comnes in
                            kendo.mobile.application.pane.loader.show();
                            $scope.confiramtionConent = 'No data found';
                            orderDataService.getConfirmationHtml(id).then(function (result) {
                                if (result !== null) {
                                    $scope.confirmationConent = result;
                                }
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
                        $scope.approved = function (status) {
                            orderApprovalByStatus(status);
                        }
                       //appprove order
                        var orderApprovalByStatus = function (statusUpdate) {
                            var salesorders = [];

                            var solist = {
                                SalesOrderNo: $scope.SalesOrderNo,
                                Comment: $scope.orderApprovalComment
                            };
                            salesorders.push(solist);
                            var data = {
                                RetailerId: $scope.selectedRetailer,
                                Salesorders: salesorders,
                                UpdateStatus: statusUpdate,
                            }
                            kendo.mobile.application.pane.loader.show();
                            var successMessage = statusUpdate ? "Aprroved" : "Declined"
                            orderDataService.approveDecline(data).then(function (result) {

                                $scope.apporvalMessage = "Order " + successMessage + " Successfully.";
                                $timeout(function () {
                                    $scope.apporvalMessage = "";
                                    $scope.order.hasApproval = false;
                                    kendo.mobile.application.navigate("src/app/home/home.html");
                                }, 5000);

                                kendo.mobile.application.pane.loader.hide();


                            }).catch(function (error) {
                                kendo.mobile.application.pane.loader.hide();
                                $scope.apporvalMessage = "Approve / Decliend failed";
                                $timeout(function () {
                                    $scope.apporvalMessage = "";
                                }, 7000);
                            });

                        }

                        $scope.orderDetail = function () {
                            kendo.mobile.application.navigate("src/app/order/detail.html?orderType=" + 2 + "&parameterId=" + 2 + "&parameterValue=" + 'teeree');
                        }
                       
                       $scope.renderHtml = function (content) {
                           return $sce.trustAsHtml(content);
                       };
                   }
               ]);