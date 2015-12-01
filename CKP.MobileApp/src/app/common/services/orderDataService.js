
'use strict';

app.factory("orderDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService",
                function ($http, $q, localStorageService, ngAuthSettings, authService) {
                    var orderDataServiceFactory = {};
                    var date = kendo.toString(new Date(), "yyyy-MM-dd");
                    
                    var getOrderDetail = function (poctrlno) {
                   
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;

                        var authData = authService.getUserInfo();
                        var userId = authData.userId;
                      
                       
                        var url = authServiceBase + "webapi/api/core/MobileApp/GetOrderDetailByPOCtrlNo?productionOrderId=" + poctrlno;

                     
                        $http.get(url).success(function (result) {
                            localStorageService.set('orderDetail' + date, result);
                            deferred.resolve(result);
                        }).error(function (xhr, status, error) {                                  
                            deferred.reject(error);
                        });
                        return deferred.promise;
                    };
             
                    var forceGetOrderList = function () {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;

                        var authData = authService.getUserInfo();
                        var userId = authData.userId;
                      
                        var url = authServiceBase + "webapi/api/core/MobileApp/GetOrderList";

                        var data = {
                            PageSize: 1,
                            PageNumber: 1,

                            OrderNumber: '',
                            ShoppingCartId: '773849',
                            SalesOrderNumber: '',
                            VendorRef: '',

                            RetailerId: 6884,

                            UserId: 1,
                            OrderType: 1,
                            SearchList: ["773849", "773810"]
                        };
                        $http.post(url, data).success(function (result) {
                            localStorageService.set('orderList' + date, result);
                            deferred.resolve(result);
                        }).error(function (xhr, status, error) {  
                            
                            deferred.reject(error);
                        });
                        return deferred.promise;
                    };
                    var getOrderList = function () {
                        var deferred = $q.defer();
                        
                        var orderList = localStorageService.get("orderList" + date);
                        orderList = '';
                        if (orderList) {
                            deferred.resolve(orderList);
                        } else {
                            forceGetOrderList().then(function (result) {
                                deferred.resolve(result);
                            });
                        }

                        return deferred.promise;
                    }
                    
                    
                    var approveDecline = function (approvalDeclineData) {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;

                        var authData = authService.getUserInfo();
                        var userId = authData.userId;
                        var username = authData.userName;
                        var orgId = authData.organizationId;
                        var orgContext = '';
                        var organizationDetail = localStorageService.get('organizationDetail');
                        if (organizationDetail) {
                            orgContext = organizationDetail.OrgContext
                        }
                     
                        var data = {
                            UserName: username,
                            OrgId: orgId,
                            RetailerId: approvalDeclineData.RetailerId,
                            UpdateStatus: approvalDeclineData.UpdateStatus,
                            OrgContext: orgContext,
                            ApproveOrdersListData: approvalDeclineData.Salesorders
                        };
                        console.log(data);
                        var url = authServiceBase + "webapi/api/core/MobileApp/UpdateApproveOrderList";
                        $http.post(url, data).success(function (result) {   
                            alert(result.success);
                            deferred.resolve(result);
                        }).error(function (xhr, status, error) {                           
                            deferred.reject(error);
                        });
                        return deferred.promise;
                    };
                    var getConfirmationHtml = function (id) {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;

                        var authData = authService.getUserInfo();

                        var data = localStorageService.get('organizationDetail');
                        if (data === null) {
                            deferred.reject('failed to get data');
                        }

                        var userId = authData.userId;
                        var data = {
                            OrgContext: data.OrgContext,
                            ShoppingCartId: id
                        };
                        var url = authServiceBase + "webapi/api/core/MobileApp/GetConfirmationHtml";

                        
                        $http.post(url, data).success(function (result) {
                            console.log(result);
                            deferred.resolve(result);
                        }).error(function (xhr, status, error) {

                            deferred.reject(error);
                        });
                        return deferred.promise;
                    };

                    orderDataServiceFactory.approveDecline = approveDecline;
                    
                    orderDataServiceFactory.getOrderDetail = getOrderDetail;
                                     
                    orderDataServiceFactory.getConfirmationHtml = getConfirmationHtml;

                    orderDataServiceFactory.getOrderList = getOrderList;
                    orderDataServiceFactory.forceGetOrderList = forceGetOrderList;

                    return orderDataServiceFactory;
                }
            ]);