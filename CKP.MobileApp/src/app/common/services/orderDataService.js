
'use strict';

app.factory("orderDataService", [
                "$http", "$q", "localStorageService", "ngAuthSettings", "authService",
                function ($http, $q, localStorageService, ngAuthSettings, authService) {
                    var orderDataServiceFactory = {};
                    var date = kendo.toString(new Date(), "yyyy-MM-dd");
                    
                    var getOrderDetail = function (poctrlno) {
                   
                        var deferred = $q.defer();

                        var authServiceBase = ngAuthSettings.authServiceBaseUri;

                        var orgContext = '';
                        var organizationDetail = localStorageService.get('organizationDetail');

                        if (organizationDetail) {
                            orgContext = organizationDetail;
                        }

                        var jsonIn = {
                            ProductionOrderId: poctrlno,
                            OrganizationDetail: orgContext
                        }
                        
                        console.log(jsonIn);
                        var url = authServiceBase + "webapi/api/core/MobileApp/GetOrderDetailByPOCtrlNo";

                     
                        $http.post(url, jsonIn).success(function (result) {
                      
                            deferred.resolve(result);
                        }).error(function (xhr, status, error) {
                           
                            deferred.reject(error);
                        });
                        return deferred.promise;
                    };
             
                    var getOrderList = function (searchData) {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;

                        var authData = authService.getUserInfo();
                        var userId = authData.userId;
                        var orgContext = '';
                        var organizationDetail = localStorageService.get('organizationDetail');
                        
                        if (organizationDetail) {
                            orgContext = organizationDetail.OrgContext;
                        }
                        
                        var data = {
                            RetailerId: orgContext.RetailerId,
                            UserId: userId,
                            //SearchBy: searchData.SearchBy,
                            SearchList: searchData.SearchList,
                            SalesOrderNumber: '34',
                            OrderType: 1,
                        }; 
                                         
                        var url = authServiceBase + "webapi/api/core/MobileApp/GetOrderList";
                                             
                        $http.post(url, data).success(function (result) {
                            localStorageService.set('orderList' + date, result);
                            deferred.resolve(result);
                        }).error(function (xhr, status, error) {  
                            
                            deferred.reject(error);
                        });
                        return deferred.promise;
                    };
                
                    var approveDecline = function (approvalDeclineData) {
                        var deferred = $q.defer();
                        var authServiceBase = ngAuthSettings.authServiceBaseUri;

                        var authData = authService.getUserInfo();
                        var userId = authData.userId;
                        var username = authData.userName;
                        var orgId = authData.organizationId;
                        var orgContext = {};
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
                        var url = authServiceBase + "webapi/api/core/MobileApp/UpdateApproveOrderStatus";
                        $http.post(url, data).success(function (result) {   
                          
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

                        var orgContext = '';
                        var organizationDetail = localStorageService.get('organizationDetail');

                        if (organizationDetail) {
                            orgContext = organizationDetail.OrgContext;
                        }

                        if (organizationDetail === null) {
                            deferred.reject('failed to get data');
                        }

                       
                        var data = {
                            OrgContext: orgContext.OrgContext,
                            ShoppingCartId: 95142
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
                   
                    return orderDataServiceFactory;
                }
            ]);