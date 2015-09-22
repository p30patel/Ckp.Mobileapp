
app.controller('orderDetailController', [
                   '$scope', 'authService', 'orderDataService','$sce', 'translateService',
                   function ($scope, authService, orderDataService, $sce, translateService) {

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



                       $scope.order = {};
                  
                       $scope.order.hasApproval = false;
                       $scope.order.title = 'Order Detail';
                       $scope.order.detail = {};
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
                        
                           $scope.order.message = orderType + ";" + parameterId + ":" + parameterValue;
                           if (orderType === '1') {
                               $scope.order.hasApproval = true;
                           }
                           getOrderDetail();
                       }
                       
                       var getOrderDetail = function () {
                           kendo.mobile.application.pane.loader.show();
                          
                           orderDataService.getOrderDetail().then(function (result) {
                               $scope.order.detail = result;
                           
                           }).catch(function(error) {
                               $scope.mesages = {};
                           }).finally(function() {
                               kendo.mobile.application.pane.loader.hide();
                           });
                       }; // end message
                     
                       $scope.apporve = function (statusUpdate) {
               
                           var salesorders = [];
/*
                           var salesorderList = [1,2,3,4];
                           angular.forEach(salesorderList, function(value, key) {
                               var solist = {
                                   SalesOrderNo: value,
                                   Comment: "comment1"
                               };
                               salesorders.push(solist);
                           });*/
                               var solist = {
                                   SalesOrderNo:$scope.order.detail.SalesOrderNo,
                                   Comment: order.detail.comment
                               };
                               salesorders.push(solist);
                           var jsonIn = {
                               UserName: "jim rl tjx",
                               OrgId: 6884,
                               RetailerId: 6884,
                               ApproveOrdersListData: salesorders
                           }
                           
                           orderDataService.approveDecline(jsonIn).then(function (result) {
                             
                               $scope.order.detail = result;
                             
                           }).catch(function(error) {
                               $scope.mesages = {};
                           }).finally(function() {
                               kendo.mobile.application.pane.loader.hide();
                           });
                       }
                       $scope.renderHtml = function (content) {
                           return $sce.trustAsHtml(content);
                       };
                   }
               ]);